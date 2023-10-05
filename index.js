const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const clearBtn = document.getElementById('clear-btn');
let drawing = false;

canvas.width = 400;
canvas.height = 400;

ctx.lineWidth = 5;
ctx.lineCap = 'round';
ctx.strokeStyle = 'black';

function startPosition(e) {
    drawing = true;
    draw(e);
}

function endPosition() {
    drawing = false;
    ctx.beginPath();
}

function draw(e) {
    if (!drawing) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', endPosition);
canvas.addEventListener('mousemove', draw);

canvas.addEventListener('touchstart', (e) => {
    startPosition(e.touches[0]);
});
canvas.addEventListener('touchend', endPosition);
canvas.addEventListener('touchmove', (e) => {
    draw(e.touches[0]);
    e.preventDefault();
});

clearBtn.addEventListener('click', clearCanvas);
