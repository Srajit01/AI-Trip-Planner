import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CreateTrip from './create-trip/index.jsx';
import Header from './components/custom/Header';
import { Toaster } from './components/ui/sonner';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Viewtrip from './view-trip/index.jsx';
import MyTrips from './components/custom/MyTrips';


const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Header />
         <App />
      </>
    ),
  },
  {
    path: '/create-trip',
    element: <CreateTrip />,
  },
  {
    path:'/view-trip/:tripId',
    element:<Viewtrip/>
  },
  {
    path:'/my-trips',
    element: <MyTrips/>
  }
]);

// Use createRoot from 'react-dom/client'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
         <Toaster />
         <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </React.StrictMode>,
);