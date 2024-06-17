const synth = new Tone.Synth().toDestination();

const rows = 5;
const cols = 5;
const buttonInfo = [];
const middleC = 261.626;
const harmonicSeriesStart = 4;

function getPitch(r, c) {
    var pitch = middleC;
    const h = harmonicSeriesStart;

    for (var i = 0; i < r; i++) {
        pitch *= (i + (h + 1)) / (i + h);
    }
    for (var i = 0; i < c; i++) {
        pitch *= (i + h) / (i + (h + 1));
    }
    return pitch;
}

function buttonClick(r, c) {
    var pitch = getPitch(r, c);
    console.log(r, c, pitch);
    synth.triggerAttackRelease(pitch, "8n");
}

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('grid');
    const buttons = [];

    for (let i = 0; i < rows * cols; i++) {
        const button = document.createElement('button');
        button.innerHTML = `<span></span>`;  // Optional: Add numbers to buttons for reference
        grid.appendChild(button);
        buttons.push(button);

        var r = rows - Math.floor(i / rows) - 1;
        var c = i % cols;
        var pitch = getPitch(r, c);

        var red = 76;
        var green = 175;
        var blue = 80;

        var colorScale = 0.25 + (pitch / getPitch(rows, cols)) * 0.5;
        
        button.style.backgroundColor = `rgb(${red * colorScale}, ${green * colorScale}, ${blue * colorScale})`;
        button.onclick = function() {
            //buttonClick(Math.floor(i / rows), i % cols);
            buttonClick(rows - Math.floor(i / rows) - 1, i % cols);
        }
    }

    // Store buttons in a 2D array
    const buttonGrid = [];
    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
            row.push(buttons[i * cols + j]);
        }
        buttonGrid.push(row);
    }

    // You can now access buttons with buttonGrid[row][col], e.g., buttonGrid[0][0] for the first button
});
