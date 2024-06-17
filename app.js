// const synth = new Tone.Synth().toDestination();

// synth.triggerAttackRelease("C4", "8n");
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('grid');
    const buttons = [];
    const rows = 5;
    const cols = 5;

    for (let i = 0; i < rows * cols; i++) {
        const button = document.createElement('button');
        button.innerHTML = `<span>${i + 1}</span>`;  // Optional: Add numbers to buttons for reference
        grid.appendChild(button);
        buttons.push(button);
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
