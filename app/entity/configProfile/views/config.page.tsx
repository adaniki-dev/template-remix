import { Card, CardContent, CardHeader } from '@/components/ui/card';
import DataTableContact from '../components/contacts/table';
import { ContactsProviders } from '../context/contactsContext/provider';
import Header from '../components/contacts/header';
import { SuspenseWrapper } from '@/components/SuspenseWrapper';
import AddContactFormSheet from '../components/form/addContactForm';

export default async function ConfigProfilePage(props: any) {
  return (
    <ContactsProviders>
      <div className="grid gap-4">
        <Card className="bg-yellow-100">
          <CardHeader>
            <h1 className="text-xl">
              Configure contatos administrativos para receber alertas cruciais!
            </h1>
          </CardHeader>
          <CardContent>
            <ul className="text-sm mt-[-24px]">
              <li>Receba notificações instantâneas sobre status do serviços</li>
            </ul>
          </CardContent>
        </Card>
        <div className="flex flex-col gap-4">
          <Header />
          <DataTableContact />
        </div>
      </div>
      <SuspenseWrapper modal={AddContactFormSheet} />
    </ContactsProviders>
  );
}
