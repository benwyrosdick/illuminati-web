/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Stack, Button, Form } from 'react-bootstrap'
import debounce from 'lodash.debounce'
import { useHost } from './useHost';
import { hslToRgb, rgbToHex, hexToRgb } from './colorHelpers'

import { ColorSwatch } from './ColorSwatch'
import { Theme } from './Theme'

import './CurrentSettings.css'

const CurrentSettings = ({settings, routine, setCurrent}) => {
  const { host } = useHost()

  const [name, setName] = React.useState(null)
  const [args, setArgs] = React.useState(null)
  const [customColor, setCustomColor] = React.useState([255,255,255])

  const colors = [0,30,60,120,240,270,300].map(hue => hslToRgb(hue, 100, 50))

  React.useEffect(() => {
    if (!routine) return

    setName(routine.name)
    setArgs(routine.args)
  }, [routine])

  const setRoutine = (name) => async () => {
    let params = [];

    if (args.colors) {
      for (let i = 0; i < args.colors.length; i++) {
        params.push(`color=${rgbToHex(...args.colors[i])}`);
      }
    }
    
    const url = `${host}/routine/${name}?${params.join('&')}`
    const res = await fetch(url)
    const data = await res.json()

    setCurrent(data)
  }

  const debouncedLightupdate = debounce(async (arg) => {
    let params = [];

    if (args.colors) {
      for (let i = 0; i < args.colors.length; i++) {
        params.push(`color=${rgbToHex(...args.colors[i])}`);
      }
    }

    if (args.delay !== undefined) {
      params.push(`delay=${args.delay}`);
    }

    if (args.length !== undefined) {
      params.push(`length=${args.length}`);
    }

    if (args.spacing !== undefined) {
      params.push(`spacing=${args.spacing}`);
    }

    if (args.spread !== undefined) {
      params.push(`spread=${args.spread}`);
    }

    if (args.surround_spacing !== undefined) {
      params.push(`surround_spacing=${args.surround_spacing}`);
    }

    if (args.reverse) {
      params.push(`reverse=true`);
    }

    const url = `${host}/routine/${name}?${params.join('&')}`
    fetch(url)
  }, 100)

  React.useEffect(() => {
    if (args) {
      debouncedLightupdate(args)
    }
  }, [args])

  const updateArg = (name) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    const updatedArgs = { ...args, [name]: value }
    setArgs(updatedArgs)
  }

  const removeColor = (idx) => () => {
    const updatedArgs = { ...args, colors: args.colors.filter((c, i) => i !== idx) }
    setArgs(updatedArgs)
  }

  const addColor = (color) => () => {
    const updatedArgs = { ...args, colors: [...args.colors, color] }
    setArgs(updatedArgs)
  }

  const setColors = (colors) => () => {
    const updatedArgs = { ...args, colors }
    setArgs(updatedArgs)
  }

  if (!settings) return null
  if (!routine) return null
  if (!args) return null
  if (!name) return null

  return (
    <Stack gap={4} className='CurrentSettings'>
      <Stack gap={1}>
        <strong>Routine</strong>
        <Stack gap={1} direction='horizontal'>
          {settings.routines.map((routine, i) => ( <Button key={i} variant={routine === name ? "primary" : "secondary"} onClick={setRoutine(routine)}>{routine}</Button> ))}
        </Stack>
      </Stack>

      <Stack gap={1}>
        <strong>Current Colors</strong>
        <Stack gap={1} direction='horizontal'>
          {args.colors.map((color, i) => ( <ColorSwatch key={i} color={color} handler={removeColor(i)} /> ))}
        </Stack>
      </Stack>

      <Stack gap={1}>
        <strong>Available Colors</strong>
        <Stack gap={1} direction='horizontal'>
          {colors.map((color, i) => ( <ColorSwatch key={i} color={color} handler={addColor(color)} /> ))}
          <ColorSwatch color={customColor} handler={addColor(customColor)} />
          <input type="color" defaultValue={"#" + rgbToHex(...customColor)} onChange={(e) => {setCustomColor(hexToRgb(e.target.value))}} />
        </Stack>
      </Stack>

      <Stack gap={1}>
        <strong>Available Themes</strong>
        <Stack gap={1} direction='horizontal'>
          {Object.entries(settings.themes).map(([name, colors], i) => ( <Theme key={i} name={name} colors={colors} handler={setColors(colors)} /> ))}
        </Stack>
      </Stack>

      <Stack gap={1}>
        <strong>Delay</strong>
        <Stack gap={2} direction='horizontal'>
          <Form.Control type="number" value={args.delay} onChange={updateArg('delay')} min={5} max={1000} />
          <Form.Range type="range" value={args.delay} onChange={updateArg('delay')} min={5} max={1000} step={5} />
        </Stack>
      </Stack>

      <Stack gap={1}>
        <strong>Length</strong>
        <Stack gap={2} direction='horizontal'>
          <Form.Control type="number" value={args.length} onChange={updateArg('length')} min={1} max={50} />
          <Form.Range type="range" value={args.length} onChange={updateArg('length')} min={1} max={50} />
        </Stack>
      </Stack>

      <Stack gap={1}>
        <strong>Spread</strong>
        <Stack gap={2} direction='horizontal'>
          <Form.Control type="number" value={args.spread} onChange={updateArg('spread')} min={0} max={30} />
          <Form.Range type="range" value={args.spread} onChange={updateArg('spread')} min={0} max={30} />
        </Stack>
      </Stack>

      {/* <Stack gap={1}>
        <strong>Sequence Max</strong>
        <Stack gap={2} direction='horizontal'>
          <Form.Control type="number" value={args.sequence_max} onChange={updateArg('sequence_max')} min={1} max={500} />
          <Form.Range type="range" value={args.sequence_max} onChange={updateArg('sequence_max')} min={1} max={500} />
        </Stack>
      </Stack> */}

      <Stack gap={1}>
        <strong>Spacing</strong>
        <Stack gap={2} direction='horizontal'>
          <Form.Control type="number" value={args.spacing} onChange={updateArg('spacing')} min={0} max={20} />
          <Form.Range type="range" value={args.spacing} onChange={updateArg('spacing')} min={0} max={20} />
        </Stack>
      </Stack>

      <Stack gap={1}>
        <strong>Surround Spacing</strong>
        <Stack gap={2} direction='horizontal'>
          <Form.Control type="number" value={args.surround_spacing} onChange={updateArg('surround_spacing')} min={0} max={20} />
          <Form.Range type="range" value={args.surround_spacing} onChange={updateArg('surround_spacing')} min={0} max={20} />
        </Stack>
      </Stack>

      <Stack gap={1}>
        <strong>Reverse</strong>
        <Form.Check type="checkbox" label="Reverse" value={args.reverse} onChange={updateArg('reverse')} />
      </Stack>
    </Stack>
  )
}

export { CurrentSettings }
