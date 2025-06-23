
import CrudComponent from '@/components/CrudComponent';
import { WelcomeHeader } from '@/components/welcome-header';

export default function CareerTypes() {
  return (
    <>
    <WelcomeHeader/>
    <CrudComponent
      endpoint="/api/participant-types"
      title="Tipos de participante"
      singularName="tipos de participante"
    />
    </>
  );
}
