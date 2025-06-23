
import CrudComponent from '@/components/CrudComponent';
import { WelcomeHeader } from '@/components/welcome-header';

export default function CareerTypes() {
  return (
    <>
    <WelcomeHeader/>
    <CrudComponent
      endpoint="/api/type-entrepreneurship"
      title="Tipo de emprendimiento"
      singularName="tipo de emprendimiento"
    />
    </>
  );
}
