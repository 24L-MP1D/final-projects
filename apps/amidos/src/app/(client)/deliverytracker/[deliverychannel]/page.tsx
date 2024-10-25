'use client';
import { useGeolocation } from '@uidotdev/usehooks';
import { APIProvider, AdvancedMarker, Map, useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import * as Ably from 'ably';
import { AblyProvider, ChannelProvider, useChannel, useConnectionStateListener } from 'ably/react';
import { useEffect, useState } from 'react';

export default function Deliverytracker({ params }: { params: { deliverychannel: string } }) {
  const state = useGeolocation();
  const deliverychannel = params.deliverychannel;
  const GOOGLE_API = String(process.env.GOOGLE_API);
  const latitude = state.latitude;
  const longitude = state.longitude;

  const client = new Ably.Realtime('Nh6tIw.Klcmeg:giWLIzmJQ9jQ_ovhkmin61JtSF5QScEZb_EQgxLTr5I');
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
            <div style={{ height: '500px', width: 'full' }}>
              <APIProvider apiKey="AIzaSyCYuf3C9btTOUo7_OddJlPg0rjJuwLWf_I">
                <Map defaultCenter={position} defaultZoom={10} mapId="myMap" fullscreenControl={false}>
                  <AdvancedMarker position={position} />
                  <Directions latitude={latitude} longitude={longitude} />
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
    if (!routesLibrary || !map) return;
    setDirectionsservicce(new routesLibrary.DirectionsService());
    setDirectionsrenderer(new routesLibrary.DirectionsRenderer({ map }));
  }, [routesLibrary, map]);

  const [messages, setMessages] = useState<Ably.Message[]>([]);
  console.log(messages);
  function getlocation({ deliverychannel }: { deliverychannel: string }) {
    useConnectionStateListener('connected', () => {
      console.log('Connected to Ably');
    });

    const { channel } = useChannel(deliverychannel, 'message', (message) => {
      setMessages((previousMessages) => [message, ...previousMessages]);
    });
    return <></>;
  }

  useEffect(() => {
    getlocation;
  }, [messages]);

  useEffect(() => {
    if (!directionsService || !directionsRenderer) return;
    directionsService
      .route({
        origin: '47.91542, 106.92148',
        destination: `${latitude}, ${longitude}`,
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
