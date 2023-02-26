import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { HostContext } from './useHost';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<HostContext.Provider value={"http://10.0.0.50:5000"}>
  <App />
</HostContext.Provider>);
