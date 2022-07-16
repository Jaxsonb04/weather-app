// Convert temperature from Kelvin to Celsius or Fahrenheit

export default function convertTemp({
  temp,
  to,
}: {
  temp: number;
  to: 'C' | 'F';
}): number {
  if (to === 'C') {
    // round to one decimal place
    return Math.round((temp - 273.15) * 10) / 10;
  } else {
    return Math.round(((temp * 9) / 5 - 459.67) * 10) / 10;
  }
}
