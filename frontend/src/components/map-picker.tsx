'use client';

import L from 'leaflet';
import { useEffect, useState } from 'react';
import { Circle, MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapPickerProps {
  latitude: number;
  longitude: number;
  radius: number;
  onLocationChange: (lat: number, lng: number) => void;
  className?: string;
}

function MapEventHandler({
  onLocationChange,
}: {
  onLocationChange: (lat: number, lng: number) => void;
}) {
  useMapEvents({
    click(e) {
      onLocationChange(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export default function MapPicker({
  latitude,
  longitude,
  radius,
  onLocationChange,
  className = '',
}: MapPickerProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div
        className={`w-full h-[400px] bg-gray-100 rounded-lg flex items-center justify-center ${className}`}
      >
        <p className="text-gray-500">Loading map...</p>
      </div>
    );
  }

  const position: [number, number] = [latitude || -6.2, longitude || 106.816666];

  return (
    <div
      className={`w-full h-[400px] rounded-lg overflow-hidden border border-blue-300 ${className}`}
    >
      <MapContainer
        center={position}
        zoom={15}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapEventHandler onLocationChange={onLocationChange} />
        {latitude && longitude && (
          <>
            <Marker position={position} />
            {radius > 0 && (
              <Circle
                center={position}
                radius={radius}
                pathOptions={{
                  color: 'blue',
                  fillColor: '#3b82f6',
                  fillOpacity: 0.2,
                }}
              />
            )}
          </>
        )}
      </MapContainer>
    </div>
  );
}
