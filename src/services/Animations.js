import GridConstants from './../services/GridConstants.js';
import Algorithms from './Algorithms';

const clearAnimate = (grid, setGrid) => {
  const nextGrid = grid.map((sq) => {
    if (
      sq === GridConstants.START_SQ ||
      sq === GridConstants.END_SQ ||
      sq === GridConstants.WALL_SQ
    ) {
      return sq;
    } else if (
      sq === GridConstants.WEIGHT_SQ ||
      sq === GridConstants.VISITED_WEIGHT_SQ ||
      sq === GridConstants.VISITED_FINISHED_WEIGHT_SQ ||
      sq === GridConstants.PATH_WEIGHT_SQ ||
      sq === GridConstants.PATH_FINISHED_WEIGHT_SQ
    ) {
      return GridConstants.WEIGHT_SQ;
    } else {
      return GridConstants.DEFAULT_SQ;
    }
  });
  setGrid(nextGrid);
  return nextGrid;
};

const animate = async (algorithm, grid, setGrid, speed) => {
  if (!algorithm || !speed) {
    return Promise.resolve({ isAnimating: false, isAnimatingFinished: false });
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

  grid = clearAnimate(grid, setGrid);
  let visited, path;
  switch (algorithm) {
    case 'dijkstra':
      [visited, path] = Algorithms.dijkstra(grid);
      break;
    case 'astar':
      [visited, path] = Algorithms.astar(grid);
      break;
    case 'greedy':
      [visited, path] = Algorithms.greedy(grid);
      break;
    case 'dfs':
      [visited, path] = Algorithms.dfs(grid);
      break;
    case 'bfs':
      [visited, path] = Algorithms.bfs(grid);
      break;
    default:
  }

  const start = grid.findIndex((sq) => sq === GridConstants.START_SQ);
  const end = grid.findIndex((sq) => sq === GridConstants.END_SQ);
  visited = visited.filter((square) => square !== start && square !== end);
  path = path.filter((square) => square !== start && square !== end);

  // animate visited
  let tick = 0;
  let prevSquare = null;
  for (const square of visited) {
    if (speed !== 'none') {
      if (prevSquare) {
        grid = changeSquare(
          grid,
          setGrid,
          prevSquare.sq,
          prevSquare.squareType,
          (tick += visitedDelay)
        );
      }
      const squareType =
        grid[square] === GridConstants.WEIGHT_SQ
          ? GridConstants.VISITED_WEIGHT_SQ
          : GridConstants.VISITED_SQ;
      grid = changeSquare(
        grid,
        setGrid,
        square,
        GridConstants.VISITED_HEAD_SQ,
        tick
      );
      prevSquare = { sq: square, squareType: squareType };
    } else {
      const squareType =
        grid[square] === GridConstants.WEIGHT_SQ
          ? GridConstants.VISITED_FINISHED_WEIGHT_SQ
          : GridConstants.VISITED_FINISHED_SQ;
      grid = changeSquare(grid, setGrid, square, squareType);
    }
  }
  if (prevSquare) {
    grid = changeSquare(
      grid,
      setGrid,
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
        grid = changeSquare(
          grid,
          setGrid,
          prevSquare.ind,
          prevSquare.squareType,
          (tick += pathDelay)
        );
      }
      const squareType =
        grid[square] === GridConstants.VISITED_WEIGHT_SQ
          ? GridConstants.PATH_WEIGHT_SQ
          : GridConstants.PATH_SQ;
      grid = changeSquare(
        grid,
        setGrid,
        square,
        GridConstants.PATH_HEAD_SQ,
        tick
      );
      prevSquare = { ind: square, squareType: squareType };
    } else {
      if (prevSquare) {
        grid = changeSquare(
          grid,
          setGrid,
          prevSquare.ind,
          prevSquare.squareType
        );
      }
      const squareType =
        grid[square] === GridConstants.VISITED_FINISHED_WEIGHT_SQ
          ? GridConstants.PATH_FINISHED_WEIGHT_SQ
          : GridConstants.PATH_FINISHED_SQ;
      grid = changeSquare(grid, setGrid, square, GridConstants.PATH_HEAD_SQ);
      prevSquare = { ind: square, squareType: squareType };
    }
  }
  if (speed !== 'none') {
    await wait(tick);
  }
  setGrid(grid);
  return Promise.resolve({ isAnimating: false, isAnimatingFinished: true });
};

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const changeSquare = (
  grid,
  setGrid,
  square,
  squareType,
  delay,
) => {
  const nextGrid = [...grid];
  nextGrid[square] = squareType;
  if (delay) {
    setTimeout(() => {
      document.getElementById(square).className = squareType;
    }, delay);
  }
  return nextGrid;
};

export default { animate };
