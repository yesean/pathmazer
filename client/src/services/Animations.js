import GridConstants from './../services/GridConstants.js';
import Algorithms from './Algorithms';

const clearAnimate = (grid) => {
  grid.forEach((sq) => {
    const type = sq.ref.current.className;
    let nextType;
    if (
      type === GridConstants.START_SQ ||
      type === GridConstants.END_SQ ||
      type === GridConstants.WALL_SQ
    ) {
      nextType = type;
    } else if (
      type === GridConstants.WEIGHT_SQ ||
      type === GridConstants.VISITED_WEIGHT_SQ ||
      type === GridConstants.VISITED_FINISHED_WEIGHT_SQ ||
      type === GridConstants.PATH_WEIGHT_SQ ||
      type === GridConstants.PATH_FINISHED_WEIGHT_SQ
    ) {
      nextType = GridConstants.WEIGHT_SQ;
    } else {
      nextType = GridConstants.DEFAULT_SQ;
    }
    sq.ref.current.className = nextType;
  });
};

const animate = async (algorithm, grid, speed) => {
  if (!algorithm || !speed) {
    return { isAnimating: false, isAnimatingFinished: false };
  }

  let pathDelay = 30;
  let visitedDelay;
  switch (speed) {
    case 'none':
      break;
    case 'slow':
      visitedDelay = 50;
      break;
    case 'medium':
      visitedDelay = 30;
      break;
    case 'fast':
      visitedDelay = 10;
      break;
    default:
  }

  clearAnimate(grid);
  grid.forEach((sq) => {
    sq.algoType = sq.ref.current.className;
  });

  let visited, path;
  const gridForAlgo = grid.map((sq) => sq.ref.current.className);
  switch (algorithm) {
    case 'dijkstra':
      [visited, path] = Algorithms.dijkstra(gridForAlgo);
      break;
    case 'astar':
      [visited, path] = Algorithms.astar(gridForAlgo);
      break;
    case 'greedy':
      [visited, path] = Algorithms.greedy(gridForAlgo);
      break;
    case 'dfs':
      [visited, path] = Algorithms.dfs(gridForAlgo);
      break;
    case 'bfs':
      [visited, path] = Algorithms.bfs(gridForAlgo);
      break;
    default:
  }

  const start = grid.findIndex(
    (sq) => sq.ref.current.className === GridConstants.START_SQ
  );
  const end = grid.findIndex(
    (sq) => sq.ref.current.className === GridConstants.END_SQ
  );
  visited = visited.filter((square) => square !== start && square !== end);
  path = path.filter((square) => square !== start && square !== end);

  // animate visited
  let tick = 0;
  let prevSquare = null;
  for (const square of visited) {
    if (speed !== 'none') {
      if (prevSquare) {
        changeSquare(
          grid,
          prevSquare.sq,
          prevSquare.squareType,
          (tick += visitedDelay)
        );
      }
      const squareType =
        grid[square].algoType === GridConstants.WEIGHT_SQ
          ? GridConstants.VISITED_WEIGHT_SQ
          : GridConstants.VISITED_SQ;
      changeSquare(grid, square, GridConstants.VISITED_HEAD_SQ, tick);
      prevSquare = { sq: square, squareType: squareType };
    } else {
      const squareType =
        grid[square].algoType === GridConstants.WEIGHT_SQ
          ? GridConstants.VISITED_FINISHED_WEIGHT_SQ
          : GridConstants.VISITED_FINISHED_SQ;
      changeSquare(grid, square, squareType);
    }
  }
  if (prevSquare) {
    changeSquare(
      grid,
      prevSquare.sq,
      prevSquare.squareType,
      (tick += visitedDelay)
    );
  }

  // animate path
  prevSquare = null;
  for (const square of path) {
    if (speed !== 'none') {
      if (prevSquare) {
        changeSquare(
          grid,
          prevSquare.sq,
          prevSquare.squareType,
          (tick += pathDelay)
        );
      }
      const squareType =
        grid[square].algoType === GridConstants.VISITED_WEIGHT_SQ
          ? GridConstants.PATH_WEIGHT_SQ
          : GridConstants.PATH_SQ;
      changeSquare(grid, square, GridConstants.PATH_HEAD_SQ, tick);
      prevSquare = { sq: square, squareType: squareType };
    } else {
      if (prevSquare) {
        changeSquare(grid, prevSquare.sq, prevSquare.squareType);
      }
      const squareType =
        grid[square].algoType === GridConstants.VISITED_FINISHED_WEIGHT_SQ
          ? GridConstants.PATH_FINISHED_WEIGHT_SQ
          : GridConstants.PATH_FINISHED_SQ;
      changeSquare(grid, square, GridConstants.PATH_HEAD_SQ);
      prevSquare = { sq: square, squareType: squareType };
    }
  }
  if (prevSquare) {
    changeSquare(
      grid,
      prevSquare.sq,
      prevSquare.squareType,
      (tick += visitedDelay)
    );
  }

  // hold during animation
  if (speed !== 'none') {
    await wait(tick);
  }
  return Promise.resolve({ isAnimating: false, isAnimatingFinished: true });
};

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const changeSquare = (grid, id, nextType, delay) => {
  if (delay) {
    setTimeout(() => {
      grid[id].ref.current.className = nextType;
    }, delay);
  } else {
    grid[id].ref.current.className = nextType;
  }
  grid[id].algoType = nextType;
};

export default { animate };
