import GridConstants from './GridConstants';
import Grid from '../components/Grid';

const generateMaze = (maze, squareRefs, resetGrid) => {
  resetGrid(false);
  switch (maze) {
    case 'random':
      randomMaze(squareRefs);
      break;
    case 'dfs':
      dfsMaze(squareRefs);
      break;
    default:
  }
};

const randomMaze = (squareRefs) => {
  squareRefs.forEach((ref, index) => {
    const elm = ref.current;
    if (
      index !== GridConstants.INITIAL_START &&
      index !== GridConstants.INITIAL_END &&
      Math.random() < 0.3
    ) {
      elm.className = GridConstants.WALL_SQUARE;
    }
  });
};

const dfsMaze = (squareRefs) => {
  const start = 0;
  // const firstMove = start + Math.random() < 0.5 ? 1 : GridConstants.WIDTH;
  let walls = new Array(GridConstants.WIDTH * GridConstants.HEIGHT).fill(true);
  const visited = new Set();
  visited.add(start);
  // visited.add(firstMove);
  walls[start] = false;
  // walls[firstMove] = false;
  squareRefs.forEach(
    (ref) => (ref.current.className = GridConstants.WALL_SQUARE)
  );
  walls = dfs(start, walls, [start], visited, squareRefs);
  squareRefs[start].current.className = GridConstants.START_SQUARE;
  squareRefs[
    squareRefs.reduce((max, ref, index) => {
      const refDist =
        Math.abs(
          Math.floor(index / GridConstants.WIDTH) -
            Math.floor(start / GridConstants.WIDTH)
        ) +
        Math.abs((index % GridConstants.WIDTH) - (start % GridConstants.WIDTH));
      const maxDist =
        Math.abs(
          Math.floor(max / GridConstants.WIDTH) -
            Math.floor(start / GridConstants.WIDTH)
        ) +
        Math.abs((max % GridConstants.WIDTH) - (start % GridConstants.WIDTH));
      return refDist > maxDist ? index : max;
    }, 0)
  ].current.className = GridConstants.END_SQUARE;
};

const dfs = (start, walls, path, visited, squareRefs) => {
  let tick = 1;
  let currSquare = start;
  while (path.length === 1 || currSquare !== start) {
    let moves = [-1, 1, -GridConstants.WIDTH, GridConstants.WIDTH];
    moves = moves.filter((move) => {
      const nextMove = currSquare + move;
      return (
        nextMove < GridConstants.WIDTH * GridConstants.HEIGHT &&
        nextMove >= 0 &&
        Math.abs(
          Math.floor(nextMove % GridConstants.WIDTH) -
            Math.floor(currSquare % GridConstants.WIDTH)
        ) <= 1
      );
    });
    let needsBacktracking = true;
    while (moves.length > 0) {
      const nextMove =
        currSquare + moves.splice(Math.random() * moves.length, 1)[0];
      if (!visited.has(nextMove)) {
        walls[nextMove] = false;
        path.push(nextMove);
        // moves.forEach((move) => {
        //   if (move + currSquare !== nextMove) {
        //     visited.add(move + currSquare);
        //   }
        // });
        visited.add(nextMove);
        currSquare = nextMove;
        needsBacktracking = false;
        setTimeout(() => {
          squareRefs[nextMove].current.className = GridConstants.DEFAULT_SQUARE;
        }, tick++ * 100);
        break;
      }
    }
    if (needsBacktracking) {
      currSquare = path.pop();
    }
  }
};

export default { generateMaze };
