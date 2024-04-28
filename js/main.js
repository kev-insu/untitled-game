var gameData = {
    multiplierLuck: 1,
    multiplierRebirth: 1,
    multiplierPrestige: 1,
    multiplierTranscension: 1,

    currentRarity: 0,
    currentRebirth: 0,
    currentPrestige: 0,
    currentTranscension: 0,

    totalRolls: 0,

    costLuckUpgrade: 1, // Luck Upgrade
    boostLuckUpgrade: 1,
    costRebirthUpgrade: 10, // Rebirth Upgrade
    boostRebirthUpgrade: 1,
    costRollSpeedUpgrade: 1, // Roll Speed Upgrade
    rollSpeed: 1,
}

var gameInterval = setInterval(gameTick, 16);

function gameTick() {
    updateUpgrade();
    updateMultipliers();
    updateStatsDisplay();
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
    document.getElementById("totalRolls").innerHTML = "Total Rolls: " + gameData.totalRolls;
}

function updateStatsDisplay() {
    let rebirth = document.getElementById("stat-rebirth");
    let prestige = document.getElementById("stat-prestige");
    let transcension = document.getElementById("stat-transcension");

    document.getElementById("stat-rebirth").innerHTML =  gameData.currentRebirth + " Rebirths";
    document.getElementById("stat-prestige").innerHTML =  gameData.currentPrestige + " Prestiges";
    document.getElementById("stat-transcension").innerHTML =  gameData.currentTranscension + " Transcensions";

    document.getElementById("multLuck").innerHTML = "Luck Multiplier: " + gameData.multiplierLuck + "x";
    document.getElementById("multRebirth").innerHTML = "Rebirth Multiplier: " + gameData.multiplierRebirth + "x";
    document.getElementById("multPrestige").innerHTML = "Prestige Multiplier: " + gameData.multiplierPrestige + "x";
    document.getElementById("multTranscension").innerHTML = "Transcension Multiplier: " + gameData.multiplierTranscension + "x";

    if (gameData.currentRebirth === 0) {
        rebirth.style.display = "none";
    }
    else {
        rebirth.style.display = "block";
    }

    if (gameData.currentPrestige === 0) {
        prestige.style.display = "none";
    }
    else {
        prestige.style.display = "block";
    }

    if (gameData.currentTranscension === 0) {
        transcension.style.display = "none";
    }
    else {
        transcension.style.display = "block";
    }
}

function updateUpgrade() {
    var button1 = document.getElementById("button1");
    var button2 = document.getElementById("button2");
    var button3 = document.getElementById("button3");
    var button4 = document.getElementById("button4");

    // button 1 (reset for rebirths)
    if (gameData.currentRarity >= 2) {
        button1.classList.add("buyable");
        document.getElementById("botUpgrade1").innerHTML =  "Reset for +" + calcRebirthGain() + " Rebirths";
    }
    else {
        button1.classList.remove("buyable");
    }

    // button 2
    if (gameData.currentRebirth >= gameData.costLuckUpgrade) {
        button2.classList.add("buyable");
    }
    else {
        button2.classList.remove("buyable");
    }

    // button 3
    if (gameData.currentRebirth >= gameData.costRebirthUpgrade) {
        button3.classList.add("buyable");
    }
    else {
        button3.classList.remove("buyable");
    }

    // button 4
    if (gameData.currentRebirth >= gameData.costRollSpeedUpgrade) {
        button4.classList.add("buyable");
    }
    else {
        button4.classList.remove("buyable");
    }
}

function updateMultipliers() {
    gameData.multiplierLuck = gameData.boostLuckUpgrade;
    gameData.multiplierRebirth = gameData.boostRebirthUpgrade;
}

function calcRebirthGain() {
    var result = Math.pow(2, gameData.currentRarity - 2) * gameData.multiplierRebirth;

    return result;
}

function resetRebirth() {
    if (gameData.currentRarity >= 2) {
        gameData.currentRebirth += calcRebirthGain();
        gameData.currentRarity = 0;
        document.getElementById("rarity").innerHTML = "Common [#" + gameData.currentRarity + "]";
        document.getElementById("botUpgrade1").innerHTML = "Unable to reset.";
    }
}

function resetPrestige() {
    if (gameData.currentRarity >= 8) {
        gameData.currentRebirth += Math.pow(2, gameData.currentRarity - 2);
        gameData.currentRarity = 0;
        document.getElementById("rarity").innerHTML = "Common [#" + gameData.currentRarity + "]";
        document.getElementById("botUpgrade1").innerHTML = "Unable to reset.";
    }
}
function luckUpgrade() {
    while (gameData.currentRebirth >= gameData.costLuckUpgrade) {
        gameData.currentRebirth -= gameData.costLuckUpgrade;
        gameData.costLuckUpgrade = Math.floor(gameData.costLuckUpgrade * 2.25);
        gameData.boostLuckUpgrade *= 2;
    }

    document.getElementById("topUpgrade2").innerHTML = gameData.costLuckUpgrade + " Rebirths";
    document.getElementById("botUpgrade2").innerHTML = gameData.boostLuckUpgrade + "x Luck";
}

function rebirthUpgrade() {
    while (gameData.currentRebirth >= gameData.costRebirthUpgrade) {
        gameData.currentRebirth -= gameData.costRebirthUpgrade;
        gameData.costRebirthUpgrade = Math.floor(gameData.costRebirthUpgrade * 3.75);
        gameData.boostRebirthUpgrade *= 2;
    }

    document.getElementById("topUpgrade3").innerHTML = gameData.costRebirthUpgrade + " Rebirths";
    document.getElementById("botUpgrade3").innerHTML = gameData.boostRebirthUpgrade + "x Rebirths";
}

function returnRollSpeed() {
    return gameData.rollSpeed;
}

function updateRollSpeed() {
    document.getElementById("rollSpeed").innerHTML = "Roll speed: 1 every " + gameData.rollSpeed + " ms";
}

function returnRebirth() {
    return gameData.currentRebirth;
}

function returnPrestige() {
    return gameData.currentPrestige;
}

function returnTranscension() {
    return gameData.currentTranscension;
}

/* Testing/ temporary functions */

function incrementTranscension() {
    gameData.currentTranscension++;
}

function incrementPrestige() {
    gameData.currentPrestige++;
}

function incrementRebirth() {
    gameData.currentRebirth++;
}