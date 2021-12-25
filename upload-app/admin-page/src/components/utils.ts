const suffixes = [" Bytes", " KB", " MB", " GB"];

export function displaySize(num: number) {
  let num2 = num * 1.0,
    index = 0;
  while (num2 / 1024 > 1.0) {
    num2 /= 1024;
    index++;
  }
  return num2.toFixed(3) + suffixes[index];
}
