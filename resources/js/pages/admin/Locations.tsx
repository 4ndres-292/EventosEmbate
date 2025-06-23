
import CrudComponent from '@/components/CrudComponent';
import { WelcomeHeader } from '@/components/welcome-header';

export default function CareerTypes() {
  return (
    <>
    <WelcomeHeader/>
    <CrudComponent
      endpoint="/api/locations"
      title="Ubicaciones"
      singularName="ubicación"
    />
    </>
  );
}
