export default function cleanToDigits(input: string): string {
  return input.replace(/\D/g, '');
}
