export function removeFooter(prompt: string) {
  const footerMarker = "-- do not edit below this line --";
  const footerIndex = prompt.indexOf(footerMarker);
  if (footerIndex === -1) {
    return prompt;
  }
  return prompt.substring(0, footerIndex);
}
