// eslint-disable-next-line no-unused-vars
import React from "react";
import { useNavigate } from "react-router-dom";
import { useRestaurant } from "../Context/restaurantContext";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Grid } from "@mui/material";
import RestaurantRating from "../components/RestaurantRating";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";

// eslint-disable-next-line react/prop-types
const RestaurantCards = ({ restaurants, handleOpenModal }) => {
  const { likes, addLikes, deleteLikes } = useRestaurant();
  const navigate = useNavigate();

  const isLiked = (id) => {
    return likes && likes[id];
  };

  const handleLikeClick = async (id) => {
    if (isLiked(id)) {
      await deleteLikes(id);
    } else {
      await addLikes(id);
    }
  };

  const handleShareClick = async (restaurant) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: restaurant.name,
          text: `Check out ${restaurant.name}! en ${restaurant?.address?.state}, ${restaurant?.address?.city}, ${restaurant?.address?.street}`,
          url: restaurant.contact.site,
        });
      } else {
        console.error("La API Web Share no está disponible");
      }
    } catch (error) {
      console.error("Error al compartir:", error);
    }
  };

  const handleSearchLocation = (restaurant) => {
    if (restaurant) {
      navigate(`/app-melp/location/${restaurant.id}`);
    }
  };

  return (
    <>
      {restaurants &&
        // eslint-disable-next-line react/prop-types
        restaurants.map((restaurant) => (
          <Grid item xs={12} sm={6} md={4} key={restaurant.id}>
            <Card sx={{ maxWidth: 345, height: 280 }}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    {`${restaurant?.name ? restaurant?.name[0] : "-"}${
                      restaurant?.name ? restaurant?.name[1] : "-"
                    }`}
                  </Avatar>
                }
                action={
                  <IconButton
                    aria-label="settings"
                    onClick={() => handleOpenModal(restaurant.id)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                }
                title={
                  <Typography variant="h6" fontWeight="bold">
                    {restaurant.name}
                  </Typography>
                }
              />
              <RestaurantRating value={restaurant.rating} />
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Teléfono: {restaurant.contact.phone}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Calle: {restaurant.address.street}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Estado: {restaurant.address.state}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton
                  aria-label="add to favorites"
                  onClick={() => handleLikeClick(restaurant.id)}
                >
                  <FavoriteIcon
                    sx={{
                      color: isLiked(restaurant.id) ? red[500] : "inherit",
                    }}
                  />
                </IconButton>
                <IconButton
                  aria-label="share"
                  onClick={() => handleShareClick(restaurant)}
                >
                  <ShareIcon />
                </IconButton>
                <IconButton
                  aria-label="share"
                  onClick={() => handleSearchLocation(restaurant)}
                >
                  <TravelExploreIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
    </>
  );
};

export default RestaurantCards;
