import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./constants.js";

export function createImage(src) {
	let img = new Image();
	img.src = src;
	return img;
}


export function randomNum(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}