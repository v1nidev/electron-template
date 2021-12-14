export function getPrecision(number: number) {
  if (!isFinite(number)) return 0;
  var e = 1, p = 0;
  while (Math.round(number * e) / e !== number) {
    e *= 10; p++;
  }
  return p;
}