'use client';
import { useGeolocation } from '@uidotdev/usehooks';
import { APIProvider, AdvancedMarker, Map, useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';

export function Googlemap() {
  const state = useGeolocation();
  const latitude = state.latitude;
  const longitude = state.longitude;
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
      <div style={{ height: '500px', width: 'full' }} className="relative">
        <APIProvider apiKey="AIzaSyCYuf3C9btTOUo7_OddJlPg0rjJuwLWf_I">
          <Map defaultCenter={position} defaultZoom={10} mapId="myMap" fullscreenControl={true}>
            <AdvancedMarker position={position} />
          </Map>
          <Directions latitude={latitude} longitude={longitude} />
        </APIProvider>
      </div>
    );
  }
}
type Props = {
  latitude: Number | null;
  longitude: Number | null;
};
function Directions({ latitude, longitude }: Props) {
  const map = useMap();
  const routesLibrary = useMapsLibrary('routes');
  const [directionsService, setDirectionsservicce] = useState<google.maps.DirectionsService>();
  const [directionsRenderer, setDirectionsrenderer] = useState<google.maps.DirectionsRenderer>();
  const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
  const [routeIndex, setRouteIndex] = useState(0);
  const selected = routes[routeIndex];
  const leg = selected?.legs[0];

  useEffect(() => {
    if (!directionsRenderer) return;
    directionsRenderer.setRouteIndex(routeIndex);
  }, [routeIndex, directionsRenderer]);

  useEffect(() => {
    if (!routesLibrary || !map) return;
    setDirectionsservicce(new routesLibrary.DirectionsService());
    setDirectionsrenderer(new routesLibrary.DirectionsRenderer({ map }));
  }, [routesLibrary, map]);

  useEffect(() => {
    if (!directionsService || !directionsRenderer) return;
    directionsService
      .route({
        origin: `${latitude}, ${longitude}`,
        destination: '47.91542, 106.92148',
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
    <div className="directions absolute top-0 right-0 bg-gray-400 text-white w-[400px]  md:p-6 pt-4 pb-4 pl-4 rounded-lg flex flex-col gap-3">
      <div>
        <h2 className="md:text-xl text-base font-bold">{selected.summary}</h2>
        <p className="md:text-xs text-base">
          {leg.start_address.split(',')[0]} - {leg.end_address.split(',')[0]}
        </p>
        <p className="text-xs">Зай: {leg.distance?.text}</p>
        <p className="text-xs">Хугацаа: {leg.duration?.text}</p>
      </div>
      <div>
        <h2 className="md:text-lg text-base font-bold text-white">Бусад замууд</h2>
        <ul>
          {routes.map((route, index) => (
            <li key={route.summary} className="text-xs text-yellow-200 list-disc">
              <button onClick={() => setRouteIndex(index)}>{route.summary}</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
