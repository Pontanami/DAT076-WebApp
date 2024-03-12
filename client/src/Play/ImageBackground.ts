/**
 * Generates a random background path
 * @returns a path to the background we want to display on a course
 */
function getRandomBg() {
    const rndInt = Math.floor(Math.random() * 5) + 1;
    const dynamicFile = require('../Image/coursesbg/bg' + rndInt + '.jpg');
    return dynamicFile;
}

/**
 * Ensures that the backgrounds are different
 * @returns a tuple of the backgounds we want our courses to have
 */
export function getDifferentBg(): number[]{
    let bg1 = getRandomBg();
    let bg2 = getRandomBg();

    while (bg1 === bg2){
        bg2 = getRandomBg();
    }
    return [bg1, bg2];
}