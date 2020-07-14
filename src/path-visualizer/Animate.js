const width = 80;
const height = 40;

const animate = (visited, path) => {
  const start = Number(document.getElementsByClassName('start')[0].id);
  const end = Number(document.getElementsByClassName('end')[0].id);
  visited = visited.filter((square) => square !== start && square !== end);
  path = path.filter((square) => square !== start && square !== end);
  let tick = 0;
  const delay = 10;

  // animate dijkstra
  for (const square of visited) {
    setTimeout(() => {
      document.getElementById(square).className += ' visited';
    }, tick++ * delay);
  }

  // animate path
  for (const square of path) {
    setTimeout(() => {
      document.getElementById(square).className += ' path';
    }, tick++ * delay);
  }
};

const clearAnimate = () => {
  for (let i = 0; i < width * height; i++) {
    let elm = document.getElementById(i);
    elm.className = elm.className.replace(' path', '');
    elm.className = elm.className.replace(' visited', '');
  }
};

export { animate, clearAnimate };
