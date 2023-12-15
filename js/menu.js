import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./constants.js";

// Define menu options
const menuOptions = [
	{ text: "Start Game", action: "startGame" },
	{ text: "Options", action: "showOptions" },
	{ text: "Exit", action: "exitGame" },
];

// Set initial selected option
let selectedOption = 0;

export function drawMenu(ctx) {
	ctx.fillStyle = "red";
	ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

	// Draw menu options
	ctx.fillStyle = "#000";
	ctx.font = '24px "Press Start 2P"';
	menuOptions.forEach((option, index) => {
		const x = CANVAS_WIDTH / 2 - 80;
		const y = 200 + index * 40;
		ctx.fillText(
			index === selectedOption ? "► " + option.text : option.text,
			x,
			y
		);
	});
}

// function startGame() {
//   alert('Starting the game!');
// }

// function showOptions() {
//   alert('Showing options!');
// }

// function exitGame() {
//   alert('Exiting the game!');
// }

// function handleKeydown(event) {
//   switch (event.key) {
//     case 'ArrowUp':
//       selectedOption = (selectedOption - 1 + menuOptions.length) % menuOptions.length;
//       drawMenu();
//       break;
//     case 'ArrowDown':
//       selectedOption = (selectedOption + 1) % menuOptions.length;
//       drawMenu();
//       break;
//     case 'Enter':
//       menuOptions[selectedOption].action();
//       break;
//   }
// }

// Event listener for keyboard input
// document.addEventListener('keydown', handleKeydown);
