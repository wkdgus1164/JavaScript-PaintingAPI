const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName('jsColor');
const range = document.getElementById('jsRange');
const mode = document.getElementById('jsMode');
const saveBtn = document.getElementById('jsSave');

const INITIAL_COLOR = '#2c2c2c';
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = 'white';
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

const stopPainting = () => painting = false;
const startPainting = () => painting = true;

const onMouseMove = e => {
  const x = e.offsetX;
  const y = e.offsetY;

  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

const handleColorClick = e => {
  ctx.strokeStyle = e.target.style.backgroundColor;
  ctx.fillStyle = e.target.style.backgroundColor;
}

const handleRangeChange = e => ctx.lineWidth = e.target.value;

const handleModeClick = e => {
  if (filling) {
    filling = false;
    mode.innerText = 'Fill';
  } else {
    filling = true;
    mode.innerText = 'Paint';
    ctx.fillStyle = ctx.strokeStyle;
  }
}

const handleCanvasClick = () => {
  if (filling) ctx.fillRect(0, 0, canvas.width, canvas.height);
}

const handleCM = e => e.preventDefault();

const handleSaveClick = () => {
  const image = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = image;
  link.download = "PaintJS[🎈]";
  link.click();
}

if (canvas) {
  canvas.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener('mousedown', startPainting);
  canvas.addEventListener('mouseup', stopPainting);
  canvas.addEventListener('mouseleave', stopPainting);
  canvas.addEventListener('click', handleCanvasClick);
  canvas.addEventListener('contextmenu', handleCM);
}

Array.from(colors).forEach(color => color.addEventListener('click', handleColorClick));
if (range) range.addEventListener('input', handleRangeChange);
if (mode) mode.addEventListener('click', handleModeClick);
if (saveBtn) saveBtn.addEventListener('click', handleSaveClick);