'use client';
import { useGeolocation } from '@uidotdev/usehooks';
import { APIProvider, AdvancedMarker, Map, useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import * as Ably from 'ably';
import { AblyProvider, ChannelProvider, useChannel, useConnectionStateListener } from 'ably/react';
import { useEffect, useState } from 'react';

const client = new Ably.Realtime({ key: 'Nh6tIw.Klcmeg:giWLIzmJQ9jQ_ovhkmin61JtSF5QScEZb_EQgxLTr5I' });

export default function Deliveryperson({ params }: { params: { deliverychannel: string } }) {
  const state = useGeolocation();
  const deliverychannel = params.deliverychannel;
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
      <div>
        <AblyProvider client={client}>
          <ChannelProvider channelName={deliverychannel}>
            <div style={{ height: '500px', width: 'full' }} className="relative">
              <APIProvider apiKey="AIzaSyCYuf3C9btTOUo7_OddJlPg0rjJuwLWf_I">
                <Map defaultCenter={position} defaultZoom={10} mapId="myMap" fullscreenControl={false}>
                  <AdvancedMarker position={position} />
                  <Directions latitude={latitude} longitude={longitude} deliverychannel={deliverychannel} />
                </Map>
              </APIProvider>
            </div>
          </ChannelProvider>
        </AblyProvider>
      </div>
    );
  }
}
type Props = {
  latitude: Number | null;
  longitude: Number | null;
  deliverychannel: string;
};
function Directions({ latitude, longitude, deliverychannel }: Props) {
  const map = useMap();
  const routesLibrary = useMapsLibrary('routes');
  const [directionsService, setDirectiionsService] = useState<google.maps.DirectionsService>();
  const [directionsRenderer, setDirectionsrenderer] = useState<google.maps.DirectionsRenderer>();
  const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
  const [routeIndex, setRouteIndex] = useState(0);
  const selected = routes[routeIndex];
  const leg = selected?.legs[0];
  useConnectionStateListener('connected', () => {});

  const { channel } = useChannel(deliverychannel, 'message');
  const sendPosition = () => {
    channel.publish('message', [latitude, longitude]);
  };
  useEffect(() => {
    sendPosition();
  }, [longitude, latitude]);

  useEffect(() => {
    if (!directionsRenderer) return;
    directionsRenderer.setRouteIndex(routeIndex);
  }, [routeIndex, directionsRenderer]);

  useEffect(() => {
    if (!routesLibrary || !map) return;
    setDirectiionsService(new routesLibrary.DirectionsService());
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

  if (!leg) return null;
  return (
    <div className="directions absolute top-0 right-0 bg-slate-500 text-white w-[400px] p-6 rounded-lg flex flex-col gap-3">
      <div>
        <h2 className="text-xl font-bold">{selected.summary}</h2>
        <p className="text-xs">
          {leg.start_address.split(',')[0]} - {leg.end_address.split(',')[0]}
        </p>
        <p className="text-xs">Зай: {leg.distance?.text}</p>
        <p className="text-xs">Хугацаа: {leg.duration?.text}</p>
      </div>
      <div>
        <h2 className="text-lg font-bold text-white">Бусад замууд</h2>
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
