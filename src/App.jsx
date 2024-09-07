import React, { useContext, useEffect, useState } from 'react';
import { Start } from './pages/start';
import { Transition } from './pages/transition';
import { Portfolio } from './pages/portfolio';
import { Game } from './pages/game';
import { ZoomProvider, ZoomContext } from './components/StartComponents/ZoomContext';
import { TransitionProvider, TransitionContext } from './components/TransitionComponents/TransitionContext';
import { VRProvider, VRContext } from './components/VRComponents/VRContext';
import { AboutMe } from './pages/aboutMe';

function App() {
  const { zoomed, setZoomed } = useContext(ZoomContext);
  const { transitioned, setTransitioned } = useContext(TransitionContext);
  const { game, setGame, about, setAbout } = useContext(VRContext);
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

  useEffect(() => {
    if (game) {
      setCurrentPage('game');
    }
  }, [game]);

  useEffect(() => {
    if (about) {
      setCurrentPage('aboutMe');
    }
  }, [about]);

  const renderPage = () => {
    switch (currentPage) {
      case 'start':
        //return <Portfolio setGame={setGame} setAbout={setAbout}/>;
        console.log('Rendering Start');
        return <Start setZoomed={setZoomed} />;
      case 'transition':
        console.log('Rendering Transition');
        return <Transition setTransitioned={setTransitioned} />;
      case 'portfolio':
        console.log('Rendering Portfolio');
        return <Portfolio setGame={setGame} setAbout={setAbout}/>;
      case 'game':
        console.log("Rendering VR Game");
        return <Game />;
      case 'aboutMe':
        console.log("Rendering About Me Page");
        return <AboutMe />
      default:
        //return <Portfolio setGame={setGame} setAbout={setAbout} />;
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
      <VRProvider>
        <App />
      </VRProvider>
    </TransitionProvider>
  </ZoomProvider>
);

export default Root;