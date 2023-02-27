const hslToRgb = (h, s, l) => {
  l /= 100
  const a = s * Math.min(l, 1 - l) / 100
  const f = n => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
  }

  return [f(0), f(8), f(4)]
}

const rgbToHex = (r, g, b) => {
  const rgb = [r, g, b]
  return `${rgb.map(c => c.toString(16).padStart(2, '0')).join('')}`
}

const hslToHex = (h, s, l) => {
  const rgb = hslToRgb(h, s, l)
  return rgbToHex(...rgb)
}

export {
  hslToRgb,
  hslToHex,
  rgbToHex,
}
