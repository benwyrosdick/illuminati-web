/* eslint-disable react-hooks/exhaustive-deps */

import React from 'react';
import { Stack, Form } from 'react-bootstrap'
import { CurrentSettings } from './CurrentSettings';
import { HostContext } from './useHost';

import './App.css';

const App = () => {
  const [host, setHost] = React.useState('http://rgbmap.local:5000')
  const [settings, setCurrentSettings] = React.useState()
  const [routine, setCurrentRoutine] = React.useState()

  const loadData = async () => {
    const res = await fetch(host)
    const data = await res.json()

    setCurrentSettings(data)
    setCurrentRoutine(data.routine)
  }

  React.useEffect(() => {
    console.log({host})
    if (host) {
      loadData()
    }
  }, [host])

  return (
    <div className="App">
      <header className="App-header">
        Illuminati Web
      </header>
      <div className="main">
        <Stack gap={4}>
          <Stack gap={1}>
            <strong>Host</strong>
            <Form.Control className='host-input' type="text" value={host} onChange={e => setHost(e.target.value)} />
          </Stack>
          <HostContext.Provider value={{host, setHost}}>
            <CurrentSettings settings={settings} routine={routine} setCurrent={setCurrentRoutine} />
          </HostContext.Provider>
        </Stack>
      </div>
    </div>
  );
}

export default App;
