import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Pagination,
  Select,
  MenuItem,
} from "@mui/material";
import SimpleBackdrop from "../components/SimpleBackdrop";
import Modal from "../components/Modal";
import { useRestaurant } from "../Context/restaurantContext";
import RestaurantCards from "./RestaurantCards";
import Restaurant from "./Restaurant";

const Restaurants = () => {
  const { restaurants, loading, getRestaurants } = useRestaurant();
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [page, setPage] = useState(1);
  const [sortOption, setSortOption] = useState("default"); // Agregado para el ordenamiento
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

  const sortedRestaurants = restaurants && restaurants.slice(); // Clonar el array para no afectar el original


  if (sortOption === "alphabetical") {
    // Ordenar alfabéticamente por el nombre del restaurante
    sortedRestaurants.sort((a, b) =>
      a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
    );
  }

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRestaurants = sortedRestaurants?.slice(startIndex, endIndex);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  return (
    <Container maxWidth="none" sx={{ padding: "1rem" }}>
      <Typography variant="h4" mb={"1.875rem"} sx={{ fontWeight: "bold" }}>
        Restaurantes
      </Typography>
      <Typography variant="body2" mt={"1.5rem"} mb={"1.875rem"}>
        Selecciona los que más te gusten y agrégalo a tus favoritos para que
        puedas elegir la mejor opción dentro de tus favoritos.
      </Typography>
      {/* Agregar el componente Select para el ordenamiento */}
      <Select
        label="Ordenar por"
        value={sortOption}
        onChange={handleSortChange}
        sx={{ marginBottom: 2 }}
      >
        <MenuItem value="default">Sin orden</MenuItem>
        <MenuItem value="alphabetical">Alfabéticamente</MenuItem>
      </Select>
      <Grid container spacing={2}>
        <RestaurantCards
          restaurants={currentRestaurants}
          handleOpenModal={handleOpenModal}
        />
      </Grid>
      <Pagination
        count={Math.ceil(sortedRestaurants?.length / itemsPerPage)}
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
