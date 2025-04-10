import React from 'react';
import { createRoot } from 'react-dom/client';
import '../src/styles/index.css';
import Home from '../src/pages/Home'

createRoot(document.getElementById('root')).render(
  <Home />
);
