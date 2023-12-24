// eslint-disable-next-line no-unused-vars
import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';

// eslint-disable-next-line react/prop-types
export default function RestaurantRating({value}) {

  return (
    <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
      <Rating name="read-only" value={value} readOnly />
    </Box>
  );
}