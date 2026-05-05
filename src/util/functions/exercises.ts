export function removeInterpunction(text: string) {
  text = text.replace(/[.,?!]/g, "");
  text = text.replace(/\s{2,}/g, " ");

  return text;
}
