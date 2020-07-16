// import Grid from './Grid.js';
import Grid from './../components/Grid';
import Algorithms from './Algorithms';

const clearAnimate = (squareRefs) => {
  for (let i = 0; i < Grid.WIDTH * Grid.HEIGHT; i++) {
    const elm = squareRefs[i].current;
    if (
      elm.className === Grid.VISITED_SQ ||
      elm.className === Grid.PATH_SQ ||
      elm.className === Grid.VISITED_FINISHED_SQ ||
      elm.className === Grid.PATH_FINISHED_SQ
    ) {
      elm.className = Grid.DEFAULT_SQ;
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
    (ref) => ref.current.className === Grid.START_SQ
  );
  const end = squareRefs.findIndex(
    (ref) => ref.current.className === Grid.END_SQ
  );
  visited = visited.filter((square) => square !== start && square !== end);
  path = path.filter((square) => square !== start && square !== end);

  let visitedTick = 0;
  // animate visited
  let lastHead = undefined;
  for (const square of visited) {
    shouldAnimate
      ? (lastHead = ((prev, sq, delay) => {
          setTimeout(() => {
            if (prev) {
              prev.className = Grid.VISITED_SQ;
            }
            squareRefs[sq].current.className = Grid.VISITED_HEAD_SQ;
          }, delay);
          return squareRefs[sq].current;
        })(lastHead, square, visitedTick++ * visitedDelay))
      : (squareRefs[square].current.className = Grid.VISITED_FINISHED_SQ);
  }
  setTimeout(() => {
    if (lastHead) {
      lastHead.className = Grid.VISITED_SQ;
    }
  }, visitedTick * visitedDelay);

  // animate path
  let pathTick = 0;
  for (const square of path) {
    shouldAnimate
      ? setTimeout(() => {
          squareRefs[square].current.className = Grid.PATH_SQ;
        }, visitedTick * visitedDelay + pathTick++ * pathDelay)
      : (squareRefs[square].current.className = Grid.PATH_FINISHED_SQ);
  }
  return true;
};

export default { animate };
