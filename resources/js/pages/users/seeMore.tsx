import Modal from '@/components/modal';

type EventType = {
  name_event: string;
  description_event: string;
  date_event: string;
  image_event: string;
  location: string;
  owner: string;
};

interface Props {
  event: EventType;
  onClose: () => void;
}

export default function SeeMore({ event, onClose }: Props) {
  return (
    <Modal onClose={onClose}>
      <h2 className="text-xl font-bold">{event.name_event}</h2>
      <p className="mt-2 text-gray-700">{event.description_event}</p>
      <img src={`/${event.image_event}`} alt="Evento" className="mt-4 w-full rounded-lg" />
      <p className="mt-2"><strong>Fecha:</strong> {event.date_event}</p>
      <p><strong>Ubicación:</strong> {event.location}</p>
      <p><strong>Organizador:</strong> {event.owner}</p>
    </Modal>
  );
}
