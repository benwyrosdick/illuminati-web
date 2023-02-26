import React from 'react';
import { Stack, Button, Form } from 'react-bootstrap'
import debounce from 'lodash.debounce'
import { useHost } from './useHost';

import { ColorSwatch } from './ColorSwatch'

import './CurrentSettings.css'

const CurrentSettings = ({settings, routine, setCurrent}) => {
  const host = useHost()

  const [name, setName] = React.useState(null)
  const [args, setArgs] = React.useState(null)

  
  React.useEffect(() => {
    if (!routine) return

    setName(routine.name)
    setArgs(routine.args)
  }, [routine])

  const setRoutine = (name) => async () => {
    const res = await fetch(host + '/routine/' + name)
    const data = await res.json()

    setCurrent(data)
  }

  const debouncedLightupdate = debounce((arg) => {
    let params = [];

      if (args.color) {
        for (let i = 0; i < args.color.length; i++) {
          params.push(`color=${args.color[i].map((v) => v.toString(16).padStart(2, '0')).join('')}`);
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

      if (args.surround_spacing !== undefined) {
        params.push(`surround_spacing=${args.surround_spacing}`);
      }

      if (args.reverse) {
        params.push(`reverse=true`);
      }

      const url = `${host}/routine/${name}?${params.join('&')}`
      fetch(url)
  }, 200)

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

  if (!settings) return null
  if (!routine) return null
  if (!args) return null
  if (!name) return null

  return (
    <Stack gap={4}>
      <Stack gap={1}>
        <strong>Routine</strong>
        <Stack gap={1} direction='horizontal'>
          {settings.routines.map((routine, i) => ( <Button key={i} variant={routine === name ? "primary" : "secondary"} onClick={setRoutine(routine)}>{routine}</Button> ))}
        </Stack>
      </Stack>

      <Stack gap={1}>
        <strong>Colors</strong>
        <Stack gap={1} direction='horizontal'>
          {args.colors.map((color, i) => ( <ColorSwatch key={i} color={color} /> ))}
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
