// src/App.jsx
import React, { useContext, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Start } from './pages/start';
import { Transition } from './pages/sao';
import { Portfolio } from './pages/portfolio';
import { ZoomProvider, ZoomContext } from './components/ZoomContext';
import { TransitionProvider, TransitionContext } from './components/TransitionContext';

function App() {
  const { zoomed, setZoomed } = useContext(ZoomContext);
  const {transitioned, setTransitioned} = useContext(TransitionContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (zoomed) {
      navigate('/transition');
    }
  }, [zoomed, navigate]);

  useEffect(() => {
    if (transitioned) {
      navigate('/portfolio');
    }
  }, [transitioned, navigate]);

  return (
    <Routes>
      <Route path="/" element={<Start setZoomed={setZoomed} />} />
      <Route path="/transition" element={<Transition setTransitioned={setTransitioned} />} />
      <Route path="/portfolio" element={<Portfolio />} />
    </Routes>
  );
}

const Root = () => (
  <ZoomProvider>
      <TransitionProvider>
    <App />
    </TransitionProvider>
  </ZoomProvider>
);

export default Root;