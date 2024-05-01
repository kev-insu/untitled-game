var rarityList = ["Basic", "Common", "Uncommon", "Rare", "Epic", "Unique",
                    "Legendary", "Mythical", "Prestigous", "Ascendant", "Immortal", "Radiant",
                    "Electrifying", "Heroic", "Fabled", "Transcendant", "Timeless", "Supreme",
                    "Ultimate", "Apex", "Zenith", "Triumphant", "Sublime", "Majestic",
                    "Exemplary", "Elite", "Cybernetic", "Pristine", "Arcane", "Rune Infused",
                    "Virtuous", "Unbeatable", "Star Forger", "Emperor", "Prodigal", "Ancient Fear",
                    "Outlaw", "Storm's Fury", "Grandmaster", "Enlightened One", "Void Walker", "Eternal Hunter",
                    "Prophet", "Bounty Hunter", "Fallen", "Curator of Runes", "Unbreakable Will", "Exile",
                    "Redeemer", "Crystallized", "Reborn", "Eternity"];

const gradients = [
    /* Basic */ 'linear-gradient(90deg, hsl(0, 0%, 50%) 10%, hsl(20, 0%, 35%) 50%, hsl(0, 0%, 20%) 90%)',
    /* Common */ 'linear-gradient(90deg, hsl(0, 0%, 100%) 10%, hsl(0, 0%, 80%) 50.00%, hsl(0, 0%, 60%) 90.00%)',
    /* Uncommon */ 'linear-gradient(to right, #acffb3, #77ff82)',
    /* Rare */ 'linear-gradient(to right, #68edff, #00aeff)',
    /* Epic */ 'linear-gradient(90deg, hsl(262, 62%, 80%) 10%, hsl(262, 62%, 70%) 50.00%, hsl(262, 62%, 60%) 90.00%)',
    /* Unique */ 'linear-gradient(90deg, hsl(45, 100%, 75%) 10%, hsl(45, 100%, 65%) 50.00%, hsl(45, 100%, 55%) 90.00%)',
    /* Legendary */ 'linear-gradient(to right, #68ff6f, #71ff9c)',
    /* Mythical */ 'linear-gradient(180deg, #4632ff, #ff7a3c)',
    /* Prestigous */ 'linear-gradient(180deg, #327aff, #b13cff)',
    /* Ascendant */ 'linear-gradient(180deg, #7cffbc, #10673c)',
    /* Immortal */ 'linear-gradient(180deg, #e16e65, #9c2141)',
    /* Radiant */ 'linear-gradient(180deg, #f7f2db, #fffb91)',
    /* Electrifying */ 'linear-gradient(180deg, #f6b4ff, #c74eff)',
    /* Heroic */ 'linear-gradient(180deg, #ff8c3f, #9c1c1c)',
    /* Fabled */ 'linear-gradient(180deg, #ff9100, #ff00dd)',
    /* Transcendant */ 'linear-gradient(180deg, #2533ff, #00d9ff)',
    /* Timeless */ 'linear-gradient(180deg, #f02a2a, #ff678d)',
    /* Supreme */ 'linear-gradient(180deg, #b4fa93, #0a8614)',
    /* Ultimate */ 'linear-gradient(180deg, #be41f5, #17008c)',
    /* Apex */ 'linear-gradient(180deg, #58c1dd, #00503b)',
    /* Zenith */ 'linear-gradient(180deg, #75b2e9, #0001c0)',
    /* Triumphant */ 'linear-gradient(180deg, #d0cd55, #75d776)',
    /* Sublime */ 'linear-gradient(180deg, #68da99, #1cdcb1)',
    /* Majestic */ 'linear-gradient(180deg, #90a2c1, #f10010)',
    /* Exemplary */ 'linear-gradient(180deg, #edceaf, #f0c000)',
    /* Elite */ 'linear-gradient(180deg, #ae6d9c, #ee5054)',
    /* Cybernetic */ 'linear-gradient(180deg, #8981f6, #ce19ff)',
    /* Pristine */ 'linear-gradient(180deg, #6198ff, #00d3ef)',
    /* Arcane */ 'linear-gradient(180deg, #7686ff, #120aff)',
    /* Rune Infused */ 'linear-gradient(180deg, #3a88d0, #5d37fe, #b977c1)',
    /* Virtuous */ 'linear-gradient(180deg, #009498, #0050fe)',
    /* Unbeatable */ 'linear-gradient(180deg, #5bc2c2, #618ef7)',
    /* Star Forger */ 'linear-gradient(180deg, #782eff, #7162ff)',
    /* Emperor */ 'linear-gradient(180deg, #eec9a4, #ff4800)',
    /* Prodigal */ 'linear-gradient(180deg, #f52f73, #f35456)',
    /* Ancient Fear */ 'linear-gradient(180deg, #d45759, #9b2120)',
    /* Outlaw */ 'linear-gradient(180deg, #d08197, #4e140a)',
    /* Storm's Fury */ 'linear-gradient(180deg, #cf9ae0, #877bf6)',
    /* Grandmaster */ 'linear-gradient(180deg, #e45f7a, #c5071f)',
    /* Enlightened One */ 'linear-gradient(180deg, #a2b8db, #24a0aa)',
    /* Void Walker */ 'linear-gradient(180deg, #644396, #360494)',
    /* Eternal Hunter */ 'linear-gradient(180deg, #a39257, #91120a)',
    /* Prophet */ 'linear-gradient(180deg, #5f0dce, #8d0022)',
    /* Bounty Hunter */ 'linear-gradient(180deg, #c97160, #760003)',
    /* Fallen */ 'linear-gradient(180deg, #002708, #03569d, #002a7e)',
    /* Curator of Runes */ 'linear-gradient(180deg, #b07659, #4c2a0e)',
    /* Unbreakable Will */ 'linear-gradient(180deg, #3969cf, #000f48)',
    /* Exile */ 'linear-gradient(180deg, #c9aee1, #000000)',
    /* Redeemer */ 'linear-gradient(180deg, #cf2b9e, #55001c)',
    /* Crystallized */ 'linear-gradient(180deg, #9861d8, #1c2269)',
    /* Reborn */ 'linear-gradient(180deg, #68b7d3, #002828)',
    /* Eternity */ 'linear-gradient(180deg, #000000, #c9aee1)'
];

function updateRarity() {
    let tier = Math.floor(Math.log2(gameData.currentRarity));
    if (gameData.currentRarity.eq(0)) {
        tier = new Decimal(0);
    }

    let selectedGradient = gradients[tier];

    rarity.style.background = selectedGradient;
    rarity.style.webkitTextFillColor = "transparent";
    rarity.style.webkitBackgroundClip = "text";
    rarity.style.backgroundClip = "transparent";


    document.getElementById("rarity").innerHTML = rarityList[tier] + " [#" + EternalNotations.Presets.ADMixedScientific.format(gameData.currentRarity) + "]"
}