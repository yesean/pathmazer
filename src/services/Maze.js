import GridConstants from './../services/GridConstants.js';

const generateMaze = async (maze, grid, setGrid, resetGrid, speed) => {
  if (!maze) {
    return Promise.resolve({ finished: false, grid: grid });
  }
  grid = new Array(GridConstants.SIZE).fill(GridConstants.DEFAULT_SQ);
  setGrid(grid);

  let delay = 5;
  let promise;
  switch (maze) {
    case 'random':
      promise = await randomMaze(grid, setGrid, 0, delay);
      break;
    case 'dfs':
      promise = await dfs(grid, setGrid, 0, delay);
      break;
    case 'recursiveDivision':
      promise = await recursiveDivision(grid, setGrid, 0, delay);
      break;
    case 'kruskal':
      promise =  await kruskal(grid, setGrid, 0, delay);
      break;
    case 'prim':
      promise =  await prim(grid, setGrid, 0, delay);
      break;
    default:
  }
  setGrid(promise.grid);
  return promise;
};

const changeSquare = (grid, setGrid, square, squareType, delay) => {
  const nextGrid = [...grid];
  nextGrid[square] = squareType;
  if (delay) {
    setTimeout(() => {
      document.getElementById(square).className = squareType;
      // setGrid(nextGrid);
    }, delay);
  } else {
    setGrid(nextGrid);
  }
  return nextGrid;
};

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const drawRow = (grid, setGrid, tick, delay, row, colRange) => {
  for (let i = colRange[0]; i <= colRange[1]; i++, tick += delay) {
    const sq = row * GridConstants.WIDTH + i;
    grid = changeSquare(grid, setGrid, sq, GridConstants.WALL_SQ, tick);
  }
  return [tick, grid];
};

const drawCol = (grid, setGrid, tick, delay, col, rowRange) => {
  for (let i = rowRange[0]; i <= rowRange[1]; i++, tick += delay) {
    const sq = i * GridConstants.WIDTH + col;
    grid = changeSquare(grid, setGrid, sq, GridConstants.WALL_SQ, tick);
  }
  return [tick, grid];
};

const drawMazeBorder = (grid, setGrid, tick, delay) => {
  for (let i = 0; i < GridConstants.WIDTH; i++, tick += delay) {
    const topRow = GridConstants.getSq(0, i);
    const bottomRow = GridConstants.getSq(GridConstants.HEIGHT - 1, i);
    grid = changeSquare(grid, setGrid, topRow, GridConstants.WALL_SQ, tick);
    grid = changeSquare(grid, setGrid, bottomRow, GridConstants.WALL_SQ, tick);
  }
  for (let i = 0; i < GridConstants.HEIGHT; i++, tick += delay) {
    const leftCol = GridConstants.getSq(i, 0);
    const rightCol = GridConstants.getSq(i, GridConstants.WIDTH - 1);
    grid = changeSquare(grid, setGrid, leftCol, GridConstants.WALL_SQ, tick);
    grid = changeSquare(grid, setGrid, rightCol, GridConstants.WALL_SQ, tick);
  }
  return [tick, grid];
};

const generateWallGrid = (grid, setGrid, tick, delay) => {
  [tick, grid] = drawMazeBorder(grid, setGrid, tick, delay);
  for (let row = 1; row < GridConstants.HEIGHT - 1; row++) {
    for (let col = 1; col < GridConstants.WIDTH - 1; col++) {
      if (!(row % 2 && col % 2)) {
        grid[GridConstants.getSq(row, col)] = GridConstants.WALL_SQ;
      }
    }
  }
  setTimeout(() => {
    setGrid(grid);
  }, tick);
  return [tick, [...grid]];
};

const getRandomNumberBetween = (start, end) => {
  return Math.floor(Math.random() * (end - start + 1)) + start;
};

const getRandomElement = (array) => {
  return array.splice(getRandomNumberBetween(0, array.length - 1), 1)[0];
};

const shuffleArray = (array) => {
  const newArray = [];
  while (array.length > 0) {
    newArray.push(getRandomElement(array));
  }
  return newArray;
};

const getClosestEmptyTileFrom = (grid, from) => {
  return grid.reduce((closest, sq, idx) => {
    if (sq === GridConstants.DEFAULT_SQ) {
      if (closest === -1) {
        return idx;
      } else {
        const closestDist = GridConstants.dist(from, closest);
        const sqDist = GridConstants.dist(from, idx);
        return sqDist < closestDist ? idx : closest;
      }
    } else {
      return closest;
    }
  }, -1);
};

const generateStartEndPosition = (
  grid,
  setGrid,
  idealStart,
  idealEnd,
  delay
) => {
  const start = getClosestEmptyTileFrom(grid, idealStart);
  const end = getClosestEmptyTileFrom(grid, idealEnd);
  grid = changeSquare(grid, setGrid, start, GridConstants.START_SQ, delay);
  return changeSquare(grid, setGrid, end, GridConstants.END_SQ, delay);
};

const randomMaze = async (grid, setGrid, tick, delay) => {
  [tick, grid] = drawMazeBorder(grid, setGrid, tick, delay);
  for (let i = 0; i < grid.length; i++) {
    if (GridConstants.validMazeMove(i, i) && Math.random() < 0.35) {
      grid[i] = GridConstants.WALL_SQ;
    }
  }
  setTimeout(() => setGrid(grid), tick);

  grid = [...grid];
  grid = generateStartEndPosition(
    grid,
    setGrid,
    GridConstants.getSq(0, 0),
    GridConstants.getSq(GridConstants.SIZE - 1, GridConstants.SIZE - 1),
    (tick += delay)
  );
  await wait(tick);
  return Promise.resolve({ finished: false, grid: grid });
};

const dfs = async (grid, setGrid, tick, delay) => {
  [tick, grid] = generateWallGrid(grid, setGrid, tick, delay);
  const start = GridConstants.getSq(1, 1);
  const visited = new Set([start]);
  const path = [start];
  while (path.length > 0) {
    const currSquare = path.pop();
    let moves = [-2, 2, -2 * GridConstants.WIDTH, 2 * GridConstants.WIDTH];
    moves = moves.filter((move) =>
      GridConstants.validMazeMove(currSquare, currSquare + move)
    );

    while (moves.length > 0) {
      const nextMove =
        currSquare + moves.splice(Math.random() * moves.length, 1)[0];
      const nextMoves = [(currSquare + nextMove) / 2, nextMove];
      if (!visited.has(nextMove)) {
        grid = changeSquare(
          grid,
          setGrid,
          nextMoves[0],
          GridConstants.DEFAULT_SQ,
          (tick += delay)
        );
        grid = changeSquare(
          grid,
          setGrid,
          nextMoves[1],
          GridConstants.DEFAULT_SQ,
          (tick += delay)
        );
        visited.add(nextMove);
        path.push(nextMove);
        path.push(nextMove);
        break;
      }
    }
  }

  // place end as far away as possible from start
  grid = generateStartEndPosition(
    grid,
    setGrid,
    GridConstants.getSq(1, 1),
    GridConstants.getSq(GridConstants.SIZE - 1, GridConstants.SIZE - 1),
    (tick += delay)
  );
  await wait(tick);
  return Promise.resolve({ finished: false, grid: grid });
};

const recursiveDivision = async (grid, setGrid, tick, delay) => {
  [tick, grid] = drawMazeBorder(grid, setGrid, tick, delay);

  [tick, grid] = divide(
    grid,
    setGrid,
    tick,
    delay,
    [0, GridConstants.HEIGHT - 1],
    [0, GridConstants.WIDTH - 1]
  );

  grid = generateStartEndPosition(
    grid,
    setGrid,
    GridConstants.getSq(1, 1),
    GridConstants.getSq(GridConstants.HEIGHT - 1, GridConstants.WIDTH - 1),
    tick
  );
  await wait(tick);
  return Promise.resolve({ finished: false, grid: grid });
};

const divide = (grid, setGrid, tick, delay, rowRange, colRange) => {
  const [possibleRows, possibleRowHoles] = [[], []];
  const [possibleCols, possibleColHoles] = [[], []];
  for (let i = rowRange[0] + 1; i < rowRange[1]; i++) {
    if ((i - rowRange[0]) % 2 === 0) {
      possibleRows.push(i);
    } else {
      possibleRowHoles.push(i);
    }
  }
  for (let i = colRange[0] + 1; i < colRange[1]; i++) {
    if ((i - colRange[0]) % 2 === 0) {
      possibleCols.push(i);
    } else {
      possibleColHoles.push(i);
    }
  }

  if (possibleRows.length === 0 || possibleCols.length === 0) {
    return [tick, grid];
  } else {
    if (possibleRows.length >= possibleCols.length) {
      const randomRow = getRandomElement(possibleRows);
      [tick, grid] = drawRow(grid, setGrid, tick, delay, randomRow, colRange);
      const randomColHole = getRandomElement(possibleColHoles);
      const randomHole = randomRow * GridConstants.WIDTH + randomColHole;
      grid = changeSquare(
        grid,
        setGrid,
        randomHole,
        GridConstants.DEFAULT_SQ,
        (tick += delay)
      );
      [tick, grid] = divide(
        grid,
        setGrid,
        tick,
        delay,
        [rowRange[0], randomRow],
        colRange
      );
      [tick, grid] = divide(
        grid,
        setGrid,
        tick,
        delay,
        [randomRow, rowRange[1]],
        colRange
      );
    } else {
      let randomCol = getRandomElement(possibleCols);
      [tick, grid] = drawCol(grid, setGrid, tick, delay, randomCol, rowRange);
      const randomRowHole = getRandomElement(possibleRowHoles);
      const randomHole = randomRowHole * GridConstants.WIDTH + randomCol;
      grid = changeSquare(
        grid,
        setGrid,
        randomHole,
        GridConstants.DEFAULT_SQ,
        (tick += delay)
      );
      [tick, grid] = divide(grid, setGrid, tick, delay, rowRange, [
        colRange[0],
        randomCol,
      ]);
      [tick, grid] = divide(grid, setGrid, tick, delay, rowRange, [
        randomCol,
        colRange[1],
      ]);
    }
    return [tick, grid];
  }
};

const kruskal = async (grid, setGrid, tick, delay) => {
  [tick, grid] = generateWallGrid(grid, setGrid, tick, delay);
  let treeSet = {};
  let wallMap = {};

  // fill wallMap and treeSet
  for (let i = 0; i < GridConstants.SIZE; i++) {
    const [iRow, iCol] = GridConstants.getCoor(i);
    if (GridConstants.validMazeMove(i, i)) {
      if (iRow % 2 && iCol % 2) {
        treeSet[i] = new Set([i]);
      } else {
        if (iCol % 2) {
          wallMap[i] = [i - GridConstants.WIDTH, i + GridConstants.WIDTH];
        } else if (iRow % 2) {
          wallMap[i] = [i - 1, i + 1];
        }
      }
    }
  }

  for (const [wall, [sq1, sq2]] of shuffleArray(Object.entries(wallMap))) {
    if (!treeSet[sq1].has(sq2)) {
      grid = changeSquare(
        grid,
        setGrid,
        wall,
        GridConstants.DEFAULT_SQ,
        (tick += delay)
      );
      const union = new Set([...treeSet[sq1], ...treeSet[sq2]]);
      treeSet[sq1].forEach((sq) => (treeSet[sq] = union));
      treeSet[sq2].forEach((sq) => (treeSet[sq] = union));
    }
  }

  grid = generateStartEndPosition(
    grid,
    setGrid,
    GridConstants.getSq(1, 1),
    GridConstants.getSq(GridConstants.HEIGHT - 1, GridConstants.WIDTH - 1),
    tick
  );
  await wait(tick);
  return Promise.resolve({ finished: false, grid: grid });
};

const prim = async (grid, setGrid, tick, delay) => {
  [tick, grid] = generateWallGrid(grid, setGrid, tick, delay);
  let neighborSquares = {};
  let neighborWalls = {};

  // fill walls
  for (let i = 0; i < GridConstants.SIZE; i++) {
    if (GridConstants.validMazeMove(i, i)) {
      const [iRow, iCol] = GridConstants.getCoor(i);
      if (iRow % 2 && iCol % 2) {
        const t = GridConstants.validMazeMove(i, i - GridConstants.WIDTH)
          ? [i - GridConstants.WIDTH]
          : [];
        const r = GridConstants.validMazeMove(i, i + 1) ? [i + 1] : [];
        const b = GridConstants.validMazeMove(i, i + GridConstants.WIDTH)
          ? [i + GridConstants.WIDTH]
          : [];
        const l = GridConstants.validMazeMove(i, i - 1) ? [i - 1] : [];
        neighborWalls[i] = [...t, ...r, ...b, ...l];
      } else if (iRow % 2 ^ iCol % 2) {
        if (iCol % 2) {
          neighborSquares[i] = [
            i - GridConstants.WIDTH,
            i + GridConstants.WIDTH,
          ];
        } else if (iRow % 2) {
          neighborSquares[i] = [i - 1, i + 1];
        }
      }
    }
  }

  const visitedSquares = new Set([GridConstants.getSq(1, 1)]);
  let visitedWalls = [...neighborWalls[GridConstants.getSq(1, 1)]];
  while (visitedWalls.length > 0) {
    const randomWall = getRandomElement(visitedWalls);
    const [sq1, sq2] = neighborSquares[randomWall];
    if (sq1 > GridConstants.SIZE || sq2 > GridConstants.SIZE) {
    }
    if (visitedSquares.has(sq1) ^ visitedSquares.has(sq2)) {
      if (!visitedSquares.has(sq1)) {
        visitedSquares.add(sq1);
        visitedWalls = [...visitedWalls, ...neighborWalls[sq1]];
      } else {
        visitedSquares.add(sq2);
        visitedWalls = [...visitedWalls, ...neighborWalls[sq2]];
      }
      grid = changeSquare(
        grid,
        setGrid,
        randomWall,
        GridConstants.DEFAULT_SQ,
        (tick += delay)
      );
    }
  }

  grid = generateStartEndPosition(
    grid,
    setGrid,
    GridConstants.getSq(1, 1),
    GridConstants.getSq(GridConstants.HEIGHT - 1, GridConstants.WIDTH - 1),
    tick
  );
  await wait(tick);
  return Promise.resolve({ finished: false, grid: grid });
};

export default { generateMaze };
