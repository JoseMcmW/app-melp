// eslint-disable-next-line no-unused-vars
import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const SimpleBackdrop = () => {
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
      onClick={() => {}}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

export default SimpleBackdrop;
