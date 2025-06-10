export function useContactData(queryContact: any) {
  const phones = queryContact.data?.data.phones || [];
  const emails = queryContact.data?.data.emails || [];
  const contactLength = phones.length + emails.length;

  return { contactLength, phones, emails };
}
