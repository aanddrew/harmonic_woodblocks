var synth = null;

const rows = 5;
const cols = 5;
const buttonInfo = [];
const middleC = 261.626;
const harmonicSeriesStart = 4;
var audioIsReady = false;

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

        buttons[i].addEventListener("click", async () => {
            if (audioIsReady) {
                return;
            }

            // I hate you ios
            // https://www.audjust.com/blog/unmute-web-audio-on-ios
            // unblock playback when iOS is set to silent
            const audio = document.createElement("audio");
            audio.setAttribute("x-webkit-airplay", "deny");
            audio.preload = "auto";
            audio.loop = true;
            audio.src = "silent.mp3";
            audio.play();


            await Tone.start();
            console.log("audio is ready");
            audioIsReady = true;
            synth = new Tone.Synth().toDestination();
        });

        button.addEventListener("click", function() {
            //buttonClick(Math.floor(i / rows), i % cols);
            // buttonClick(rows - Math.floor(i / rows) - 1, i % cols);
            var pitch = getPitch(rows - Math.floor(i / rows) - 1, i % cols);
            console.log(pitch);
            if (synth != null) {
                synth.triggerAttackRelease(pitch, "8n");
            }
        })
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

