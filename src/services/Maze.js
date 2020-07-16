import GridConstants from './GridConstants';

const generateMaze = (squareRefs, resetGrid) => {
  resetGrid();
  squareRefs.forEach((ref, index) => {
    const elm = ref.current;
    if (
      index !== GridConstants.INITIAL_START &&
      index !== GridConstants.INITIAL_END &&
      Math.random() < 0.3
    ) {
      elm.className = GridConstants.WALL_SQUARE;
    }
  });
};

export default { generateMaze };
