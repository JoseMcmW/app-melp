// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { useParams } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import { Markers } from "../components/Markers";
import { useRestaurant } from "../Context/restaurantContext";
import { Box, Grid, Typography } from "@mui/material";
import getDistance from "geolib/es/getPreciseDistance";
import { useMapEvents } from "react-leaflet";
import { useNavigate } from "react-router-dom";

const RestaurantMap = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getRestaurant, getRestaurants, restaurants, restaurant } =
    useRestaurant();
  // eslint-disable-next-line no-unused-vars
  const [state, setState] = useState({
    currentLocation: { lat: "19.435298", lng: "-99.126487" },
    zoom: 15,
  });
  const [nearbyRestaurants, setNearbyRestaurants] = useState([]);
  const [selectedPoint, setSelectedPoint] = useState(null);

  useEffect(() => {
    if (id) {
      getRestaurant(id);
    }
    getRestaurants();
  }, [id]);

  useEffect(() => {
    if (restaurant || selectedPoint) {
      const calculateNearbyRestaurants = () => {
        let distance;

        const sourceLocation = selectedPoint
          ? { latitude: selectedPoint.lat, longitude: selectedPoint.lng }
          : {
              latitude: restaurant.address.location.lat,
              longitude: restaurant.address.location.lng,
            };
        const nearby =
          restaurants &&
          restaurants.filter((rest) => {
            distance = getDistance(sourceLocation, {
              latitude: rest.address.location.lat,
              longitude: rest.address.location.lng,
            });

            const radius = 500;

            return distance <= radius;
          });

        setNearbyRestaurants(nearby);
      };

      calculateNearbyRestaurants();
    }
  }, [restaurant, restaurants, selectedPoint]);

  const MyComponent = () => {
    // eslint-disable-next-line no-unused-vars
    const map = useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        console.log("Coordenadas del clic:", lat, lng);

        setSelectedPoint({ lat, lng });
        navigate("/radius-stats");
      },
      locationfound: (location) => {
        console.log("Location found:", location);
      },
    });

    return null;
  };

  return (
    <Grid container height={"100%"}>
      <Grid item sm={12}>
        <Typography variant="h4">
          Encuenta tu restaurante mas cercano.
        </Typography>
      </Grid>
      <Grid item sm={12}>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-around"}
        >
          <Box>
            <MapContainer center={state.currentLocation} zoom={state.zoom}>
              <MyComponent />
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright'
              />
              <Markers
                restaurants={restaurants}
                restaurant={restaurant}
                id={id}
              />
            </MapContainer>
          </Box>
          {(id || selectedPoint) && (
            <Box display={"flex"} flexDirection={"column"}>
              <Typography
                variant="h6"
                sx={{ marginBottom: 2, fontWeight: "bold" }}
              >
                Restaurantes cercanos:
              </Typography>
              <Box sx={{ overflow: 'scroll', maxHeight: '300px' }}>
                {nearbyRestaurants.map((nearbyRestaurant) => (
                  <div key={nearbyRestaurant.id}>
                    <Typography>{nearbyRestaurant.name}</Typography>
                  </div>
                ))}
              </Box>
            </Box>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default RestaurantMap;
