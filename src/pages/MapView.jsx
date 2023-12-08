import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useSelector } from "react-redux";
import plane from "../assets/plane-i.png";
import L from "leaflet";

const MapView = ({ openModal }) => {
  const store = useSelector((store) => store);
  console.log(store);

  const planeIcon = L.icon({
    iconUrl: plane,
    iconSize: [20, 20],
    iconAnchor: [16, 16],
  });

  return (
    <div>
      <MapContainer
        center={[39.126163, 35.7536]}
        zoom={5}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/*  */}
        {store.flights.map((flight) => (
          <Marker
            icon={planeIcon}
            key={flight.id}
            position={[flight.lat, flight.lng]}
          >
            <Popup>
              <div className="popup">
                <span>Kod: {flight.code}</span>
                <button onClick={() => openModal(flight.id)}>Detay</button>
              </div>
            </Popup>
          </Marker>
        ))}
        <Polyline positions={store.route} />
      </MapContainer>
    </div>
  );
};

export default MapView;
