import UpdateModal from './UpdateModal';

export default function ModalController({ segment }: { segment: string | null }) {
  if (segment === 'update') return <UpdateModal />;
  else return;
}
