import Grid from '../components/Grid';

const generateMaze = (maze, squareRefs, resetGrid) => {
  resetGrid(false);
  resetStartEndPosition(squareRefs);
  console.log('performing maze', maze);
  let delay = 10;
  switch (maze) {
    case 'random':
      randomMaze(squareRefs, delay);
      break;
    case 'dfs':
      dfs(squareRefs, delay);
      break;
    case 'recursiveDivision':
      recursiveDivision(squareRefs, delay);
      break;
    case 'kruskal':
      kruskal(squareRefs, delay);
      break;
    default:
  }
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

const drawRow = (squareRefs, tick, delay, row, colRange) => {
  for (let i = colRange[0]; i <= colRange[1]; i++) {
    changeSquare(
      squareRefs,
      row * Grid.WIDTH + i,
      Grid.WALL_SQ,
      tick++ * delay
    );
  }
  return tick;
};

const drawCol = (squareRefs, tick, delay, col, rowRange) => {
  for (let i = rowRange[0]; i <= rowRange[1]; i++) {
    changeSquare(
      squareRefs,
      i * Grid.WIDTH + col,
      Grid.WALL_SQ,
      tick++ * delay
    );
  }
  return tick;
};

const drawMazeBorder = (squareRefs, tick, delay) => {
  drawRow(squareRefs, tick, delay, 0, [0, Grid.WIDTH - 1]);
  tick = drawRow(squareRefs, tick, delay, Grid.HEIGHT - 1, [0, Grid.WIDTH - 1]);
  drawCol(squareRefs, tick, delay, 0, [0, Grid.HEIGHT - 1]);
  tick = drawCol(squareRefs, tick, delay, Grid.WIDTH - 1, [0, Grid.HEIGHT - 1]);
  return tick;
};

const generateWallGrid = (squareRefs, tick, delay) => {
  let endTick = 0;
  for (let i = 0; i < Grid.WIDTH; i += 2) {
    drawCol(squareRefs, tick, delay, i, [0, Grid.HEIGHT - 1]);
  }
  for (let i = 0; i < Grid.HEIGHT; i += 2) {
    endTick = drawRow(squareRefs, tick, delay, i, [0, Grid.WIDTH - 1]);
  }
  return endTick;
};

const getRandomNumberBetween = (start, end) => {
  return Math.floor(Math.random() * (end - start + 1)) + start;
};

const getRandomElement = (array) => {
  return array[getRandomNumberBetween(0, array.length - 1)];
};

const getClosestEmptyTileFrom = (squareRefs, from) => {
  return squareRefs.reduce((closest, ref, sq) => {
    if (ref.current.className === Grid.DEFAULT_SQ) {
      if (closest === -1) {
        return sq;
      } else {
        const closestDist = Grid.dist(from, closest);
        const refDist = Grid.dist(from, sq);
        return refDist < closestDist ? sq : closest;
      }
    } else {
      return closest;
    }
  }, -1);
};

const getFarthestEmptyTileFrom = (from, squareRefs) => {
  return squareRefs.reduce((closest, ref, sq) => {
    if (ref.current.className === Grid.DEFAULT_SQ) {
      if (closest === -1) {
        return sq;
      } else {
        const closestDist = Grid.dist(from, closest);
        const refDist = Grid.dist(from, sq);
        return refDist > closestDist ? sq : closest;
      }
    } else {
      return closest;
    }
  }, -1);
};

const resetStartEndPosition = (squareRefs) => {
  changeSquare(squareRefs, Grid.INITIAL_START, Grid.DEFAULT_SQ, 0);
  changeSquare(squareRefs, Grid.INITIAL_END, Grid.DEFAULT_SQ, 0);
};

const generateStartEndPosition = (
  squareRefs,
  idealStart,
  idealEnd,
  tick,
  delay
) => {
  setTimeout(() => {
    const start = getClosestEmptyTileFrom(squareRefs, idealStart);
    const end = getClosestEmptyTileFrom(squareRefs, idealEnd);
    changeSquare(squareRefs, start, Grid.START_SQ, 0);
    changeSquare(squareRefs, end, Grid.END_SQ, 0);
  }, tick++ * delay);
  return tick;
};

const randomMaze = (squareRefs, delay) => {
  squareRefs.forEach((ref, index) => {
    const elm = ref.current;
    if (
      index !== Grid.INITIAL_START &&
      index !== Grid.INITIAL_END &&
      Math.random() < 0.35
    ) {
      elm.className = Grid.WALL_SQ;
    }
  });
  generateStartEndPosition(
    squareRefs,
    Grid.getSq(1, 1),
    Grid.getSq(Grid.SIZE - 1, Grid.SIZE - 1)
  );
};

const dfs = (squareRefs, delay) => {
  let tick = 1;
  tick = generateWallGrid(squareRefs, tick, delay);
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
        changeSquare(squareRefs, nextMoves[0], Grid.DEFAULT_SQ, tick++ * delay);
        changeSquare(squareRefs, nextMoves[1], Grid.DEFAULT_SQ, tick++ * delay);
        visited.add(nextMove);
        path.push(nextMove);
        path.push(nextMove);
        break;
      }
    }
  }

  // place end as far away as possible from start
  generateStartEndPosition(
    squareRefs,
    Grid.getSq(1, 1),
    Grid.getSq(Grid.SIZE - 1, Grid.SIZE - 1),
    tick,
    delay
  );
};

const recursiveDivision = (squareRefs, delay) => {
  let tick = 0;
  tick = drawMazeBorder(squareRefs, tick, delay);
  tick = divide(
    squareRefs,
    tick,
    delay,
    [0, Grid.HEIGHT - 1],
    [0, Grid.WIDTH - 1]
  );
  generateStartEndPosition(
    squareRefs,
    Grid.getSq(1, 1),
    Grid.getSq(Grid.HEIGHT - 1, Grid.WIDTH - 1),
    tick,
    delay
  );
};

const divide = (squareRefs, tick, delay, rowRange, colRange) => {
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
    return tick;
  } else {
    if (possibleRows.length >= possibleCols.length) {
      const randomRow = getRandomElement(possibleRows);
      tick = drawRow(squareRefs, tick, delay, randomRow, colRange);
      const randomColHole = getRandomElement(possibleColHoles);
      const randomHole = randomRow * Grid.WIDTH + randomColHole;
      changeSquare(squareRefs, randomHole, Grid.DEFAULT_SQ, tick++ * delay);
      tick = divide(
        squareRefs,
        tick,
        delay,
        [rowRange[0], randomRow],
        colRange
      );
      tick = divide(
        squareRefs,
        tick,
        delay,
        [randomRow, rowRange[1]],
        colRange
      );
    } else {
      let randomCol = getRandomElement(possibleCols);
      tick = drawCol(squareRefs, tick, delay, randomCol, rowRange);
      const randomRowHole = getRandomElement(possibleRowHoles);
      const randomHole = randomRowHole * Grid.WIDTH + randomCol;
      changeSquare(squareRefs, randomHole, Grid.DEFAULT_SQ, tick++ * delay);
      tick = divide(squareRefs, tick, delay, rowRange, [
        colRange[0],
        randomCol,
      ]);
      tick = divide(squareRefs, tick, delay, rowRange, [
        randomCol,
        colRange[1],
      ]);
    }
    return tick;
  }
};

const kruskal = (squareRefs, delay) => {
  let tick = 0;
  generateWallGrid(squareRefs, tick, delay);
  // let squares = {};
  let squares = [];
  let walls = {};
  // fill walls and squares
  for (
    let i = Grid.getSq(1, 1);
    i <= Grid.getSq(Grid.HEIGHT - 2, Grid.WIDTH - 2);
    i++
  ) {
    const [iRow, iCol] = Grid.getCoor(i);
    if (Grid.validMazeMove(i, i)) {
      if (iRow % 2 && iCol % 2) {
        // squares[i] = new Set([i]);
        squares[i] = [i];
      } else {
        if (iCol % 2) {
          walls[i] = [i - Grid.WIDTH, i + Grid.WIDTH];
        } else if (iRow % 2) {
          walls[i] = [i - 1, i + 1];
        }
      }
    }
  }

  while (squares.length > 1) {
    const randomWall = getRandomElement(Object.keys(walls));
    const [sq1, sq2] = walls[randomWall];
    console.log(squares.findIndex((s) => s === undefined));
    console.log(squares.filter((s) => s).find((s) => s.length === 1));
    if (
      !squares
        .filter((s) => s)
        .find((set) => set.includes(sq1))
        .includes(sq2)
    ) {
      changeSquare(squareRefs, randomWall, Grid.DEFAULT_SQ, tick++ * delay);
      const sq1Set = squares.splice(
        squares.filter((s) => s).findIndex((sq) => sq.includes(sq1), 1)
      )[0];
      const sq2Set = squares.splice(
        squares.filter((s) => s).findIndex((sq) => sq.includes(sq2), 1)
      )[0];
      console.log(sq2Set);
      squares = [...squares, [...sq1Set, ...sq2Set]];
      delete walls[randomWall];
    }
  }

  generateStartEndPosition(
    squareRefs,
    Grid.getSq(1, 1),
    Grid.getSq(Grid.HEIGHT - 1, Grid.WIDTH - 1)
  );
};

export default { generateMaze };
