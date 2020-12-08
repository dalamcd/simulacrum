import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom"
import './index.css';
import { ApplicationViews } from './components/ApplicationViews';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ApplicationViews />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);