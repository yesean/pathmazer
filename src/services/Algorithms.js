import Grid from './../components/Grid';

const dijkstra = (grid) => {
  const start = grid.findIndex((sq) => sq === Grid.START_SQ);
  const end = grid.findIndex((sq) => sq === Grid.END_SQ);

  const prev = {};
  const visited = [];
  const weights = new Array(Grid.SIZE).fill(Number.MAX_SAFE_INTEGER);
  weights[start] = 1;

  const pq = [start];
  while (pq.length > 0) {
    console.log('running dijkstras');
    const currSquare = pq.shift();
    visited.push(currSquare);
    if (currSquare === end) {
      break;
    }
    const moves = [-1, 1, -Grid.WIDTH, Grid.WIDTH];
    for (const nextSquare of moves
      .map((move) => currSquare + move)
      .filter((nextSquare) => Grid.validMove(currSquare, nextSquare))) {
      let moveWeight = weights[currSquare];
      // const elm = squareRefs[nextSquare].current;
      // if (grid[nextSquare] === Grid.WALL_SQ) {
      if (grid[nextSquare] === Grid.WALL_SQ) {
        moveWeight = Number.MAX_SAFE_INTEGER;
      } else if (grid[nextSquare] === Grid.WEIGHT_SQ) {
        moveWeight += 10;
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

const astar = (grid) => {
  const start = grid.findIndex((sq) => sq === Grid.START_SQ);
  const end = grid.findIndex((sq) => sq === Grid.END_SQ);

  const prev = {};
  const visited = [];
  const weights = new Array(Grid.SIZE).fill(Number.MAX_SAFE_INTEGER);
  weights[start] = 1;

  const heuristic = (start, end) => {
    return (
      Math.abs(Math.floor(start / Grid.WIDTH) - Math.floor(end / Grid.WIDTH)) +
      Math.abs((start % Grid.WIDTH) - (end % Grid.WIDTH))
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
    const moves = [-1, 1, -Grid.WIDTH, Grid.WIDTH];
    for (const nextSquare of moves
      .map((move) => currSquare + move)
      .filter((nextSquare) => Grid.validMove(currSquare, nextSquare))) {
      let moveWeight = weights[currSquare];
      if (grid[nextSquare] === Grid.WALL_SQ) {
        moveWeight = Number.MAX_SAFE_INTEGER;
      } else if (grid[nextSquare] === Grid.WEIGHT_SQ) {
        moveWeight += 10;
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

const greedy = (grid, setGrid) => {
  const start = grid.findIndex((sq) => sq === Grid.START_SQ);
  const end = grid.findIndex((sq) => sq === Grid.END_SQ);

  const prev = {};
  const visited = [];
  const weights = { start: 1 };

  const pq = [start];
  while (pq.length > 0) {
    console.log('running greedy bfs');
    const currSquare = pq.shift();
    visited.push(currSquare);
    if (currSquare === end) {
      break;
    }
    const moves = [-1, 1, -Grid.WIDTH, Grid.WIDTH];
    for (const nextSquare of moves
      .map((move) => currSquare + move)
      .filter((nextSquare) => Grid.validMove(currSquare, nextSquare))) {
      let moveWeight = Grid.dist(nextSquare, end);
      // add weight for mountains and weights
      if (grid[nextSquare] === Grid.WALL_SQ) {
        moveWeight = Number.MAX_SAFE_INTEGER;
      } else if (grid[nextSquare] === Grid.WEIGHT_SQ) {
        moveWeight += 10;
      }

      // insert into priority queue
      if (!pq.includes(nextSquare) && !visited.includes(nextSquare)) {
        weights[nextSquare] = moveWeight;
        prev[nextSquare] = currSquare;
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

  // retrace path
  const path = [];
  let currSquare = end;
  let count = 0;
  while (currSquare) {
    if (count++ > Grid.SIZE) {
      break;
    }
    path.unshift(currSquare);
    currSquare = prev[currSquare];
  }
  return [visited, path];
};

const dfs = (grid) => {
  const start = grid.findIndex((sq) => sq === Grid.START_SQ);
  const end = grid.findIndex((sq) => sq === Grid.END_SQ);

  const prev = {};
  const visited = [];

  const stack = [start];
  while (stack.length > 0) {
    console.log('running dfs');
    const currSquare = stack.pop();
    visited.push(currSquare);
    if (currSquare === end) {
      break;
    }
    const moves = [-1, 1, -Grid.WIDTH, Grid.WIDTH];
    for (const nextSquare of moves
      .map((move) => currSquare + move)
      .filter((nextSquare) => Grid.validMove(currSquare, nextSquare))) {
      // add weight for mountains and weights
      if (grid[nextSquare] === Grid.WALL_SQ) {
        continue;
      }

      // insert into stack
      if (!visited.includes(nextSquare) && !stack.includes(nextSquare)) {
        prev[nextSquare] = currSquare;
        stack.push(nextSquare);
      }
    }
  }

  // retrace path
  const path = [];
  let currSquare = end;
  let count = 0;
  while (currSquare) {
    if (count++ > Grid.SIZE) {
      break;
    }
    path.unshift(currSquare);
    currSquare = prev[currSquare];
  }
  return [visited, path];
};

const bfs = (grid) => {
  const start = grid.findIndex((sq) => sq === Grid.START_SQ);
  const end = grid.findIndex((sq) => sq === Grid.END_SQ);

  const prev = {};
  const visited = [];

  const queue = [start];
  while (queue.length > 0) {
    console.log('running bfs');
    const currSquare = queue.shift();
    visited.push(currSquare);
    if (currSquare === end) {
      break;
    }
    const moves = [-1, 1, -Grid.WIDTH, Grid.WIDTH];
    for (const nextSquare of moves
      .map((move) => currSquare + move)
      .filter((nextSquare) => Grid.validMove(currSquare, nextSquare))) {
      // add weight for mountains and weights
      if (grid[nextSquare] === Grid.WALL_SQ) {
        continue;
      }

      // insert into queue
      if (!visited.includes(nextSquare) && !queue.includes(nextSquare)) {
        prev[nextSquare] = currSquare;
        queue.push(nextSquare);
      }
    }
  }

  // retrace path
  const path = [];
  let currSquare = end;
  let count = 0;
  while (currSquare) {
    if (count++ > Grid.SIZE) {
      break;
    }
    path.unshift(currSquare);
    currSquare = prev[currSquare];
  }
  return [visited, path];
};

export default { dijkstra, astar, greedy, dfs, bfs };
