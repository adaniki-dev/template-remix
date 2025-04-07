export default function formatarData(dataISO: string | null | undefined, onlyDate = false): string {
  if (!dataISO) {
    return 'sem data';
  }

  const data = new Date(dataISO);

  if (isNaN(data.getTime())) {
    return 'sem data';
  }

  const dia = data.getUTCDate().toString().padStart(2, '0');
  const mes = (data.getUTCMonth() + 1).toString().padStart(2, '0');
  const ano = data.getUTCFullYear();
  const horas = data.getUTCHours().toString().padStart(2, '0');
  const minutos = data.getUTCMinutes().toString().padStart(2, '0');

  if (onlyDate) {
    return `${dia}/${mes}/${ano}`;
  }
  return `${dia}/${mes}/${ano} ${horas}:${minutos}`;
}
