/* eslint-disable react-hooks/exhaustive-deps */

import React from 'react';
import { CurrentSettings } from './CurrentSettings';
import { HostContext } from './useHost';

import './App.css';

const App = () => {
  const [host, setHost] = React.useState('http://10.0.0.50:5000')
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
        <HostContext.Provider value={{host, setHost}}>
          <CurrentSettings settings={settings} routine={routine} setCurrent={setCurrentRoutine} />
        </HostContext.Provider>
      </div>
    </div>
  );
}

export default App;
