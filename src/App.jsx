import React, { useContext, useEffect, useState } from 'react';
import { Start } from './pages/start';
import { Transition } from './pages/transition';
import { Portfolio } from './pages/portfolio';
import { ZoomProvider, ZoomContext } from './components/ZoomContext';
import { TransitionProvider, TransitionContext } from './components/TransitionContext';

function App() {
  const { zoomed, setZoomed } = useContext(ZoomContext);
  const { transitioned, setTransitioned } = useContext(TransitionContext);
  const [currentPage, setCurrentPage] = useState('start');

  useEffect(() => {
    if (zoomed) {
      setCurrentPage('transition');
    }
  }, [zoomed]);

  useEffect(() => {
    if (transitioned) {
      setCurrentPage('portfolio');
    }
  }, [transitioned]);

  const renderPage = () => {
    switch (currentPage) {
      case 'start':
        return <Start setZoomed={setZoomed} />;
      case 'transition':
        return <Transition setTransitioned={setTransitioned} />;
      case 'portfolio':
        return <Portfolio />;
      default:
        return <Start setZoomed={setZoomed} />;
    }
  };

  return (
    <div>
      {renderPage()}
    </div>
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