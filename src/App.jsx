import React, { useContext, useEffect, useState } from 'react';
import { Start } from './pages/start';
import { Transition } from './pages/transition';
import { Portfolio } from './pages/portfolio';
import { ZoomProvider, ZoomContext } from './components/StartComponents/ZoomContext';
import { TransitionProvider, TransitionContext } from './components/TransitionComponents/TransitionContext';

function App() {
  const { zoomed, setZoomed } = useContext(ZoomContext);
  const { transitioned, setTransitioned } = useContext(TransitionContext);
  const [currentPage, setCurrentPage] = useState('start');

  useEffect(() => {
    if (zoomed && !transitioned) {
      setCurrentPage('transition');
    }
  }, [zoomed]);

  useEffect(() => {
    if (transitioned && zoomed) {
      setCurrentPage('portfolio');
    }
  }, [transitioned]);

  const renderPage = () => {
    switch (currentPage) {
      case 'start':
        return <Portfolio />;
        console.log('Rendering Start');
        return <Start setZoomed={setZoomed} />;
      case 'transition':
        console.log('Rendering Transition');
        return <Transition setTransitioned={setTransitioned}/>;
      case 'portfolio':
        console.log('Rendering Portfolio');
        return <Portfolio />;
      default:
        return <Portfolio />;
        //return <Start setZoomed={setZoomed} />;
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