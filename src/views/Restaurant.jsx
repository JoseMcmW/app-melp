// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import RestaurantRating from "../components/RestaurantRating";
import { useRestaurant } from "../Context/restaurantContext";

// eslint-disable-next-line react/prop-types
const Restaurant = ({ idRestaurant }) => {
  const { restaurant, loading, getRestaurant } = useRestaurant();
  const getData = async (id) => {
    if (id) {
      await getRestaurant(id);
    }
  };

  useEffect(() => {
    getData(idRestaurant);
  }, [idRestaurant]);

  return (
    <>
      {loading === "get_restaurant" ? (
        <Box
          height="40vh"
          width={"30vw"}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress thickness={1} size={25} />
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            marginBottom: 3,
            padding: 3,
          }}
        >
          {restaurant && restaurant && (
            <>
              <Typography variant="h5" sx={{ marginBottom: 3, marginTop: 1 }}>
                {restaurant?.name}
              </Typography>
              <RestaurantRating value={restaurant?.rating} />
              <Typography
                variant="body2"
                fontSize={17}
                color="text.secondary"
                sx={{ marginBottom: 2, marginTop: 2 }}
              >
                <span style={{ fontWeight: "bold" }}>Teléfono:</span>{" "}
                {restaurant?.contact?.phone}
              </Typography>
              <Typography
                variant="body2"
                fontSize={17}
                color="text.secondary"
                sx={{ marginBottom: 2 }}
              >
                <span style={{ fontWeight: "bold" }}>Web:</span>{" "}
                {restaurant?.contact?.site}
              </Typography>
              <Typography
                variant="body2"
                fontSize={17}
                color="text.secondary"
                sx={{ marginBottom: 2 }}
              >
                <span style={{ fontWeight: "bold" }}>Email:</span>{" "}
                {restaurant?.contact?.email}
              </Typography>
              <Typography
                variant="body2"
                fontSize={17}
                color="text.secondary"
                sx={{ marginBottom: 2 }}
              >
                <span style={{ fontWeight: "bold" }}>Calle:</span>{" "}
                {restaurant?.address?.street}
              </Typography>
              <Typography
                variant="body2"
                fontSize={17}
                color="text.secondary"
                sx={{ marginBottom: 2 }}
              >
                <span style={{ fontWeight: "bold" }}>Ciudad:</span>{" "}
                {restaurant?.address?.city}
              </Typography>
              <Typography
                variant="body2"
                fontSize={17}
                color="text.secondary"
                sx={{ marginBottom: 2 }}
              >
                <span style={{ fontWeight: "bold" }}>Estado:</span>{" "}
                {restaurant?.address?.state}
              </Typography>
            </>
          )}
        </Box>
      )}
    </>
  );
};

export default Restaurant;
