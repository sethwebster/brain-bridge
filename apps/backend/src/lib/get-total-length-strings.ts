export default function getTotalLengthOfStrings(strings: string[]) {
  return strings.reduce((total, string) => total + string.length, 0)
}
