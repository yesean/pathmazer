const setMouseListener = (setMousePressed) => {
  const downListener = () => {
    console.log('mouse pressed');
    setMousePressed(true);
  };

  const upListener = () => {
    console.log('mouse unpressed');
    setMousePressed(false);
  };
  window.addEventListener('mousedown', downListener);
  window.addEventListener('mouseup', upListener);
};

const removeMouseListener = (targetKey, setMousePressed) => {
  const downListener = () => {
    setMousePressed(true);
  };

  const upListener = () => {
    setMousePressed(false);
  };
  window.removeEventListener('mousedown', downListener);
  window.removeEventListener('mouseup', upListener);
};

export { setMouseListener, removeMouseListener };
