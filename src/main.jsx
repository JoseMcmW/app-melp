// eslint-disable-next-line no-unused-vars
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
/* import axios from 'axios' */
import { BrowserRouter } from 'react-router-dom';
import RestaurantProvider from './Context/restaurantContext.jsx';
import './index.css'
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <RestaurantProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </RestaurantProvider>,
)
