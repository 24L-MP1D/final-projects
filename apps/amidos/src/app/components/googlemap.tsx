'use client';
import { useGeolocation } from '@uidotdev/usehooks';
import { APIProvider, AdvancedMarker, Map, useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';

export function Googlemap() {
  const state = useGeolocation();
  const GOOGLE_API = String(process.env.GOOGLE_API);
  if (state.loading) {
    return <p>loading... (you may need to enable permissions)</p>;
  }

  if (state.error) {
    return <p>Enable permissions to access your location data</p>;
  }

  const position = { lat: Number(state.latitude), lng: Number(state.longitude) };
  if (!position) {
    return;
  } else {
    return (
      <div style={{ height: '500px', width: 'full' }}>
        <APIProvider apiKey="AIzaSyCYuf3C9btTOUo7_OddJlPg0rjJuwLWf_I">
          <Map defaultCenter={position} defaultZoom={10} mapId="myMap" fullscreenControl={false}>
            <AdvancedMarker position={position} />
          </Map>
          <Directions />
        </APIProvider>
      </div>
    );
  }
}
function Directions() {
  const map = useMap();
  const routesLibrary = useMapsLibrary('routes');
  const [directionsService, setDirectionsservicce] = useState<google.maps.DirectionsService>();
  const [directionsRenderer, setDirectionsrenderer] = useState<google.maps.DirectionsRenderer>();
  const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
  const [routeIndex, setRouteIndex] = useState(0);
  const selected = routes[routeIndex];
  const leg = selected?.legs[0];

  useEffect(() => {
    if (!routesLibrary || !map) return;
    setDirectionsservicce(new routesLibrary.DirectionsService());
    setDirectionsrenderer(new routesLibrary.DirectionsRenderer({ map }));
  }, [routesLibrary, map]);

  useEffect(() => {
    if (!directionsService || !directionsRenderer) return;
    directionsService
      .route({
        origin: 'BZD - 42 khoroo, Ulaanbaatar',
        destination: 'Galaxy Tower, Ulaanbaatar',
        travelMode: google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true,
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
        setRoutes(response.routes);
      });
  }, [directionsService, directionsRenderer]);
  console.log(routes);
  if (!leg) return null;
  return (
    <div className="directions">
      <h2>{selected.summary}</h2>
    </div>
  );
}
