// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Marker } from 'react-leaflet';
import IconLocation from './IconLocation';
import { Popup } from 'react-leaflet';
import { Typography } from '@mui/material';
import RestaurantRating from './RestaurantRating';

export const Markers = ({ restaurants, restaurant, id }) => {
  console.log('data :>> ', restaurants);
  console.log('restaurant :>> ', restaurant);

  let markers;

  if (restaurant && id) {
    markers = (
      <Marker
      key={restaurant.id}
      position={{ lat: restaurant?.address?.location?.lat, lng: restaurant?.address?.location?.lng }}
      icon={IconLocation}
      >
        <Popup>
          {restaurant?.name}
        </Popup>
      </Marker>
    );
  } else {
    // Si tienes un objeto de restaurante, crea un marcador solo para ese restaurante
    markers = restaurants && restaurants.map((rest) => (
      <Marker
      key={rest.id}
      position={{ lat: rest?.address?.location?.lat, lng: rest?.address?.location?.lng }}
      icon={IconLocation}
      >
        <Popup>
          <Typography variant="h6" sx={{marginBottom: 3, marginTop: 1}}>
            {rest?.name}
          </Typography>
          <RestaurantRating value={rest?.rating} />
          <Typography variant="body2" fontSize={12} color="text.secondary" sx={{marginBottom: 2, marginTop: 2}}>
            <span style={{fontWeight: 'bold'}}>Teléfono:</span> {rest?.contact?.phone}
          </Typography>
          <Typography variant="body2" fontSize={12}  color="text.secondary" sx={{marginBottom: 2}}>
            <span style={{fontWeight: 'bold'}}>Web:</span> {rest?.contact?.site}
          </Typography>
          <Typography variant="body2" fontSize={12}  color="text.secondary" sx={{marginBottom: 2}}>
            <span style={{fontWeight: 'bold'}}>Email:</span> {rest?.contact?.email}
          </Typography>
          <Typography variant="body2" fontSize={12}  color="text.secondary" sx={{marginBottom: 2}}>
            <span style={{fontWeight: 'bold'}}>Calle:</span> {rest?.address?.street}
          </Typography>
          <Typography variant="body2" fontSize={12}  color="text.secondary" sx={{marginBottom: 2}}>
            <span style={{fontWeight: 'bold'}}>Ciudad:</span> {rest?.address?.city}
          </Typography>
          <Typography variant="body2" fontSize={12}  color="text.secondary" sx={{marginBottom: 2}}>
            <span style={{fontWeight: 'bold'}}>Estado:</span> {rest?.address?.state}
          </Typography>
        </Popup>
      </Marker>
    ));
  }

  return markers;
};
