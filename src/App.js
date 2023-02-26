/* eslint-disable react-hooks/exhaustive-deps */

import React from 'react';
import { Stack } from 'react-bootstrap'
import { CurrentSettings } from './CurrentSettings';
import { useHost } from './useHost';

import './App.css';

const App = () => {
  const [settings, setCurrentSettings] = React.useState()
  const [routine, setCurrentRoutine] = React.useState()
  const host = useHost()

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
      <Stack gap={3}>
        <CurrentSettings settings={settings} routine={routine} setCurrent={setCurrentRoutine} />
        <div>Item 2</div>
      </Stack>
    </div>
  );
}

export default App;
