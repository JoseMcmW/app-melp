// Home.js
// eslint-disable-next-line no-unused-vars
import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import img from "../assets/images/portada.svg";

const Home = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/app-melp/restaurants");
  };
  return (
    <Box>
      <Box
        height="60vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bgcolor="#000000"
      >
        <img
          src={img}
          alt="Restaurant Image"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Box>
      <Box padding={4}>
        <Typography variant="h3" gutterBottom>
          Hola somos Melp!
        </Typography>
        <Typography variant="body1" paragraph>
          Bienvenido a nuestro buscador de restaurante. Ofrecemos deliciosa
          comida preparada con ingredientes frescos y de la más alta calidad.
        </Typography>
        <Typography variant="body1" paragraph>
          Te ayudamos a conseguir un restaurante con deliciosa comida preparada
          con ingredientes frescos y de la más alta calidad.
        </Typography>
        <Button variant="contained" color="primary" onClick={handleNavigate}>
          Comencemos
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
