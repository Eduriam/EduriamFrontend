export function timeMMSS(milliseconds: number): string {
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);

  seconds %= 60;
  minutes %= 60;

  return `${twoDigits(minutes)}:${twoDigits(seconds)}`;
}

export function timeHHMMSS(milliseconds: number): string {
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  seconds %= 60;
  minutes %= 60;
  hours %= 60;

  return `${twoDigits(hours)}:${twoDigits(minutes)}:${twoDigits(seconds)}`;
}

function twoDigits(number: number) {
  return number.toString().padStart(2, "0");
}
