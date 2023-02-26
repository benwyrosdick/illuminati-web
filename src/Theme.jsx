import React from 'react';

import './Theme.css'

const Theme = ({name, colors, handler}) => {
  if (!colors) return null

  const gradient = "repeating-linear-gradient(60deg, " + colors.map((color, i) => `rgb(${color.join(",")}) ${i*10}px, rgb(${color.join(",")}) ${i*10+10}px`).join(",") + ")"

  return (
    <div>
      <div className="theme-name">{name}</div>
      <div className="swatch" onClick={handler} style={{background: gradient}} />
    </div>
  )
}

export { Theme }
