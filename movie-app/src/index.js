import React from 'react';
import ReactDOMClient from 'react-dom/client';
import './index.css';
import App from './App';

const rootElement =  document.getElementById('root')
ReactDOMClient.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);