import { clearAnimate } from './Animate';
const width = 80;
const height = 40;

const generateMaze = (grid) => {
  clearAnimate();
  clearMaze();
  grid.forEach((square, index) => {
    if (Math.random() < 0.25) {
      document.getElementById(index).className += ' wall';
    }
  });
};

const clearMaze = () => {
  for (let i = 0; i < width * height; i++) {
    let elm = document.getElementById(i);
    elm.className = elm.className.replace(' wall', '');
  }
};

export { generateMaze };
