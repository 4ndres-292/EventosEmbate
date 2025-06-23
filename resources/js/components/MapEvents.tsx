import { useMapEvents } from 'react-leaflet';
import type { LeafletMouseEvent } from 'leaflet';

export default function MapEvents({ onSelectLocation }: { onSelectLocation: (value: string) => void }) {
  useMapEvents({
    click(e: LeafletMouseEvent) {
      const lat = e.latlng.lat.toFixed(6);
      const lng = e.latlng.lng.toFixed(6);
      onSelectLocation(`${lat},${lng}`);
    },
  });

  return null;
}
