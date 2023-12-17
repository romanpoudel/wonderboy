function sound(sound){
  let music=new Audio();
  music.src=sound;
    return music;
}

const gameSound=sound("./assets/sounds/game.mp3");

const jumpSound=sound("./assets/sounds/Jump.mp3");

const deathSound=sound("./assets/sounds/dead.mp3");

const fruitSound=sound("./assets/sounds/fruit.mp3");

const throwSound=sound("./assets/sounds/throw.mp3");

const menuSound=sound("./assets/sounds/menu.mp3");


export {deathSound, fruitSound, gameSound, jumpSound, throwSound, menuSound};