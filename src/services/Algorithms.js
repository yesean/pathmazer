import GridConstants from './GridConstants';

const dijkstra = (squareRefs) => {
  const start = squareRefs.findIndex(
    (ref) => ref.current.className === GridConstants.START_SQUARE
  );
  const end = squareRefs.findIndex(
    (ref) => ref.current.className === GridConstants.END_SQUARE
  );
  const prev = {};
  const visited = [];
  const weights = new Array(GridConstants.WIDTH * GridConstants.HEIGHT).fill(
    Number.MAX_SAFE_INTEGER
  );
  weights[start] = 1;

  const pq = [start];
  while (pq.length > 0) {
    console.log('running dijkstras');
    const currSquare = pq.shift();
    visited.push(currSquare);
    if (currSquare === end) {
      break;
    }
    const moves = [-1, 1, -GridConstants.WIDTH, GridConstants.WIDTH];
    for (const nextSquare of moves
      .map((move) => currSquare + move)
      .filter(
        (nextSquare) =>
          nextSquare > 0 &&
          nextSquare < GridConstants.WIDTH * GridConstants.HEIGHT &&
          Math.abs(
            (currSquare % GridConstants.WIDTH) -
              (nextSquare % GridConstants.WIDTH)
          ) <= 1
      )) {
      let moveWeight = weights[currSquare];
      if (
        document.getElementById(nextSquare).className ===
        GridConstants.WALL_SQUARE
      ) {
        moveWeight = Number.MAX_SAFE_INTEGER;
      } else {
        moveWeight += 1;
      }

      if (moveWeight < weights[nextSquare]) {
        weights[nextSquare] = moveWeight;
        prev[nextSquare] = currSquare;

        if (pq.includes(nextSquare)) {
          pq.splice(pq.indexOf(nextSquare), 1);
        }

        // insert into priority queue
        if (!visited.includes(nextSquare)) {
          let inserted = false;
          for (let i = 0; i < pq.length; i++) {
            if (moveWeight < weights[pq[i]]) {
              pq.splice(i, 0, nextSquare);
              inserted = true;
              break;
            }
          }
          if (!inserted) {
            pq.push(nextSquare);
          }
        }
      }
    }
  }

  // retrace path
  const path = [];
  let currSquare = end;
  while (currSquare) {
    path.unshift(currSquare);
    currSquare = prev[currSquare];
  }
  return [visited, path];
};

const astar = (squareRefs) => {
  const start = squareRefs.findIndex(
    (ref) => ref.current.className === GridConstants.START_SQUARE
  );
  const end = squareRefs.findIndex(
    (ref) => ref.current.className === GridConstants.END_SQUARE
  );
  const prev = {};
  const visited = [];
  const weights = new Array(GridConstants.WIDTH * GridConstants.HEIGHT).fill(
    Number.MAX_SAFE_INTEGER
  );
  weights[start] = 1;

  const heuristic = (start, end) => {
    return (
      Math.abs(
        Math.floor(start / GridConstants.WIDTH) -
          Math.floor(end / GridConstants.WIDTH)
      ) + Math.abs((start % GridConstants.WIDTH) - (end % GridConstants.WIDTH))
    );
  };

  const pq = [start];
  while (pq.length > 0) {
    console.log('running astar');
    const currSquare = pq.shift();
    visited.push(currSquare);
    if (currSquare === end) {
      break;
    }
    const moves = [-1, 1, -GridConstants.WIDTH, GridConstants.WIDTH];
    for (const nextSquare of moves
      .map((move) => currSquare + move)
      .filter(
        (nextSquare) =>
          nextSquare > 0 &&
          nextSquare < GridConstants.WIDTH * GridConstants.HEIGHT &&
          Math.abs(
            (currSquare % GridConstants.WIDTH) -
              (nextSquare % GridConstants.WIDTH)
          ) <= 1
      )) {
      let moveWeight = weights[currSquare];
      if (
        document.getElementById(nextSquare).className ===
        GridConstants.WALL_SQUARE
      ) {
        moveWeight = Number.MAX_SAFE_INTEGER;
      } else {
        moveWeight += 1;
      }

      if (moveWeight < weights[nextSquare]) {
        weights[nextSquare] = moveWeight;
        prev[nextSquare] = currSquare;

        if (pq.includes(nextSquare)) {
          pq.splice(pq.indexOf(nextSquare), 1);
        }

        // insert into priority queue
        if (!visited.includes(nextSquare)) {
          let inserted = false;
          for (let i = 0; i < pq.length; i++) {
            if (
              moveWeight + heuristic(nextSquare, end) <
              weights[pq[i]] + heuristic(pq[i], end)
            ) {
              pq.splice(i, 0, nextSquare);
              inserted = true;
              break;
            }
          }
          if (!inserted) {
            pq.push(nextSquare);
          }
        }
      }
    }
  }

  // retrace path
  let path = [];
  let currSquare = end;
  while (currSquare) {
    path.unshift(currSquare);
    currSquare = prev[currSquare];
  }

  return [visited, path];
};

const greedy = () => {
  let start = document.getElementsByClassName('start')[0];
  let end = document.getElementsByClassName('end')[0];
  if (start !== undefined && end !== undefined) {
    start = Number(start.id);
    end = Number(end.id);
    let visited = [];
    let prev = [];

    // retrace path
    let path = [];
    let currSquare = end;
    while (currSquare) {
      path.unshift(currSquare);
      currSquare = prev[currSquare];
    }

    return [visited, prev];
  }
};

export { dijkstra, astar, greedy };
