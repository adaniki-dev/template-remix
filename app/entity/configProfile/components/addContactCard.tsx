import AddContactForm from '../components/addContactForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AddContactCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="w-full flex item justify-between">
          Adicionar contato administrativo
        </CardTitle>
      </CardHeader>
      <CardContent>
        <AddContactForm />
      </CardContent>
    </Card>
  );
}
