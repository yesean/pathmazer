import GridConstants from './GridConstants.js';
import * as Algorithms from './Algorithms';

const clearAnimate = (squareRefs) => {
  for (let i = 0; i < GridConstants.WIDTH * GridConstants.HEIGHT; i++) {
    const elm = squareRefs[i].current;
    if (
      elm.className === GridConstants.VISITED_SQUARE ||
      elm.className === GridConstants.PATH_SQUARE ||
      elm.className === GridConstants.VISITED_FINISHED_SQUARE ||
      elm.className === GridConstants.PATH_FINISHED_SQUARE
    ) {
      elm.className = GridConstants.DEFAULT_SQUARE;
    }
  }
};

const animate = (algorithm, squareRefs, shouldAnimate) => {
  let visitedDelay = 8;
  let pathDelay = 50;
  let visited, path;
  switch (algorithm) {
    case 'dijkstra':
      [visited, path] = Algorithms.dijkstra(squareRefs);
      break;
    case 'astar':
      [visited, path] = Algorithms.astar(squareRefs);
      break;
    default:
      return false;
  }

  clearAnimate(squareRefs);
  const start = squareRefs.findIndex(
    (ref) => ref.current.className === GridConstants.START_SQUARE
  );
  const end = squareRefs.findIndex(
    (ref) => ref.current.className === GridConstants.END_SQUARE
  );
  visited = visited.filter((square) => square !== start && square !== end);
  path = path.filter((square) => square !== start && square !== end);

  let visitedTick = 0;
  // animate visited
  let lastHead = undefined;
  for (const square of visited) {
    shouldAnimate
      ? setTimeout(() => {
          if (lastHead) {
            lastHead.className = GridConstants.VISITED_SQUARE;
          }
          squareRefs[square].current.className =
            GridConstants.VISITED_HEAD_SQUARE;
          lastHead = squareRefs[square].current;
        }, visitedTick++ * visitedDelay)
      : (squareRefs[square].current.className =
          GridConstants.VISITED_FINISHED_SQUARE);
  }
  setTimeout(() => {
    if (lastHead) {
      lastHead.className = GridConstants.VISITED_SQUARE;
    }
  }, visitedTick * visitedDelay);

  // animate path
  let pathTick = 0;
  for (const square of path) {
    shouldAnimate
      ? setTimeout(() => {
          squareRefs[square].current.className = GridConstants.PATH_SQUARE;
        }, visitedTick * visitedDelay + pathTick++ * pathDelay)
      : (squareRefs[square].current.className =
          GridConstants.PATH_FINISHED_SQUARE);
  }
  return true;
};

export default { animate };
