import Grid from './../components/Grid';
import Algorithms from './Algorithms';

const clearAnimate = (squareRefs) => {
  for (let i = 0; i < Grid.WIDTH * Grid.HEIGHT; i++) {
    const elm = squareRefs[i].current;
    if (
      elm.className === Grid.VISITED_SQ ||
      elm.className === Grid.VISITED_FINISHED_SQ ||
      elm.className === Grid.PATH_SQ ||
      elm.className === Grid.PATH_FINISHED_SQ
    ) {
      elm.className = Grid.DEFAULT_SQ;
    } else if (
      elm.className === Grid.WEIGHT_SQ ||
      elm.className === Grid.VISITED_WEIGHT_SQ ||
      elm.className === Grid.VISITED_FINISHED_WEIGHT_SQ ||
      elm.className === Grid.PATH_WEIGHT_SQ ||
      elm.className === Grid.PATH_FINISHED_WEIGHT_SQ
    ) {
      elm.className = Grid.WEIGHT_SQ;
    }
  }
};

const animate = async (algorithm, squareRefs, speed, shouldAnimate) => {
  let pathDelay = 50;
  let visitedDelay;
  if (shouldAnimate) {
    switch (speed) {
      case 'slow':
        visitedDelay = 100;
        break;
      case 'medium':
        visitedDelay = 50;
        break;
      case 'fast':
        visitedDelay = 5;
        break;
      default:
        return Promise.resolve(false);
    }
  }
  let visited, path;
  switch (algorithm) {
    case 'dijkstra':
      clearAnimate(squareRefs);
      [visited, path] = Algorithms.dijkstra(squareRefs);
      break;
    case 'astar':
      clearAnimate(squareRefs);
      [visited, path] = Algorithms.astar(squareRefs);
      break;
    case 'greedy':
      clearAnimate(squareRefs);
      [visited, path] = Algorithms.greedy(squareRefs);
      break;
    case 'dfs':
      clearAnimate(squareRefs);
      [visited, path] = Algorithms.dfs(squareRefs);
      break;
    case 'bfs':
      clearAnimate(squareRefs);
      [visited, path] = Algorithms.bfs(squareRefs);
      break;
    default:
      return Promise.resolve(false);
  }

  const start = squareRefs.findIndex(
    (ref) => ref.current.className === Grid.START_SQ
  );
  const end = squareRefs.findIndex(
    (ref) => ref.current.className === Grid.END_SQ
  );
  visited = visited.filter((square) => square !== start && square !== end);
  path = path.filter((square) => square !== start && square !== end);

  // animate visited
  let prevSquare = undefined;
  for (const square of visited) {
    const elm = squareRefs[square].current;
    if (shouldAnimate) {
      if (prevSquare) {
        changeSquare(squareRefs, prevSquare.ind, prevSquare.squareType);
      }
      const squareType =
        elm.className === Grid.WEIGHT_SQ
          ? Grid.VISITED_WEIGHT_SQ
          : Grid.VISITED_SQ;
      changeSquare(squareRefs, square, Grid.VISITED_HEAD_SQ);
      prevSquare = { ind: square, squareType: squareType };
      await wait(visitedDelay);
    } else {
      const squareType =
        elm.className === Grid.WEIGHT_SQ
          ? Grid.VISITED_FINISHED_WEIGHT_SQ
          : Grid.VISITED_FINISHED_SQ;
      changeSquare(squareRefs, square, squareType);
    }
  }
  if (shouldAnimate) {
    changeSquare(squareRefs, prevSquare.ind, prevSquare.squareType);
  }

  // animate path
  for (const square of path) {
    const elm = squareRefs[square].current;
    if (shouldAnimate) {
      const squareType =
        elm.className === Grid.WEIGHT_SQ ? Grid.PATH_WEIGHT_SQ : Grid.PATH_SQ;
      changeSquare(squareRefs, square, squareType);
      await wait(pathDelay);
    } else {
      const squareType =
        elm.className === Grid.VISITED_FINISHED_WEIGHT_SQ
          ? Grid.PATH_FINISHED_WEIGHT_SQ
          : Grid.PATH_FINISHED_SQ;
      changeSquare(squareRefs, square, squareType);
    }
  }
  return Promise.resolve(true);
};

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const changeSquare = (squareRefs, square, squareType) => {
  squareRefs[square].current.className = squareType;
};

export default { animate };
