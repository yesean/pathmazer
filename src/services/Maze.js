import Grid from '../components/Grid';

const generateMaze = (maze, squareRefs, resetGrid) => {
  resetGrid(false);
  resetStartEndPosition(squareRefs);
  console.log('performing maze', maze);
  let delay = 5;
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
    case 'prim':
      prim(squareRefs, delay);
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
  // return array[getRandomNumberBetween(0, array.length - 1)];
  return array.splice(getRandomNumberBetween(0, array.length - 1), 1)[0];
};

const shuffleArray = (array) => {
  const newArray = [];
  while (array.length > 0) {
    newArray.push(
      // array.splice(getRandomNumberBetween(0, array.length - 1), 1)[0]
      getRandomElement(array)
    );
  }
  return newArray;
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
  let tick = 0;
  tick = drawMazeBorder(squareRefs, tick, delay);
  setTimeout(() => {
    squareRefs.forEach((ref, sq) => {
      if (Grid.validMazeMove(sq, sq) && Math.random() < 0.35) {
        ref.current.className = Grid.WALL_SQ;
      }
    });
    generateStartEndPosition(
      squareRefs,
      Grid.getSq(0, 0),
      Grid.getSq(Grid.SIZE - 1, Grid.SIZE - 1)
    );
  }, tick * delay);
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
  tick = generateWallGrid(squareRefs, tick, delay);
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
      changeSquare(squareRefs, wall, Grid.DEFAULT_SQ, tick++ * delay);
      const union = new Set([...treeSet[sq1], ...treeSet[sq2]]);
      treeSet[sq1].forEach((sq) => (treeSet[sq] = union));
      treeSet[sq2].forEach((sq) => (treeSet[sq] = union));
    }
  }

  generateStartEndPosition(
    squareRefs,
    Grid.getSq(1, 1),
    Grid.getSq(Grid.HEIGHT - 1, Grid.WIDTH - 1),
    tick,
    delay
  );
};

const prim = (squareRefs, delay) => {
  let tick = 0;
  tick = generateWallGrid(squareRefs, tick, delay);
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
  console.log(...neighborWalls[Grid.getSq(1, 1)]);
  while (visitedWalls.length > 0) {
    const randomWall = getRandomElement(visitedWalls);
    const [sq1, sq2] = neighborSquares[randomWall];
    if (sq1 > Grid.SIZE || sq2 > Grid.SIZE) {
      console.log(sq1, sq2);
    }
    if (visitedSquares.has(sq1) ^ visitedSquares.has(sq2)) {
      if (!visitedSquares.has(sq1)) {
        visitedSquares.add(sq1);
        // console.log(sq1);
        // console.log(neighborWalls[sq1]);
        visitedWalls = [...visitedWalls, ...neighborWalls[sq1]];
      } else {
        visitedSquares.add(sq2);
        // console.log(sq2);
        // console.log(neighborWalls[sq2]);
        visitedWalls = [...visitedWalls, ...neighborWalls[sq2]];
      }
      changeSquare(squareRefs, randomWall, Grid.DEFAULT_SQ, tick++ * delay);
    }
  }

  generateStartEndPosition(
    squareRefs,
    Grid.getSq(1, 1),
    Grid.getSq(Grid.HEIGHT - 1, Grid.WIDTH - 1),
    tick,
    delay
  );
};

export default { generateMaze };
