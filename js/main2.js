var gameData = {
    multiplierLuck: new Decimal(1),
    multiplierRebirth: new Decimal(1),
    multiplierPrestige: new Decimal(1),
    multiplierTranscension: new Decimal(1),

    currentRarity: new Decimal(0),
    currentRebirth: new Decimal(0),
    currentPrestige: new Decimal(0),
    currentTranscension: new Decimal(0),

    totalRolls: new Decimal(0),

    // Layer 1 - Rebirth
    costLuckUpgrade: new Decimal(1), // Luck Upgrade
    boostLuckUpgrade: new Decimal(1),

    costRebirthUpgrade: new Decimal(10), // Rebirth Upgrade
    boostRebirthUpgrade: new Decimal(1),

    costRollSpeedUpgrade: new Decimal(1), // Roll Speed Upgrade
    rollSpeed: new Decimal(1),

    // Layer 2 - Prestige
    costLuckUpgrade2: new Decimal(1),
    boostLuckUpgrade2: new Decimal(1),

    costRebirthUpgrade2: new Decimal(1),
    boostRebirthUpgrade2: new Decimal(1),

    costPrestigeUpgrade: new Decimal(2),
    boostPrestigeUpgrade: new Decimal(1),

    // Layer 3 - Transcension
    costLuckUpgrade3: new Decimal(1),
    boostLuckUpgrade3: new Decimal(1),

    costRebirthUpgrade2: new Decimal(1),
    boostRebirthUpgrade2: new Decimal(1),

    costPrestigeUpgrade: new Decimal(1),
    boostPrestigeUpgrade: new Decimal(1),

    costTranscensionUpgrade: new Decimal(1),
    boostTranscensionUpgrade: new Decimal(1)
}

var gameInterval = setInterval(gameTick, 16);

function gameTick() {

    updateUpgrade();
    updateMultipliers();
    updateStatsDisplay();
    preventNegative();
}

function updateUpgrade() {

    // Layer 1
    var button1 = document.getElementById("button1");
    var button2 = document.getElementById("button2");
    var button3 = document.getElementById("button3");
    var button4 = document.getElementById("button4");

    // button 1 (reset for rebirths)
    if (gameData.currentRarity.greaterThanOrEqualTo(2)) {
        button1.classList.add("buyable");
        document.getElementById("botUpgrade1").innerHTML =  "Reset for +" + EternalNotations.Presets.ADMixedScientific.format(calcRebirthGain()) + " Rebirths";
    }
    else {
        button1.classList.remove("buyable");
    }

    // button 2
    if (gameData.currentRebirth.greaterThanOrEqualTo(gameData.costLuckUpgrade)) {
        button2.classList.add("buyable");
    }
    else {
        button2.classList.remove("buyable");
    }

    // button 3
    if (gameData.currentRebirth.greaterThanOrEqualTo(gameData.costRebirthUpgrade)) {
        button3.classList.add("buyable");
    }
    else {
        button3.classList.remove("buyable");
    }

    // button 4
    if (gameData.currentRebirth.greaterThanOrEqualTo(gameData.costRollSpeedUpgrade)) {
        button4.classList.add("buyable");
    }
    else {
        button4.classList.remove("buyable");
    }

    document.getElementById("topUpgrade2").innerHTML = EternalNotations.Presets.ADMixedScientific.format(gameData.costLuckUpgrade) + " Rebirths";
    document.getElementById("botUpgrade2").innerHTML = "x" + EternalNotations.Presets.ADMixedScientific.format(gameData.boostLuckUpgrade) + " Luck";

    document.getElementById("topUpgrade3").innerHTML = EternalNotations.Presets.ADMixedScientific.format(gameData.costRebirthUpgrade) + " Rebirths";
    document.getElementById("botUpgrade3").innerHTML = "x" + EternalNotations.Presets.ADMixedScientific.format(gameData.boostRebirthUpgrade) + " Rebirths";

    document.getElementById("topUpgrade6").innerHTML = EternalNotations.Presets.ADMixedScientific.format(gameData.costLuckUpgrade2) + " Prestiges";
    document.getElementById("botUpgrade6").innerHTML = "x" + EternalNotations.Presets.ADMixedScientific.format(gameData.boostLuckUpgrade2) + " Luck";

    document.getElementById("topUpgrade7").innerHTML = EternalNotations.Presets.ADMixedScientific.format(gameData.costRebirthUpgrade2) + " Prestiges";
    document.getElementById("botUpgrade7").innerHTML = "x" + EternalNotations.Presets.ADMixedScientific.format(gameData.boostRebirthUpgrade2) + " Rebirths";

    document.getElementById("topUpgrade8").innerHTML = EternalNotations.Presets.ADMixedScientific.format(gameData.costPrestigeUpgrade) + " Prestiges";
    document.getElementById("botUpgrade8").innerHTML = "x" + EternalNotations.Presets.ADMixedScientific.format(gameData.boostPrestigeUpgrade) + " Prestiges";

    document.getElementById("topUpgrade10").innerHTML = EternalNotations.Presets.ADMixedScientific.format(gameData.costLuckUpgrade3) + " Transcensions";
    document.getElementById("botUpgrade10").innerHTML = "x" + EternalNotations.Presets.ADMixedScientific.format(gameData.boostLuckUpgrade3) + " Luck";

    // Layer 2
    var button5 = document.getElementById("button5");
    var button6 = document.getElementById("button6");
    var button7 = document.getElementById("button7");
    var button8 = document.getElementById("button8");

    if (gameData.currentRarity.greaterThanOrEqualTo(8)) {
        button5.classList.add("buyable");
        document.getElementById("botUpgrade5").innerHTML =  "Reset for +" + EternalNotations.Presets.ADMixedScientific.format(calcPrestigeGain()) + " Prestiges";
    }
    else {
        button5.classList.remove("buyable");
    }

    if (gameData.currentPrestige.greaterThanOrEqualTo(gameData.costLuckUpgrade2)) {
        button6.classList.add("buyable");
    }
    else {
        button6.classList.remove("buyable");
    }

    if (gameData.currentPrestige.greaterThanOrEqualTo(gameData.costRebirthUpgrade2)) {
        button7.classList.add("buyable");
    }
    else {
        button7.classList.remove("buyable");
    }

    if (gameData.currentPrestige.greaterThanOrEqualTo(gameData.costPrestigeUpgrade)) {
        button8.classList.add("buyable");
    }
    else {
        button8.classList.remove("buyable");
    }

    // Layer 3
    var button9 = document.getElementById("button9");
    if (gameData.currentRarity.greaterThanOrEqualTo(30)) {
        button9.classList.add("buyable");
        document.getElementById("botUpgrade9").innerHTML =  "Reset for +" + EternalNotations.Presets.ADMixedScientific.format(calcTranscensionGain()) + " Transcensions";
    }
    else {
        button9.classList.remove("buyable");
    }
    if (gameData.currentTranscension.greaterThanOrEqualTo(gameData.costLuckUpgrade3)) {
        button10.classList.add("buyable");
    }
    else {
        button10.classList.remove("buyable");
    }
}

function updateMultipliers() {
    gameData.multiplierLuck = gameData.boostLuckUpgrade.mul(gameData.boostLuckUpgrade2).mul(gameData.boostLuckUpgrade3);
    gameData.multiplierRebirth = gameData.boostRebirthUpgrade.mul(gameData.boostRebirthUpgrade2);
    gameData.multiplierPrestige = gameData.boostPrestigeUpgrade;
}

function updateStatsDisplay() {
    let rebirth = document.getElementById("stat-rebirth");
    let prestige = document.getElementById("stat-prestige");
    let transcension = document.getElementById("stat-transcension");

    document.getElementById("multLuck").innerHTML = "Luck Multiplier: x" + EternalNotations.Presets.ADMixedScientific.format(gameData.multiplierLuck);
    document.getElementById("multRebirth").innerHTML = "Rebirth Multiplier: x" + EternalNotations.Presets.ADMixedScientific.format(gameData.multiplierRebirth);
    document.getElementById("multPrestige").innerHTML = "Prestige Multiplier: x" + EternalNotations.Presets.ADMixedScientific.format(gameData.multiplierPrestige);
    document.getElementById("multTranscension").innerHTML = "Transcension Multiplier: x" + EternalNotations.Presets.ADMixedScientific.format(gameData.multiplierTranscension);
    document.getElementById("totalRolls").innerHTML = "Total Rolls: " + gameData.totalRolls;

    document.getElementById("stat-rebirth").innerHTML =  EternalNotations.Presets.ADMixedScientific.format(gameData.currentRebirth) + " Rebirths";
    document.getElementById("stat-prestige").innerHTML =  EternalNotations.Presets.ADMixedScientific.format(gameData.currentPrestige) + " Prestiges";
    document.getElementById("stat-transcension").innerHTML =  EternalNotations.Presets.ADMixedScientific.format(gameData.currentTranscension) + " Transcensions";
    document.getElementById("rarity").innerHTML = "Common [#" + EternalNotations.Presets.ADMixedScientific.format(gameData.currentRarity) + "]"


    if (gameData.currentRebirth.eq(0)) {
        rebirth.style.display = "none";
    }
    else {
        rebirth.style.display = "block";
    }

    if (gameData.currentPrestige.eq(0)) {
        prestige.style.display = "none";
    }
    else {
        prestige.style.display = "block";
    }

    if (gameData.currentTranscension.eq(0)) {
        transcension.style.display = "none";
    }
    else {
        transcension.style.display = "block";
    }
}

function preventNegative() {
    if (gameData.currentRebirth.lessThan(0)) {
        gameData.currentRebirth = new Decimal(0);
    }

    if (gameData.currentPrestige.lessThan(0)) {
        gameData.currentPrestige = new Decimal(0);
    }
}

function rollRarity() {
    let roll = Math.ceil(Math.random() * 100);
    let cur = new Decimal(gameData.multiplierLuck);
    while (roll >= 80) {
        cur = cur.mul(5);
        roll = Math.ceil(Math.random() * 100);
    }

    cur = cur.log(5).floor();
    if (cur.greaterThan(gameData.currentRarity)) {
        gameData.currentRarity = cur;
        // Math.ceil(cur / 5);
    }
    gameData.totalRolls = gameData.totalRolls.add(1);
}

function calcRebirthGain() {
    var result = gameData.currentRarity.sub(2).pow_base(2).mul(gameData.multiplierRebirth);

    return result;
}

function calcPrestigeGain() {
    var result = gameData.currentRarity.sub(7).mul(gameData.multiplierPrestige);

    return result;
}

function calcTranscensionGain() {
    var result = gameData.currentRarity.sub(29).mul(gameData.multiplierTranscension);

    return result;
}

function resetRebirth() { // check
    if (gameData.currentRarity.greaterThanOrEqualTo(2)) {
        gameData.currentRebirth = gameData.currentRebirth.add(calcRebirthGain());
        gameData.currentRarity = new Decimal(0);
        document.getElementById("rarity").innerHTML = "Common [#" + gameData.currentRarity + "]";
        document.getElementById("botUpgrade1").innerHTML = "Unable to reset.";
    }
}

function luckUpgrade() { // intial: (1, 1), baseCost: 2.25, baseBoost: 2
    if (gameData.currentRebirth.greaterThanOrEqualTo(gameData.costLuckUpgrade)) {

        let current = gameData.currentRebirth;
        let cost = gameData.costLuckUpgrade;
        let boost = gameData.boostLuckUpgrade;
        let baseCost = new Decimal(2.25);
        let baseBoost = new Decimal(2);

        let baseminus = baseCost.sub(new Decimal(1));
        let times = baseminus.mul(current).add(cost).log(baseCost).sub(cost.log(baseCost)).floor();
        let cum = baseCost.pow(times).sub(new Decimal(1)).mul(cost).div(baseminus);
    
        gameData.currentRebirth = current.sub(cum);
        gameData.costLuckUpgrade = baseCost.pow(times).mul(cost);
        gameData.boostLuckUpgrade = baseBoost.pow(times).mul(boost);
    }
}

function rebirthUpgrade() { // initial: (10, 1), baseCost: 3.75, baseBoost: 2
    if (gameData.currentRebirth.greaterThanOrEqualTo(gameData.costRebirthUpgrade)) {
        let current = gameData.currentRebirth;
        let cost = gameData.costRebirthUpgrade;
        let boost = gameData.boostRebirthUpgrade;
        let baseCost = new Decimal(3.75);
        let baseBoost = new Decimal(2);

        let baseminus = baseCost.sub(new Decimal(1));
        let times = baseminus.mul(current).add(cost).log(baseCost).sub(cost.log(baseCost)).floor();
        let cum = baseCost.pow(times).sub(new Decimal(1)).mul(cost).div(baseminus);
    
        gameData.currentRebirth = current.sub(cum);
        gameData.costRebirthUpgrade = baseCost.pow(times).mul(cost);
        gameData.boostRebirthUpgrade = baseBoost.pow(times).mul(boost);
    }
}

function resetPrestige() { // check
    if (gameData.currentRarity.greaterThanOrEqualTo(8)) {
        gameData.currentPrestige = gameData.currentPrestige.add(calcPrestigeGain());
        gameData.currentRarity = new Decimal(0);
        document.getElementById("rarity").innerHTML = "Common [#" + gameData.currentRarity + "]";
        document.getElementById("botUpgrade5").innerHTML = "Unable to reset.";

        statResetRebirth();
    }
}

function upgradeLuck2() { // initial: (1, 1), baseCost: 2.5, baseBoost: 5
    if (gameData.currentPrestige.greaterThanOrEqualTo(gameData.costLuckUpgrade2)) {
        let current = gameData.currentPrestige;
        let cost = gameData.costLuckUpgrade2;
        let boost = gameData.boostLuckUpgrade2;
        let baseCost = new Decimal(2.5);
        let baseBoost = new Decimal(5);

        let baseminus = baseCost.sub(new Decimal(1));
        let times = baseminus.mul(current).add(cost).log(baseCost).sub(cost.log(baseCost)).floor();
        let cum = baseCost.pow(times).sub(new Decimal(1)).mul(cost).div(baseminus);
    
        gameData.currentPrestige = current.sub(cum);
        gameData.costLuckUpgrade2 = baseCost.pow(times).mul(cost);
        gameData.boostLuckUpgrade2 = baseBoost.pow(times).mul(boost);
    }
}

function upgradeRebirth2() {
    while (gameData.currentPrestige.greaterThanOrEqualTo(gameData.costRebirthUpgrade2)) {
        gameData.currentPrestige = gameData.currentPrestige.sub(gameData.costRebirthUpgrade2);
        gameData.costRebirthUpgrade2 = gameData.costRebirthUpgrade2.mul(3.5).floor();
        gameData.boostRebirthUpgrade2 = gameData.boostRebirthUpgrade2.mul(2);
    }
}

function upgradePrestige() {
    while (gameData.currentPrestige.greaterThanOrEqualTo(gameData.costPrestigeUpgrade)) {
        gameData.currentPrestige = gameData.currentPrestige.sub(gameData.costPrestigeUpgrade);
        gameData.costPrestigeUpgrade = gameData.costPrestigeUpgrade.mul(10).floor();
        gameData.boostPrestigeUpgrade = gameData.boostPrestigeUpgrade.mul(2);
    }
}

function resetTranscension() { // check
    if (gameData.currentRarity.greaterThanOrEqualTo(30)) {
        gameData.currentTranscension = gameData.currentTranscension.add(calcTranscensionGain());
        gameData.currentRarity = new Decimal(0);
        document.getElementById("rarity").innerHTML = "Common [#" + gameData.currentRarity + "]";
        document.getElementById("botUpgrade1").innerHTML = "Unable to reset.";

        statResetRebirth();
        statResetPrestige();
    }
}

function upgradeLuck3() { // initial: (1, 1), baseCost: 2, baseBoost: 10
    if (gameData.currentTranscension.greaterThanOrEqualTo(gameData.costLuckUpgrade3)) {
        let current = gameData.currentTranscension;
        let cost = gameData.costLuckUpgrade3;
        let boost = gameData.boostLuckUpgrade3;
        let baseCost = new Decimal(2);
        let baseBoost = new Decimal(10);

        let baseminus = baseCost.sub(new Decimal(1));
        let times = baseminus.mul(current).add(cost).log(baseCost).sub(cost.log(baseCost)).floor();
        let cum = baseCost.pow(times).sub(new Decimal(1)).mul(cost).div(baseminus);
    
        gameData.currentTranscension = current.sub(cum);
        gameData.costLuckUpgrade3 = baseCost.pow(times).mul(cost);
        gameData.boostLuckUpgrade3 = baseBoost.pow(times).mul(boost);
    }
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

// Testing/ temporary functions:
/*
function incrementTranscension() {
    gameData.currentTranscension++;
}

function incrementPrestige() {
    gameData.currentPrestige++;
}

function incrementRebirth() {
    gameData.currentRebirth++;
}
*/
function rarity10() {
    gameData.currentRarity = new Decimal(1);
    /*
    gameData.currentTranscension = new Decimal(1e72.7);
    gameData.currentPrestige = new Decimal(1e72.7);
    gameData.currentRebirth = new Decimal(1e72.7);
    */
}

// Stat Reset Functions:
function resetRarity() {
    gameData.currentRarity = new Decimal(0);
}

function statResetRebirth() {
    gameData.currentRebirth = new Decimal(0);
    gameData.costLuckUpgrade = new Decimal(1); // Luck Upgrade
    gameData.boostLuckUpgrade = new Decimal(1);
    gameData.costRebirthUpgrade = new Decimal(10); // Rebirth Upgrade
    gameData.boostRebirthUpgrade = new Decimal(1);
    gameData.costRollSpeedUpgrade = new Decimal(1); // Roll Speed Upgrade
}

function statResetPrestige() {
    gameData.currentPrestige = new Decimal(0);
    gameData.costLuckUpgrade2 = new Decimal(1);
    gameData.boostLuckUpgrade2 = new Decimal(1);
    gameData.costRebirthUpgrade2 = new Decimal(1);
    gameData.boostRebirthUpgrade2 = new Decimal(1);
    gameData.costPrestigeUpgrade = new Decimal(2);
    gameData.boostPrestigeUpgrade = new Decimal(1);
}

function statResetTranscension() {
    gameData.currentTranscension = new Decimal(0);
    gameData.costRebirthUpgrade2 = new Decimal(1);
    gameData.boostRebirthUpgrade2 = new Decimal(1);

    gameData.costPrestigeUpgrade = new Decimal(1);
    gameData.boostPrestigeUpgrade = new Decimal(1);

    gameData.costTranscensionUpgrade = new Decimal(1);
    gameData.boostTranscensionUpgrade = new Decimal(1);
}