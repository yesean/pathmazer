import Grid from './../components/Grid';
import Algorithms from './Algorithms';

const clearAnimate = (grid, setGrid) => {
  const nextGrid = grid.map((sq) => {
    if (sq === Grid.START_SQ || sq === Grid.END_SQ || sq === Grid.WALL_SQ) {
      return sq;
    } else if (
      sq === Grid.WEIGHT_SQ ||
      sq === Grid.VISITED_WEIGHT_SQ ||
      sq === Grid.VISITED_FINISHED_WEIGHT_SQ ||
      sq === Grid.PATH_WEIGHT_SQ ||
      sq === Grid.PATH_FINISHED_WEIGHT_SQ
    ) {
      return Grid.WEIGHT_SQ;
    } else {
      return Grid.DEFAULT_SQ;
    }
  });
  setGrid(nextGrid);
  return nextGrid;
};

const animate = async (algorithm, grid, setGrid, speed, shouldDelay) => {
  if (!algorithm || !speed) {
    return Promise.resolve({ isAnimating: false, isAnimatingFinished: false });
  }

  let pathDelay = 50;
  let visitedDelay;
  if (shouldDelay) {
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
        visitedDelay = 15;
        break;
      default:
    }
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

  const start = grid.findIndex((sq) => sq === Grid.START_SQ);
  const end = grid.findIndex((sq) => sq === Grid.END_SQ);
  visited = visited.filter((square) => square !== start && square !== end);
  path = path.filter((square) => square !== start && square !== end);

  // animate visited
  let tick = 0;
  let prevSquare = null;
  for (const square of visited) {
    if (shouldDelay) {
      if (prevSquare) {
        grid = changeSquare(
          grid,
          setGrid,
          prevSquare.ind,
          prevSquare.squareType,
          (tick += visitedDelay)
        );
      }
      const squareType =
        grid[square] === Grid.WEIGHT_SQ
          ? Grid.VISITED_WEIGHT_SQ
          : Grid.VISITED_SQ;
      grid = changeSquare(grid, setGrid, square, Grid.VISITED_HEAD_SQ, tick);
      prevSquare = { ind: square, squareType: squareType };
    } else {
      const squareType =
        grid[square] === Grid.WEIGHT_SQ
          ? Grid.VISITED_FINISHED_WEIGHT_SQ
          : Grid.VISITED_FINISHED_SQ;
      grid = changeSquare(grid, setGrid, square, squareType);
    }
  }
  if (shouldDelay && prevSquare) {
    grid = changeSquare(
      grid,
      setGrid,
      prevSquare.ind,
      prevSquare.squareType,
      tick
    );
  }

  // animate path
  prevSquare = null;
  for (const square of path) {
    if (shouldDelay) {
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
        grid[square] === Grid.VISITED_WEIGHT_SQ
          ? Grid.PATH_WEIGHT_SQ
          : Grid.PATH_SQ;
      grid = changeSquare(grid, setGrid, square, Grid.PATH_HEAD_SQ, tick);
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
        grid[square] === Grid.VISITED_FINISHED_WEIGHT_SQ
          ? Grid.PATH_FINISHED_WEIGHT_SQ
          : Grid.PATH_FINISHED_SQ;
      grid = changeSquare(grid, setGrid, square, Grid.PATH_HEAD_SQ);
      prevSquare = { ind: square, squareType: squareType };
    }
  }
  await wait(tick);
  return Promise.resolve({ isAnimating: false, isAnimatingFinished: true });
};

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const changeSquare = (grid, setGrid, square, squareType, delay) => {
  const nextGrid = [...grid];
  nextGrid[square] = squareType;
  if (delay) {
    setTimeout(() => {
      setGrid(nextGrid);
    }, delay);
  } else {
    setGrid(nextGrid);
  }
  return nextGrid;
};

export default { animate };
