export const keys={
  a:false,
  // s:false,
  d:false,
  w:false,
  leftArrow:false,
  rightArrow:false,
  // downArrow:false,
  upArrow:false,
  space:false,
}

addEventListener("keydown", function ({key}) {
  switch (key) {
    case "a":
      keys.a=true;
      break;
    case "d":
      keys.d=true;
      break;
    case "w":
      keys.w=true;
      break;
    case "LeftArrow":
      keys.leftArrow=true;
      break;
    case "RightArrow":
      keys.rightArrow=true;
      break;
    case "UpArrow":
      keys.upArrow=true;
      break;
    case " ":
      keys.space=true;
      break;

  }
});


addEventListener("keyup", function ({key}) {
  switch (key) {
    case "a":
      keys.a=false;
      break;
    case "d":
      keys.d=false;
      break;
    case "w":
      keys.w=false;
      break;
    case "LeftArrow":
      keys.leftArrow=false;
      break;
    case "RightArrow":
      keys.rightArrow=false;
      break;
    case "UpArrow":
      keys.upArrow=false;
      break;
    case " ":
      keys.space=false;
      break;
  }
});