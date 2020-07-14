const setKeyListener = (targetKey, setKeyPressed) => {
  const downListener = ({ key }) => {
    if (key === targetKey) {
      console.log('listening down');
      setKeyPressed(true);
    }
  };

  const upListener = ({ key }) => {
    if (key === targetKey) {
      console.log('listening up');
      setKeyPressed(false);
    }
  };
  window.addEventListener('keydown', downListener);
  window.addEventListener('keyup', upListener);
};

const removeKeyListener = (targetKey, setKeyPressed) => {
  const downListener = ({ key }) => {
    if (key === targetKey) {
      setKeyPressed(true);
    }
  };

  const upListener = ({ key }) => {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };
  window.removeEventListener('keydown', downListener);
  window.removeEventListener('keyup', upListener);
};

export { setKeyListener, removeKeyListener };
