import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle: React.CSSProperties = {
  width: '100%',
  height: '400px'
};

const center: google.maps.LatLngLiteral = {
  lat: 5.6037,
  lng: -0.1870
};

const markers: { lat: number; lng: number; label: string }[] = [
  { lat: 5.6037, lng: -0.1870, label: 'Marker 1' }, 
  { lat: 5.5471, lng: -0.1964, label: 'Marker 2' }, 
  { lat: 5.6130, lng: -0.2050, label: 'Marker 3' }  
];

const Map: React.FC = () => {
  return (
    <div className="relative w-full h-96 bg-gray-200">
      <LoadScript googleMapsApiKey="AIzaSyDEbXxEjffIFK9hmn13L1TruxH6Gz_RAuk">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={12}
        >
          {markers.map((marker, index) => (
            <Marker
              key={index}
              position={{ lat: marker.lat, lng: marker.lng }}
              label={marker.label}
            />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Map;
