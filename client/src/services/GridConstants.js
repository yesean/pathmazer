let GridConstants = {};
let WIDTH,
  HEIGHT,
  SIZE,
  INITIAL_START,
  INITIAL_END,
  INITIAL_GRID,
  getRow,
  getCol,
  getCoor,
  getSq,
  dist,
  validMove,
  validMazeMove;

GridConstants.DEFAULT_SQ = 'square';
GridConstants.START_SQ = 'startSquare';
GridConstants.END_SQ = 'endSquare';
GridConstants.WALL_SQ = 'wallSquare';
GridConstants.WEIGHT_SQ = 'weightSquare';
GridConstants.VISITED_SQ = 'visitedSquare';
GridConstants.VISITED_WEIGHT_SQ = 'visitedWeightSquare';
GridConstants.VISITED_HEAD_SQ = 'visitedHeadSquare';
GridConstants.VISITED_FINISHED_SQ = 'visitedFinishedSquare';
GridConstants.VISITED_FINISHED_WEIGHT_SQ = 'visitedFinishedWeightSquare';
GridConstants.PATH_SQ = 'pathSquare';
GridConstants.PATH_WEIGHT_SQ = 'pathWeightSquare';
GridConstants.PATH_HEAD_SQ = 'pathHeadSquare';
GridConstants.PATH_FINISHED_SQ = 'pathFinishedSquare';
GridConstants.PATH_FINISHED_WEIGHT_SQ = 'pathFinishedWeightSquare';

const update = (width, height) => {
  WIDTH = width;
  HEIGHT = height;

  // maintain odd number of rows and cols for maze
  if (WIDTH % 2 === 0) {
    WIDTH--;
  }
  if (HEIGHT % 2 === 0) {
    HEIGHT--;
  }
  SIZE = WIDTH * HEIGHT;
  INITIAL_START = Math.floor(HEIGHT / 2) * WIDTH + Math.floor(WIDTH / 6);
  INITIAL_END = Math.floor(HEIGHT / 2) * WIDTH + Math.floor((WIDTH * 5) / 6);
  INITIAL_GRID = new Array(SIZE)
    .fill(null)
    .map(() => ({ initialClassName: GridConstants.DEFAULT_SQ }));
  INITIAL_GRID[INITIAL_START].initialClassName = GridConstants.START_SQ;
  INITIAL_GRID[INITIAL_END].initialClassName = GridConstants.END_SQ;

  getRow = (sq) => Math.floor(sq / WIDTH);

  getCol = (sq) => sq % WIDTH;

  getCoor = (sq) => [getRow(sq), getCol(sq)];

  getSq = (row, col) => row * WIDTH + col;

  dist = (start, end) =>
    Math.abs(getRow(start) - getRow(end)) +
    Math.abs(getCol(start) - getCol(end));

  validMove = (start, end) =>
    end < SIZE && end >= 0 && Math.abs(getCol(end) - getCol(start)) <= 2;

  validMazeMove = (start, end) => {
    const [endRow, endCol] = getCoor(end);
    return (
      endRow >= 1 &&
      endRow < HEIGHT - 1 &&
      endCol >= 1 &&
      endCol < WIDTH - 1 &&
      validMove(start, end)
    );
  };

  GridConstants.WIDTH = WIDTH;
  GridConstants.HEIGHT = HEIGHT;
  GridConstants.SIZE = SIZE;
  GridConstants.INITIAL_START = INITIAL_START;
  GridConstants.INITIAL_END = INITIAL_END;
  GridConstants.INITIAL_GRID = INITIAL_GRID;
  GridConstants.getRow = getRow;
  GridConstants.getCol = getCol;
  GridConstants.getCoor = getCoor;
  GridConstants.getSq = getSq;
  GridConstants.dist = dist;
  GridConstants.validMove = validMove;
  GridConstants.validMazeMove = validMazeMove;
  GridConstants.update = update;
};

update(-1, -1);

export default GridConstants;
