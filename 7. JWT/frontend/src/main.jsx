import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from "react-router-dom";
import './index.css';
import { routes } from './router/route';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>,
);