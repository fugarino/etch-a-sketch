// Selectors
const container = document.querySelector(".container");
const colorPicker = document.getElementById("colorPicker");
const colorModeBtn = document.getElementById("colorMode");
const rainbowModeBtn = document.getElementById("rainbowMode");
const eraserBtn = document.getElementById("eraser");
const clearBtn = document.getElementById("clear");
const smallBtn = document.getElementById("smallBtn");
const mediumBtn = document.getElementById("mediumBtn");
const largeBtn = document.getElementById("largeBtn");

let defaultGrid = 16;
let defaultColor = "#333333";
let mode = "color";

// Functions
const createGrid = (num) => {
  container.style.gridTemplateColumns = `repeat(${num}, 1fr)`;
  for (let i = 1; i <= num * num; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    container.append(square);
    square.addEventListener("mouseover", highlight);
    square.addEventListener("mousedown", highlight);
  }
};

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

const highlight = (e) => {
  if (e.type === "mouseover" && !mouseDown) return;
  if (mode === "color") {
    e.target.style.background = defaultColor;
  } else if (mode === "rainbow") {
    const r = Math.floor(Math.random() * 250);
    const g = Math.floor(Math.random() * 250);
    const b = Math.floor(Math.random() * 250);
    e.target.style.background = `rgb(${r}, ${g}, ${b})`;
  } else if (mode === "eraser") {
    e.target.style.background = "#fff";
  }
};

const changeColor = (e) => {
  defaultColor = e.target.value;
};
const colorMode = () => {
  mode = "color";
  colorModeBtn.classList.add("active");
  rainbowModeBtn.classList.remove("active");
  eraserBtn.classList.remove("active");
};
const rainbowMode = () => {
  mode = "rainbow";
  rainbowModeBtn.classList.add("active");
  colorModeBtn.classList.remove("active");
  eraserBtn.classList.remove("active");
};
const erase = () => {
  mode = "eraser";
  eraserBtn.classList.add("active");
  colorModeBtn.classList.remove("active");
  rainbowModeBtn.classList.remove("active");
};
const clearGrid = () => {
  container.innerHTML = "";
  createGrid(defaultGrid);
};

const smallGrid = () => {
  defaultGrid = 16;
  clearGrid();
  smallBtn.classList.add("active-grid-size");
  mediumBtn.classList.remove("active-grid-size");
  largeBtn.classList.remove("active-grid-size");
};
const mediumGrid = () => {
  defaultGrid = 24;
  clearGrid();
  smallBtn.classList.remove("active-grid-size");
  mediumBtn.classList.add("active-grid-size");
  largeBtn.classList.remove("active-grid-size");
};
const largeGrid = () => {
  defaultGrid = 32;
  clearGrid();
  smallBtn.classList.remove("active-grid-size");
  mediumBtn.classList.remove("active-grid-size");
  largeBtn.classList.add("active-grid-size");
};

// EventListeners
clearBtn.addEventListener("click", clearGrid);
colorPicker.addEventListener("change", changeColor);
colorModeBtn.addEventListener("click", colorMode);
rainbowModeBtn.addEventListener("click", rainbowMode);
eraserBtn.addEventListener("click", erase);
smallBtn.addEventListener("click", smallGrid);
mediumBtn.addEventListener("click", mediumGrid);
largeBtn.addEventListener("click", largeGrid);

// OnLoad
window.onload = () => {
  createGrid(defaultGrid);
  colorMode();
  smallGrid();
};
