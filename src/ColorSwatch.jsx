import React from 'react';

import './ColorSwatch.css'

const ColorSwatch = ({color}) => {
  if (!color) return null

  return (
    <div>
      <div className="swatch" style={{backgroundColor: `rgb(${color.join(',')})`}} />
    </div>
  )
}

export { ColorSwatch }
