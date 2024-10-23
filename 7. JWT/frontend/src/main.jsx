import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from "react-router-dom";
import { routes } from './router/route';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css';

// Ensures credentials like cookies are sent with axios requests
axios.defaults.withCredentials = true;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_OAUTH_CLIENT_ID}>
        <Toaster />
        <RouterProvider router={routes} />
      </GoogleOAuthProvider>
    </Provider>
  </StrictMode>,
);