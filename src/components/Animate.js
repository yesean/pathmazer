import GridConstants from './../GridConstants';
import * as Algorithms from './Algorithms';

const clearAnimate = () => {
  for (let i = 0; i < GridConstants.WIDTH * GridConstants.HEIGHT; i++) {
    const elm = document.getElementById(i);
    if (
      elm.className === GridConstants.VISITED_SQUARE ||
      elm.className === GridConstants.PATH_SQUARE
    ) {
      elm.className = GridConstants.DEFAULT_SQUARE;
    }
  }
};

const animate = (visited, path, visitedDelay, pathDelay) => {
  clearAnimate();
  const start = Number(
    document.getElementsByClassName(GridConstants.START_SQUARE)[0].id
  );
  const end = Number(
    document.getElementsByClassName(GridConstants.END_SQUARE)[0].id
  );
  visited = visited.filter((square) => square !== start && square !== end);
  path = path.filter((square) => square !== start && square !== end);

  let visitedTick = 0;
  // animate visited
  for (const square of visited) {
    setTimeout(() => {
      document.getElementById(square).className = GridConstants.VISITED_SQUARE;
    }, visitedTick++ * visitedDelay);
  }

  // animate path
  let pathTick = 0;
  for (const square of path) {
    setTimeout(() => {
      document.getElementById(square).className = GridConstants.PATH_SQUARE;
    }, visitedTick * visitedDelay + pathTick++ * pathDelay);
  }
};

const animateDijkstra = () => {
  const [visited, path] = Algorithms.dijkstra();
  animate(visited, path, 10, 50);
};

const animateAstar = () => {
  const [visited, path] = Algorithms.astar();
  animate(visited, path, 10, 50);
};

export { animateDijkstra, animateAstar };
