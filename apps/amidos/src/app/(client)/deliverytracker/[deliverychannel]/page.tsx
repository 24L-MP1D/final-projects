'use client';
import { useGeolocation } from '@uidotdev/usehooks';
import { APIProvider, Map, Marker, useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import * as Ably from 'ably';
import { AblyProvider, ChannelProvider, useChannel, useConnectionStateListener } from 'ably/react';
import { useEffect, useState } from 'react';

export default function Deliveryperson({ params }: { params: { deliverychannel: string } }) {
  const state = useGeolocation();
  const deliverychannel = params.deliverychannel;
  const latitude = state.latitude;
  const longitude = state.longitude;
  const GOOGLE_API = String(process.env.GOOGLE_API);
  const client = new Ably.Realtime({ key: 'Nh6tIw.Klcmeg:giWLIzmJQ9jQ_ovhkmin61JtSF5QScEZb_EQgxLTr5I' });

  if (state.loading) {
    return <p>Loading... (you may need to enable permissions)</p>;
  }

  if (state.error) {
    return <p>Enable permissions to access your location data</p>;
  }

  const position = { lat: Number(state.latitude), lng: Number(state.longitude) };

  return (
    <div>
      <AblyProvider client={client}>
        <ChannelProvider channelName={deliverychannel}>
          <div style={{ height: '500px', width: '100%' }} className="relative">
            <APIProvider apiKey="AIzaSyCYuf3C9btTOUo7_OddJlPg0rjJuwLWf_I">
              <Map defaultCenter={position} defaultZoom={10} mapId="myMap" fullscreenControl={false}>
                <Marker position={position} />
                <Directions latitude={latitude} longitude={longitude} deliverychannel={deliverychannel} />
              </Map>
            </APIProvider>
          </div>
        </ChannelProvider>
      </AblyProvider>
    </div>
  );
}

type Props = {
  latitude: number | null;
  longitude: number | null;
  deliverychannel: string;
};

function Directions({ latitude, longitude, deliverychannel }: Props) {
  const map = useMap();
  const routesLibrary = useMapsLibrary('routes');
  const [directionsService, setDirectionsService] = useState<google.maps.DirectionsService>();
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer>();
  const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
  const [routeIndex, setRouteIndex] = useState(0);
  const [messages, setMessages] = useState<Ably.Message>();

  const deliverypersonposition = messages?.data;
  const deliveryperson = deliverypersonposition?.join(', ');

  useConnectionStateListener('connected', () => { });

  const { channel } = useChannel(deliverychannel, 'message', (message) => {
    setMessages(message);
  });

  useEffect(() => {
    if (!directionsRenderer) return;
    directionsRenderer.setRouteIndex(routeIndex);
  }, [routeIndex, directionsRenderer]);

  useEffect(() => {
    if (!routesLibrary || !map) return;
    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
  }, [routesLibrary, map]);

  useEffect(() => {
    if (!directionsService || !directionsRenderer || !deliveryperson) return;
    directionsService
      .route({
        origin: `${deliveryperson}`,
        destination: `${latitude}, ${longitude}`,
        travelMode: google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true,
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
        setRoutes(response.routes);
      });
  }, [directionsService, directionsRenderer, deliveryperson, latitude, longitude]);

  const selected = routes[routeIndex];
  const leg = selected?.legs[0];
  if (!leg) return null;

  return (
    <div className="directions absolute top-0 right-0 bg-slate-500 text-white w-[400px] p-6 rounded-lg flex flex-col gap-3">
      <div>
        <h2 className="text-xl font-bold">{selected.summary}</h2>
        <p className="text-xs">
          {leg.start_address.split(',')[0]} - {leg.end_address.split(',')[0]}
        </p>
        <p className="text-xs">Distance: {leg.distance?.text}</p>
        <p className="text-xs">Duration: {leg.duration?.text}</p>
      </div>
      <div>
        <h2 className="text-lg font-bold text-white">Other Routes</h2>
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