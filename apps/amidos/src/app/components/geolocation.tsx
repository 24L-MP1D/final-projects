'use client';
import { useGeolocation } from '@uidotdev/usehooks';

export function Locationgeo() {
  const state = useGeolocation();
  console.log(state);

  if (state.loading) {
    return <p>loading... (you may need to enable permissions)</p>;
  }

  if (state.error) {
    return <p>Enable permissions to access your location data</p>;
  }
  return state.altitude;
}
