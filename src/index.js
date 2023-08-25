import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// in ./context/AuthContext.js on line 28 we have the component AuthContextProvider this component is needs to wrap our entire application
import { AuthContextProvider } from './context/AuthContext';

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
