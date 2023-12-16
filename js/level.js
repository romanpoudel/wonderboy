import { endGame } from "./index.js";

export let gameLevel=1;

function selectLevel(level){
  gameLevel = level;
  switch(level){
    case 1:
      // Level 1
      console.log("level1",gameLevel)
      //restart the game
      endGame(false);
      break;
    case 2:
      // Level 2
      // gameLevel = level;
      console.log("level2",gameLevel)
      endGame(false);
      break;
    case 3:
      // Level 3
      console.log("level3")
      break;
    case 4:
      // Level 4
      console.log("level4")
      break;
    case 5:
      // Level 5
      console.log("level5")
      break;
  }
}

window.selectLevel = selectLevel;