import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./constants.js";

export function createImage(src) {
	let img = new Image();
	img.src = src;
	return img;
}


export function randomNum(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

// Check if the mouse is inside the button area
export function isMouseInsideButton(x, y,buttonx, buttony, size) {
	return x > buttonx && x < buttonx+size && y > buttony && y < buttony+size;
}

// Function to toggle pause
export function togglePause(isGamePaused) {
  isGamePaused = !isGamePaused;

  // You might also want to do additional actions when pausing/unpausing
  if (isGamePaused) {
    // Additional actions when the game is paused
    console.log("Game Paused");
  } else {
    // Additional actions when the game is unpaused
    console.log("Game Resumed");
  }
}