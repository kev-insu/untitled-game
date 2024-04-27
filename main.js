var gameData = {
    currentRarity: 0,
    multiplierLuck: 1,
    multiplierRebirth: 1,
    speedRarityRoll: 1,
    totalRolls: 0
}

function rollRarity() {
    let roll = Math.ceil(Math.random() * 100);
    let cur = gameData.multiplierLuck;
    while (roll > 80) {
        cur *= 5;
        roll = Math.ceil(Math.random() * 100);
    }

    cur = Math.floor(Math.log(cur) / Math.log(5));
    if (cur > gameData.currentRarity) {
        gameData.currentRarity = cur;
        // Math.ceil(cur / 5);
    }
    gameData.totalRolls++;

    document.getElementById("rarity").innerHTML = "Common [#" + gameData.currentRarity + "]";
    document.getElementById("totalRolls").innerHTML = "Total rolls: " + gameData.totalRolls;
}