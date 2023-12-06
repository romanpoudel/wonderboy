export const keys = {
	a: false,
	d: false,
	w: false,
	leftArrow: false,
	rightArrow: false,
	upArrow: false,
	space: false,
};

addEventListener("keydown", function ({ key }) {
	switch (key) {
		case "a":
			keys.a = true;
			break;
		case "d":
			keys.d = true;
			break;
		case "w":
			keys.w = true;
			break;
		case "ArrowLeft":
			keys.leftArrow = true;
			break;
		case "ArrowRight":
			keys.rightArrow = true;
			break;
		case "ArrowUp":
			keys.upArrow = true;
			break;
		case " ":
			keys.space = true;
			break;
	}
});

addEventListener("keyup", function ({ key }) {
	switch (key) {
		case "a":
			keys.a = false;
			break;
		case "d":
			keys.d = false;
			break;
		case "w":
			keys.w = false;
			break;
		case "ArrowLeft":
			keys.leftArrow = false;
			break;
		case "ArrowRight":
			keys.rightArrow = false;
			break;
		case "ArrowUp":
			keys.upArrow = false;
			break;
		case " ":
			keys.space = false;
			break;
	}
});
