import { useState, useEffect } from 'react';

const getWindowDimensions = () => {
  return {
    WIDTH: window.innerWidth,
    HEIGHT: window.innerHeight,
  };
};

const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    const updateDimensions = () => {
      setWindowDimensions(getWindowDimensions());
    };
    window.addEventListener('resize', updateDimensions);
    return () => [window.removeEventListener('resize', updateDimensions)];
  }, []);
  return windowDimensions;
};

export default useWindowDimensions;
