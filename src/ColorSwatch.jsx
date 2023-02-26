import React from 'react';

import './ColorSwatch.css'

const ColorSwatch = ({color, handler}) => {
  if (!color) return null

  return (
    <div>
      <div className="swatch" onClick={handler} style={{backgroundColor: `rgb(${color.join(',')})`}} />
    </div>
  )
}

export { ColorSwatch }
