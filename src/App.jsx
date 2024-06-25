// src/App.jsx
import React, { useContext, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Start } from './pages/start';
import { Transition } from './pages/sao';
import { ZoomProvider, ZoomContext } from './components/ZoomContext';

function App() {
  const { zoomed, setZoomed } = useContext(ZoomContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (zoomed) {
      navigate('/transition');
    }
  }, [zoomed, navigate]);

  return (
    <Routes>
      <Route path="/" element={<Start setZoomed={setZoomed} />} />
      <Route path="/transition" element={<Transition />} />
    </Routes>
  );
}

const Root = () => (
  <ZoomProvider>
    <App />
  </ZoomProvider>
);

export default Root;