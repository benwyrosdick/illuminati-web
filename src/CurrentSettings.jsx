import React from 'react';
import { Stack, Button } from 'react-bootstrap'
import { useHost } from './useHost';

import { ColorSwatch } from './ColorSwatch'

const CurrentSettings = ({settings, routine, setCurrent}) => {
  const host = useHost()

  if (!settings) return null
  if (!routine) return null
  
  console.log('CurrentSettings', settings)
  const { name, args: {colors, delay, length, reverse, sequence_max, spacing, surround_spacing} } = routine
  
  const setRoutine = (name) => async () => {
    console.log('setRoutine', name)
    const res = await fetch(host + '/routine/' + name)
    const data = await res.json()

    setCurrent(data)
  }

  return (
    <Stack gap={3}>
      <div>Routine</div>
      <Stack gap={1} direction='horizontal'>
        {settings.routines.map((routine, i) => ( <Button variant={routine === name ? "primary" : "secondary"} onClick={setRoutine(routine)}>{routine}</Button> ))}
      </Stack>

      <div>Colors</div>
      <Stack gap={1} direction='horizontal'>
        {colors.map((color, i) => ( <ColorSwatch key={i} color={color} /> ))}
      </Stack>

      <div>Delay</div>
      <div>{delay}</div>

      <div>Length</div>
      <div>{length}</div>

      <div>Sequence Max</div>
      <div>{sequence_max}</div>

      <div>Spacing</div>
      <div>{spacing}</div>

      <div>Surround Spacing</div>
      <div>{surround_spacing}</div>

      <div>Reverse</div>
      <div>{reverse}</div>
    </Stack>
  )
}

export { CurrentSettings }
