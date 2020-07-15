import GridConstants from './../GridConstants';

const generateMaze = (grid) => {
  grid.forEach((square, index) => {
    const elm = document.getElementById(index);
    if (index === GridConstants.INITIAL_START) {
      elm.className = GridConstants.START_SQUARE;
    } else if (index === GridConstants.INITIAL_END) {
      elm.className = GridConstants.END_SQUARE;
    } else if (Math.random() < 0.25) {
      elm.className = GridConstants.WALL_SQUARE;
    } else {
      elm.className = GridConstants.DEFAULT_SQUARE;
    }
  });
};

export default { generateMaze };
