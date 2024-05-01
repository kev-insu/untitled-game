var stringData = {};

function saveGame() {
    for (const key in gameData) {
        stringData[key] = gameData[key].toString();
    }
    // Assuming gameData is an object containing all the necessary game state data
    localStorage.setItem('savedGameData', JSON.stringify(stringData));
    console.log('Game saved.');
}

function loadGame() {
    const savedData = localStorage.getItem('savedGameData');
    if (savedData) {
        stringData = JSON.parse(savedData);
        for (const key in stringData) {
            gameData[key] = Decimal.fromString(stringData[key]);
        }
        console.log('Game loaded.');
        // Update the UI or perform any necessary actions to reflect the loaded game state
    } else {
        console.log('No saved game found.');
    }
}

// Save game state automatically before the window unloads
window.addEventListener('beforeunload', function() {
    saveGame();
});

setInterval(function() {
    saveGame();
}, 5 * 60 * 1000);

// Load game state automatically when the page is loaded
window.addEventListener('load', function() {
    loadGame();
});