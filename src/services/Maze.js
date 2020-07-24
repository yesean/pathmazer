import Grid from '../components/Grid';

const generateMaze = async (maze, grid, setGrid, resetGrid, speed) => {
  if (!maze) {
    return Promise.resolve({ finished: false, grid: grid });
  }
  grid = new Array(Grid.SIZE).fill(Grid.DEFAULT_SQ);
  setGrid(grid);
  console.log('performing maze', maze);
  let delay = 0;

  switch (maze) {
    case 'random':
      return await randomMaze(grid, setGrid, delay);
    case 'dfs':
      return await dfs(grid, setGrid, delay);
    case 'recursiveDivision':
      return await recursiveDivision(grid, setGrid, delay);
    case 'kruskal':
      return await kruskal(grid, setGrid, delay);
    case 'prim':
      return await prim(grid, setGrid, delay);
    default:
  }
};

const changeSquare = (grid, setGrid, square, squareType) => {
  const nextGrid = [...grid];
  nextGrid[square] = squareType;
  setGrid(nextGrid);
  return nextGrid;
};

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const drawRow = async (grid, setGrid, delay, row, colRange) => {
  for (let i = colRange[0]; i <= colRange[1]; i++) {
    const sq = row * Grid.WIDTH + i;
    grid = changeSquare(grid, setGrid, sq, Grid.WALL_SQ);
    await wait(delay);
  }
  return Promise.resolve(grid);
};

const drawCol = async (grid, setGrid, delay, col, rowRange) => {
  for (let i = rowRange[0]; i <= rowRange[1]; i++) {
    const sq = i * Grid.WIDTH + col;
    grid = changeSquare(grid, setGrid, sq, Grid.WALL_SQ);
    await wait(delay);
  }
  return Promise.resolve(grid);
};

const drawMazeBorder = async (grid, setGrid, delay) => {
  for (let i = 0; i < Grid.WIDTH; i++) {
    grid = changeSquare(grid, setGrid, Grid.getSq(0, i), Grid.WALL_SQ);
    grid = changeSquare(
      grid,
      setGrid,
      Grid.getSq(Grid.HEIGHT - 1, i),
      Grid.WALL_SQ
    );
    await wait(delay);
  }
  for (let i = 1; i < Grid.HEIGHT - 1; i++) {
    grid = changeSquare(grid, setGrid, Grid.getSq(i, 0), Grid.WALL_SQ);
    grid = changeSquare(
      grid,
      setGrid,
      Grid.getSq(i, Grid.WIDTH - 1),
      Grid.WALL_SQ
    );
    await wait(delay);
  }
  return Promise.resolve(grid);
};

const generateWallGrid = (grid, setGrid) => {
  for (let row = 0; row < Grid.HEIGHT; row++) {
    for (let col = 0; col < Grid.WIDTH; col++) {
      if (row % 2 && col % 2) {
        grid = changeSquare(
          grid,
          setGrid,
          Grid.getSq(row, col),
          Grid.DEFAULT_SQ
        );
      } else {
        grid = changeSquare(grid, setGrid, Grid.getSq(row, col), Grid.WALL_SQ);
      }
    }
  }
  return grid;
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
    if (sq === Grid.DEFAULT_SQ) {
      if (closest === -1) {
        return idx;
      } else {
        const closestDist = Grid.dist(from, closest);
        const sqDist = Grid.dist(from, idx);
        return sqDist < closestDist ? idx : closest;
      }
    } else {
      return closest;
    }
  }, -1);
};

const generateStartEndPosition = (grid, setGrid, idealStart, idealEnd) => {
  const start = getClosestEmptyTileFrom(grid, idealStart);
  const end = getClosestEmptyTileFrom(grid, idealEnd);
  grid = changeSquare(grid, setGrid, start, Grid.START_SQ);
  return changeSquare(grid, setGrid, end, Grid.END_SQ);
};

const randomMaze = async (grid, setGrid, delay) => {
  grid = await drawMazeBorder(grid, setGrid, delay);
  for (let i = 0; i < grid.length; i++) {
    if (Grid.validMazeMove(i, i) && Math.random() < 0.35) {
      // grid = changeSquare(grid, setGrid, i, Grid.WALL_SQ);
      grid[i] = Grid.WALL_SQ;
    }
  }
  setGrid(grid);
  await wait(delay);
  grid = generateStartEndPosition(
    grid,
    setGrid,
    Grid.getSq(0, 0),
    Grid.getSq(Grid.SIZE - 1, Grid.SIZE - 1)
  );
  return Promise.resolve({ finished: false, grid: grid });
};

const dfs = async (grid, setGrid, delay) => {
  grid = generateWallGrid(grid, setGrid, delay);
  const start = Grid.getSq(1, 1);
  const visited = new Set([start]);
  const path = [start];
  while (path.length > 0) {
    const currSquare = path.pop();
    let moves = [-2, 2, -2 * Grid.WIDTH, 2 * Grid.WIDTH];
    moves = moves.filter((move) =>
      Grid.validMazeMove(currSquare, currSquare + move)
    );

    while (moves.length > 0) {
      const nextMove =
        currSquare + moves.splice(Math.random() * moves.length, 1)[0];
      const nextMoves = [(currSquare + nextMove) / 2, nextMove];
      if (!visited.has(nextMove)) {
        grid = changeSquare(grid, setGrid, nextMoves[0], Grid.DEFAULT_SQ);
        await wait(delay);
        grid = changeSquare(grid, setGrid, nextMoves[1], Grid.DEFAULT_SQ);
        await wait(delay);
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
    Grid.getSq(1, 1),
    Grid.getSq(Grid.SIZE - 1, Grid.SIZE - 1)
  );
  return Promise.resolve({ finished: false, grid: grid });
};

const recursiveDivision = async (grid, setGrid, delay) => {
  grid = await drawMazeBorder(grid, setGrid, delay);
  grid = await divide(
    grid,
    setGrid,
    delay,
    [0, Grid.HEIGHT - 1],
    [0, Grid.WIDTH - 1]
  );
  grid = generateStartEndPosition(
    grid,
    setGrid,
    Grid.getSq(1, 1),
    Grid.getSq(Grid.HEIGHT - 1, Grid.WIDTH - 1)
  );
  return Promise.resolve({ finished: false, grid: grid });
};

const divide = async (grid, setGrid, delay, rowRange, colRange) => {
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
    return Promise.resolve(grid);
  } else {
    if (possibleRows.length >= possibleCols.length) {
      const randomRow = getRandomElement(possibleRows);
      grid = await drawRow(grid, setGrid, delay, randomRow, colRange);
      const randomColHole = getRandomElement(possibleColHoles);
      const randomHole = randomRow * Grid.WIDTH + randomColHole;
      grid = changeSquare(grid, setGrid, randomHole, Grid.DEFAULT_SQ);
      await wait(delay);
      grid = await divide(
        grid,
        setGrid,
        delay,
        [rowRange[0], randomRow],
        colRange
      );
      grid = await divide(
        grid,
        setGrid,
        delay,
        [randomRow, rowRange[1]],
        colRange
      );
    } else {
      let randomCol = getRandomElement(possibleCols);
      grid = await drawCol(grid, setGrid, delay, randomCol, rowRange);
      const randomRowHole = getRandomElement(possibleRowHoles);
      const randomHole = randomRowHole * Grid.WIDTH + randomCol;
      grid = await changeSquare(grid, setGrid, randomHole, Grid.DEFAULT_SQ);
      grid = await divide(grid, setGrid, delay, rowRange, [
        colRange[0],
        randomCol,
      ]);
      grid = await divide(grid, setGrid, delay, rowRange, [
        randomCol,
        colRange[1],
      ]);
    }
    return Promise.resolve(grid);
  }
};

const kruskal = async (grid, setGrid, delay) => {
  grid = generateWallGrid(grid, setGrid, delay);
  let treeSet = {};
  let wallMap = {};
  // fill wallMap and treeSet
  for (let i = 0; i < Grid.SIZE; i++) {
    const [iRow, iCol] = Grid.getCoor(i);
    if (Grid.validMazeMove(i, i)) {
      if (iRow % 2 && iCol % 2) {
        treeSet[i] = new Set([i]);
      } else {
        if (iCol % 2) {
          wallMap[i] = [i - Grid.WIDTH, i + Grid.WIDTH];
        } else if (iRow % 2) {
          wallMap[i] = [i - 1, i + 1];
        }
      }
    }
  }

  for (const [wall, [sq1, sq2]] of shuffleArray(Object.entries(wallMap))) {
    if (!treeSet[sq1].has(sq2)) {
      grid = changeSquare(grid, setGrid, wall, Grid.DEFAULT_SQ);
      await wait(delay);
      const union = new Set([...treeSet[sq1], ...treeSet[sq2]]);
      treeSet[sq1].forEach((sq) => (treeSet[sq] = union));
      treeSet[sq2].forEach((sq) => (treeSet[sq] = union));
    }
  }

  grid = generateStartEndPosition(
    grid,
    setGrid,
    Grid.getSq(1, 1),
    Grid.getSq(Grid.HEIGHT - 1, Grid.WIDTH - 1)
  );
  return Promise.resolve({ finished: false, grid: grid });
};

const prim = async (grid, setGrid, delay) => {
  grid = generateWallGrid(grid, setGrid, delay);
  let neighborSquares = {};
  let neighborWalls = {};
  // fill walls
  for (let i = 0; i < Grid.SIZE; i++) {
    if (Grid.validMazeMove(i, i)) {
      const [iRow, iCol] = Grid.getCoor(i);
      if (iRow % 2 && iCol % 2) {
        const t = Grid.validMazeMove(i, i - Grid.WIDTH) ? [i - Grid.WIDTH] : [];
        const r = Grid.validMazeMove(i, i + 1) ? [i + 1] : [];
        const b = Grid.validMazeMove(i, i + Grid.WIDTH) ? [i + Grid.WIDTH] : [];
        const l = Grid.validMazeMove(i, i - 1) ? [i - 1] : [];
        neighborWalls[i] = [...t, ...r, ...b, ...l];
      } else if (iRow % 2 ^ iCol % 2) {
        if (iCol % 2) {
          neighborSquares[i] = [i - Grid.WIDTH, i + Grid.WIDTH];
        } else if (iRow % 2) {
          neighborSquares[i] = [i - 1, i + 1];
        }
      }
    }
  }

  const visitedSquares = new Set([Grid.getSq(1, 1)]);
  let visitedWalls = [...neighborWalls[Grid.getSq(1, 1)]];
  while (visitedWalls.length > 0) {
    const randomWall = getRandomElement(visitedWalls);
    const [sq1, sq2] = neighborSquares[randomWall];
    if (sq1 > Grid.SIZE || sq2 > Grid.SIZE) {
    }
    if (visitedSquares.has(sq1) ^ visitedSquares.has(sq2)) {
      if (!visitedSquares.has(sq1)) {
        visitedSquares.add(sq1);
        visitedWalls = [...visitedWalls, ...neighborWalls[sq1]];
      } else {
        visitedSquares.add(sq2);
        visitedWalls = [...visitedWalls, ...neighborWalls[sq2]];
      }
      grid = changeSquare(grid, setGrid, randomWall, Grid.DEFAULT_SQ);
      await wait(delay);
    }
  }

  grid = generateStartEndPosition(
    grid,
    setGrid,
    Grid.getSq(1, 1),
    Grid.getSq(Grid.HEIGHT - 1, Grid.WIDTH - 1)
  );
  return Promise.resolve({ finished: false, grid: grid });
};

export default { generateMaze };
