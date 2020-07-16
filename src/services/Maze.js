// import Grid from './Grid';
import Grid from '../components/Grid';

const generateMaze = (maze, squareRefs, resetGrid) => {
  resetGrid(false);
  let delay = 10;
  switch (maze) {
    case 'random':
      randomMaze(squareRefs, delay);
      break;
    case 'dfs':
      dfs(squareRefs, delay);
      break;
    default:
  }
};

const randomMaze = (squareRefs, delay) => {
  squareRefs.forEach((ref, index) => {
    const elm = ref.current;
    if (
      index !== Grid.INITIAL_START &&
      index !== Grid.INITIAL_END &&
      Math.random() < 0.3
    ) {
      elm.className = Grid.WALL_SQ;
    }
  });
};

const dfs = (squareRefs, delay) => {
  const start = 0;
  const visited = new Set([start]);
  squareRefs.forEach((ref) => (ref.current.className = Grid.WALL_SQ));
  const path = [start];
  let tick = 1;
  let currSquare = start;
  while (path.length === 1 || currSquare !== start) {
    let moves = [-2, 2, -2 * Grid.WIDTH, 2 * Grid.WIDTH];
    moves = ((cs, m) => {
      return m.filter((move) => {
        const nextMove = cs + move;
        return (
          nextMove < Grid.WIDTH * Grid.HEIGHT &&
          nextMove >= 0 &&
          Math.abs(
            Math.floor(nextMove % Grid.WIDTH) - Math.floor(cs % Grid.WIDTH)
          ) <= 2
        );
      });
    })(currSquare, moves);

    let needsBacktracking = true;
    while (moves.length > 0) {
      const nextMove =
        currSquare + moves.splice(Math.random() * moves.length, 1)[0];
      const nextMoves = [(currSquare + nextMove) / 2, nextMove];
      if (!visited.has(nextMove)) {
        changeSquare(squareRefs, nextMoves[0], Grid.DEFAULT_SQ, tick++ * delay);
        changeSquare(squareRefs, nextMoves[1], Grid.DEFAULT_SQ, tick++ * delay);
        visited.add(nextMove);
        path.push(nextMove);
        needsBacktracking = false;
        currSquare = nextMove;
        break;
      }
    }
    if (needsBacktracking) {
      currSquare = path.pop();
    }
  }
  const end = squareRefs.reduce((max, ref, index) => {
    const refDist = Grid.dist(index, start);
    const maxDist = Grid.dist(max, start);
    return refDist > maxDist ? index : max;
  }, 0);
  changeSquare(squareRefs, start, Grid.START_SQ, tick++ * delay);
  changeSquare(squareRefs, end, Grid.END_SQ, tick++ * delay);
};

const changeSquare = (squareRefs, square, squareType, delay) => {
  setTimeout(() => (squareRefs[square].current.className = squareType), delay);
};

export default { generateMaze };
