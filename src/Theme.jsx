import React from 'react';

import './Theme.css'

const Theme = ({name, colors, handler}) => {
  if (!colors) return null

  const gradientWidth = 15
  const gradient = "repeating-linear-gradient(60deg, " + colors.map((color, i) => `rgb(${color.join(",")}) ${i*gradientWidth}px, rgb(${color.join(",")}) ${i*gradientWidth+gradientWidth}px`).join(",") + ")"

  return (
    <div>
      <div className="swatch" onClick={handler} style={{background: gradient}}>
        <span className="light">{name}</span>
      </div>
    </div>
  )
}

export { Theme }
