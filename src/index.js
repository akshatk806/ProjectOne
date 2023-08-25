import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// in ./context/AuthContext.js on line 28 we have the component AuthContextProvider this component is needs to wrap our entire application
import { AuthContextProvider } from './context/AuthContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
);