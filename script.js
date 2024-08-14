const brushColorBtn = document.getElementById('brush-color');
const brushSize = document.getElementById('brush-size');
const brushSlider = document.getElementById('brush-slider');
const bucketColorBtn = document.getElementById('bucket-color');
const eraser = document.getElementById('eraser'); 
const clearCanvasBtn = document.getElementById('clear-canvas'); 
const addImageBtn = document.getElementById('add-image'); 
const saveStorageBtn = document.getElementById('save-storage'); 
const loadStorageBtn = document.getElementById('load-storage'); 
const clearStorageBtn = document.getElementById('clear-storage'); 
const downloadBtn = document.getElementById('download'); 
const body = document.querySelector('body');

// Global Variables
let canvas = document.createElement('canvas');
let myCanvas = canvas.getContext('2d');
let currentSize = 10;
let bucketColor = 'white';
let currentColor = '#AB2567';
let isMouseDown = false;
let drawnArray = [];

// On startup
createCanvas();

// Setting Brush Size
brushSlider.addEventListener('change', () => {
    currentSize = brushSlider.value;
    if (brushSlider.value < 10) {
        brushSize.innerHTML = `0${brushSlider.value}`;
    } else {
        brushSize.innerHTML = brushSlider.value;
    }
});

// Setting Brush Color
brushColorBtn.addEventListener('change', () => currentColor = `#${brushColorBtn.value}`);

// Change Background Color
bucketColorBtn.addEventListener('change', () => {
    bucketColor = `#${bucketColorBtn.value}`;
    console.log(bucketColor);
    createCanvas();
    redraw();
});

// Create Canvas
function createCanvas() {
    canvas.id = 'canvas';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 100;
    canvas.style.position = "absolute";
    myCanvas.fillStyle = bucketColor;
    myCanvas.fillRect(0, 0, canvas.width, canvas.height);
    body.appendChild(canvas);
}

// Draw what is stored in DrawnArray
function redraw() {
    for (var i = 1; i < drawnArray.length; i++) {
        myCanvas.beginPath();
        myCanvas.moveTo(drawnArray[i-1].x, drawnArray[i-1].y);
        myCanvas.lineWidth = drawnArray[i].size;
        myCanvas.lineCap = "round";
        myCanvas.strokeStyle = drawnArray[i].color;
        myCanvas.lineTo(drawnArray[i].x, drawnArray[i].y);
        myCanvas.stroke();
    }
}

// Get Mouse Position
function getMousePosition(canvas, event) {
    let boundaries = canvas.getBoundingClientRect();
    return {
        x: event.clientX - boundaries.left,
        y: event.clientY - boundaries.top
    };
}

// Mouse Down
canvas.addEventListener('mousedown', () => onMouseDown(canvas, event));
function onMouseDown(canvas, event) {
    isMouseDown = true;
    var currentPosition = getMousePosition(canvas, event);
    myCanvas.moveTo(currentPosition.x, currentPosition.y);
    myCanvas.beginPath();
    myCanvas.lineWidth = currentSize;
    myCanvas.lineCap = "round";
    myCanvas.strokeStyle = currentColor;
}

// Mouse Move
canvas.addEventListener('mousemove', () => onMouseMove(canvas, event));
function onMouseMove(canvas, event) {
    if(isMouseDown == true) {
        var currentPosition = getMousePosition(canvas, event);
        myCanvas.lineTo(currentPosition.x, currentPosition.y);
        myCanvas.stroke();
        console.log('stroke');
        storeDrawn(currentPosition.x, currentPosition.y, currentSize, currentColor);
    }
}

// Store Drawn Lines in DrawnArray
function storeDrawn(x, y, size, color) {
    var line = {
        "x": x,
        "y": y,
        "size": size,
        "color": color
    }
    drawnArray.push(line);
}

// Mouse Up
canvas.addEventListener('mouseup', onMouseUp);
function onMouseUp() {
    isMouseDown = false;
}

