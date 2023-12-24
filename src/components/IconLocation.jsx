import React from 'react'
import venueLocationIcon from '../assets/venue_location_icon.svg';
import L from 'leaflet'

const IconLocation = L.icon({
  iconUrl: venueLocationIcon,
  iconRetinaUrl: venueLocationIcon,
  iconAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: [35, 35],
  className: 'leaflet-venue-icon'
})

export default IconLocation