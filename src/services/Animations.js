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

const animate = (algorithm, squareRefs, shouldAnimate) => {
  let visitedDelay = 5;
  let pathDelay = 50;
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
    default:
      return false;
  }

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
  let prevSquare = undefined;
  for (const square of visited) {
    const elm = squareRefs[square].current;
    if (shouldAnimate) {
      if (prevSquare) {
        changeSquare(
          squareRefs,
          prevSquare.ind,
          prevSquare.squareType,
          visitedTick++ * visitedDelay
        );
      }
      changeSquare(
        squareRefs,
        square,
        Grid.VISITED_HEAD_SQ,
        visitedTick++ * visitedDelay
      );
      const squareType =
        elm.className === Grid.WEIGHT_SQ
          ? Grid.VISITED_WEIGHT_SQ
          : Grid.VISITED_SQ;
      prevSquare = { ind: square, squareType: squareType };
    } else {
      const squareType =
        elm.className === Grid.WEIGHT_SQ
          ? Grid.VISITED_FINISHED_WEIGHT_SQ
          : Grid.VISITED_FINISHED_SQ;
      changeSquare(squareRefs, square, squareType, 0);
    }
  }
  if (shouldAnimate) {
    changeSquare(
      squareRefs,
      prevSquare.ind,
      prevSquare.squareType,
      visitedTick++ * visitedDelay
    );
  }

  // animate path
  let pathTick = 0;
  for (const square of path) {
    const elm = squareRefs[square].current;
    if (shouldAnimate) {
      const squareType =
        elm.className === Grid.WEIGHT_SQ ? Grid.PATH_WEIGHT_SQ : Grid.PATH_SQ;
      changeSquare(
        squareRefs,
        square,
        squareType,
        visitedTick * visitedDelay + pathTick++ * pathDelay
      );
    } else {
      const squareType =
        elm.className === Grid.VISITED_FINISHED_WEIGHT_SQ
          ? Grid.PATH_FINISHED_WEIGHT_SQ
          : Grid.PATH_FINISHED_SQ;
      changeSquare(squareRefs, square, squareType, 0);
    }
  }
  return true;
};

const changeSquare = (squareRefs, square, squareType, delay) => {
  if (delay) {
    setTimeout(
      () => (squareRefs[square].current.className = squareType),
      delay
    );
  } else {
    squareRefs[square].current.className = squareType;
  }
};

export default { animate };
