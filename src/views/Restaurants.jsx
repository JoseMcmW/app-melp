// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Container, Typography, Grid, Pagination } from "@mui/material";
import SimpleBackdrop from "../components/SimpleBackdrop";
import Modal from "../components/Modal";
import { useRestaurant } from "../Context/restaurantContext";
import RestaurantCards from "./RestaurantCards";
import Restaurant from "./Restaurant";

// eslint-disable-next-line react/prop-types
const Restaurants = () => {
  const { restaurants, loading, getRestaurants } = useRestaurant();
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;

  const handleOpenModal = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedRestaurant(null);
    setOpenModal(false);
  };

  const getData = () => {
    getRestaurants();
  };

  useEffect(() => {
    getData();
  }, []);

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRestaurants = restaurants?.slice(startIndex, endIndex);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Container maxWidth="none" sx={{ padding: "1rem" }}>
      <Typography variant="h4" mb={"1.875rem"} sx={{ fontWeight: "bold" }}>
        Restaurantes
      </Typography>
      <Typography variant="body2" mt={"1.5rem"} mb={"1.875rem"}>
        Selecciona los que mas te gusten y agregalo a tus favoritos para que
        puedas elegir la mejor opción dentro de tus favoritos.
      </Typography>
      <Grid container spacing={2}>
        <RestaurantCards
          restaurants={currentRestaurants}
          handleOpenModal={handleOpenModal}
        />
      </Grid>
      <Pagination
        count={Math.ceil(restaurants?.length / itemsPerPage)}
        page={page}
        onChange={handlePageChange}
        color="primary"
        sx={{ marginTop: 2, display: "flex", justifyContent: "center" }}
      />
      {loading === "get_restaurants" && <SimpleBackdrop />}
      {selectedRestaurant && (
        <Modal open={openModal} handleClose={handleCloseModal}>
          <Restaurant idRestaurant={selectedRestaurant} />
        </Modal>
      )}
    </Container>
  );
};

export default Restaurants;
