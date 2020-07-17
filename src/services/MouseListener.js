let isHoldingStart = false;
let isHoldingEnd = false;
let isMouseDown = false;

const setHoldingStart = (holdingStart) => {
  isHoldingStart = holdingStart;
};

const setHoldingEnd = (holdingEnd) => {
  isHoldingEnd = holdingEnd;
};

const setMouseDown = (mouseDown) => {
  isMouseDown = mouseDown;
  console.log('is mouse down ', isMouseDown);
};

export default {
  isHoldingStart,
  isHoldingEnd,
  isMouseDown,
  setHoldingStart,
  setHoldingEnd,
  setMouseDown,
};
