export function adaptFormatPhoneToAPI(phone: string): string {
  const regex = /^(\d{2})(9)(\d{8})$/;
  const match = phone.match(regex);
  if (match) {
    return `${match[1]}${match[3]}`;
  }
  return phone;
}

export function formatPhoneNumber(phoneNumber: string): string {
  if (!phoneNumber) {
    return phoneNumber;
  }
  // Regex para encontrar o padrão do número de telefone
  const regex = /^55(\d{2})(\d{4,5})(\d{4})$/;
  const regex2 = /(\d{2})(\d{4,5})(\d{4})$/;
  // Tenta fazer o match do número com o padrão
  const match = phoneNumber.match(regex);

  // Se o número não corresponder ao padrão, retorna o número original
  if (!match) {
    const match2 = phoneNumber.match(regex2);
    if (match2) {
      const [, ddd, firstPart, lastPart] = match2;
      return `(${ddd}) ${firstPart}-${lastPart}`;
    }
    return phoneNumber;
  }

  // Extrai os grupos capturados
  const [, ddd, firstPart, lastPart] = match;
  // Formata o número
  return `(${ddd}) ${firstPart}-${lastPart}`;
}
