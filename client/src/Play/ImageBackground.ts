function getRandomBg() {
    const rndInt = Math.floor(Math.random() * 5) + 1;
    const dynamicFile = require('../Image/coursesbg/bg' + rndInt + '.jpg');
    return dynamicFile;
}

export function getDifferentBg(): number[]{
    let bg1 = getRandomBg();
    let bg2 = getRandomBg();

    while (bg1 === bg2){
        bg2 = getRandomBg();
    }
    return [bg1, bg2];
}