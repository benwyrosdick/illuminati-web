import React from 'react';

const HostContext = React.createContext(null)
const useHost = () => React.useContext(HostContext)

export {
  HostContext,
  useHost,
}