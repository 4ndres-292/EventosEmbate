
import CrudComponent from '@/components/CrudComponent';
import { WelcomeHeader } from '@/components/welcome-header';

export default function CareerTypes() {
  return (
    <>
    <WelcomeHeader/>
    <CrudComponent
      endpoint="/api/institutions"
      title="Instituciones"
      singularName="institución"
    />
    </>
  );
}
