export default function extractWhatsAppNumbers(input: string) {
  if (!input) return input;
  const regex = /\d+(?=:)/g;
  const matches = input.match(regex);
  if (matches) {
    return matches.join('');
  }
  const regex2 = /\d+(?=@)/g;
  const matches2 = input.match(regex2);
  if (matches2) {
    return matches2.join('');
  }
  return input;
}
