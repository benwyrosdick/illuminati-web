import React from 'react';

const HostInfo = {
  host: null,
  setHost: () => {},
}

const HostContext = React.createContext(HostInfo)
const useHost = () => React.useContext(HostContext)

export {
  HostContext,
  useHost,
}
