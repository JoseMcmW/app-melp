// eslint-disable-next-line no-unused-vars
import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const RestaurantContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useRestaurant = () => useContext(RestaurantContext);

// eslint-disable-next-line react/prop-types
const RestaurantProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState(null);
  const [restaurant, setRestaurant] = useState(null);
  const [likes, setLikes] = useState(() => {
    // Inicializa likes con los datos del localStorage al inicio
    const storedLikes = localStorage.getItem("likes");
    return storedLikes ? JSON.parse(storedLikes) : {};
  });
  const [loading, setLoading] = useState(null);

  const getRestaurants = async () => {
    setLoading("get_restaurants");
    try {
      const { data: res } = await axios.get("/app-melp/api/data_melp.json");
      setRestaurants(res);
      setLoading(null);
      return res;
    } catch (error) {
      setLoading(null);
      return error;
    }
  };

  const getRestaurant = async (id) => {
    setLoading("get_restaurant");
    try {
      const restaurantFound = restaurants?.find(
        (restaurant) => restaurant.id === id
      );
      setRestaurant(restaurantFound);
      setLoading(null);
      return restaurantFound;
    } catch (error) {
      setRestaurant(null);
      setLoading(null);
      return error;
    }
  };

  const getLikes = async (id) => {
    setLoading("get_like");
    try {
      const storedLikes = localStorage.getItem("likes");
      const likesData = storedLikes ? JSON.parse(storedLikes) : {};
      const restaurantLikes = likesData[id] ? [id] : [];
      setLikes(likesData);
      setLoading(null);
      return restaurantLikes;
    } catch (error) {
      setLoading(null);
      return error;
    }
  };

  const addLikes = async (id) => {
    setLoading("add_like");
    try {
      const storedLikes = localStorage.getItem("likes");
      const likesData = storedLikes ? JSON.parse(storedLikes) : {};

      // Si el restaurante ya tiene un like, quitarlo; de lo contrario, agregarlo
      likesData[id] = true;

      // Actualiza el estado con el nuevo objeto de likes
      setLikes(likesData);

      // Almacena la información en el localStorage
      localStorage.setItem("likes", JSON.stringify(likesData));

      setLoading(null);
      // Simulando una respuesta exitosa
      return { success: true };
    } catch (error) {
      setLoading(null);
      // Simulando un error
      return { success: false, error };
    }
  };

  const deleteLikes = async (id) => {
    setLoading("delete_like");
    try {
      const storedLikes = localStorage.getItem("likes");
      const likesData = storedLikes ? JSON.parse(storedLikes) : {};

      // Elimina el like del restaurante
      delete likesData[id];

      // Actualiza el estado con el nuevo objeto de likes
      setLikes(likesData);

      // Almacena la información en el localStorage
      localStorage.setItem("likes", JSON.stringify(likesData));

      setLoading(null);
      // Simulando una respuesta exitosa
      return { success: true };
    } catch (error) {
      setLoading(null);
      // Simulando un error
      return { success: false, error };
    }
  };

  useEffect(() => {
    localStorage.setItem("likes", JSON.stringify(likes));
  }, [likes]);

  return (
    <RestaurantContext.Provider
      value={{
        restaurants,
        restaurant,
        likes,
        loading,
        getRestaurants,
        getRestaurant,
        getLikes,
        addLikes,
        deleteLikes,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};

export default RestaurantProvider;
