// eslint-disable-next-line no-unused-vars
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Restaurants from "./views/Restaurants";
import Home from "./views/Home";
import Default from "./layout/Default";
import RestaurantMap from "./views/RestaurantMap"
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/app-melp" element={<Default />}>
          <Route index element={<Home />} />
          <Route path="restaurants" element={<Restaurants />} />
          <Route path="radius-stats" element={<RestaurantMap />} />
          <Route path="location/:id" element={<RestaurantMap />} />
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
