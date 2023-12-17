import { endGame } from "./index.js";

export let gameLevel = 1;

function selectLevel(level) {
	gameLevel = level;
	endGame(false);
}

window.selectLevel = selectLevel;
