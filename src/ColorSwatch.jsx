import React from 'react';

import './ColorSwatch.css'

const ColorSwatch = ({color, handler}) => {
  if (!color) return null

  const textTheme = (color[0] + color[1] + color[2]) / 3 > 128 ? 'dark' : 'light'

  return (
    <div>
      <div className="swatch" onClick={handler} style={{backgroundColor: `rgb(${color.join(',')})`}}>
        <span className={textTheme}>({color.join(', ')})</span>
      </div>
    </div>
  )
}

export { ColorSwatch }
