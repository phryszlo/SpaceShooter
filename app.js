import spacelog from "./spaceLog.js";

// target html elements
const webConsole = document.querySelector('.console');
const playerDiv = document.querySelector('.player');
const aliensDiv = document.querySelector('.aliens');
const battleBtn = document.querySelector('.battle-btn');
const retreatBtn = document.querySelector('.retreat');
const continueBtn = document.querySelector('.continue');
const numAliens = document.querySelector('#num-aliens');
const resultsDiv = document.querySelector('.results');

// THE PLAYERS
let player = null;
let aliens = null;

const createAlienDivs = () => {
  aliensDiv.innerText = '';
  // aliens.forEach((alien, index) => {
    for (let i = aliens.length - 1; i >= 0; i--){

    aliens[i].id = `Alien[${i}]`;
    const div = document.createElement('div');
    div.classList.add('alien', `alien${i}`);
    div.innerText = aliens[i].id;
    aliensDiv.append(div);
  }
}

const updateAlienWebDisplay = () => {
  // aliens.forEach((alien, index) => {
    for (let i = aliens.length - 1; i >= 0; i--){
    const alienbox = document.querySelector(`.alien${i}`);
    alienbox.innerText = 
      `id: ${aliens[i].id} 
      hull: ${aliens[i].hull}
      firepower: ${aliens[i].firepower}
      accuracy: ${aliens[i].accuracy}
    `
  }
}
const updatePlayerWebDisplay = () => {
    const playerbox = document.querySelector(`.player`);
    playerbox.innerText = 
      `id: ${player.id} 
      hull: ${player.hull}
      firepower: ${player.firepower}
      accuracy: ${player.accuracy}
    `
}

// --------- LOAD EVENT -----------
window.addEventListener('load', () => {
  battleBtn.addEventListener('click', () => {
    player = new PlayerShip();
    aliens = AlienShip.spawn(numAliens.value);
    createAlienDivs();
    updateAlienWebDisplay();
    battle();
  });
  retreatBtn.addEventListener('click', () => {

  });
  continueBtn.addEventListener('click', () => {

  })
});

// #region ships

// PLAYER SHIP CLASS
class PlayerShip {
  constructor() {
    this.hull = 20;
    this.firepower = 5;
    this.accuracy = 0.7;
    this.id = 'USS HelloWorld';
  }

  // spawn one alien or an array of aliens of size 'num'
  static spawn(num = 1) {
    const ships = [];
    if (num > 1) {
      for (let i = 0; i < num; i++) {
        ships.push(new PlayerShip());
      }
    }
    else {
      return new PlayerShip();
    }
    return ships;
  }

  attack(target) {
    const hit = Math.random() <= this.accuracy;
    spacelog(`${this.id} attacks ${target.id}`);

    if (hit) {
      spacelog(`it's a hit`);
      target.hull -= this.firepower;
      spacelog(`${target.id} has taken ${this.firepower} points of damage.`);
      spacelog(`${target.id} has ${target.hull} hull remaining.`);
      if (target.hull > 0) {
        spacelog(`${target.id} has ${target.hull} hull remaining.`);
      } else {
        // TARGET DESTROYED
        spacelog(`${target.id} is vaporized.`);
      }
    }
  }
}


// ALIEN SHIP CLASS
class AlienShip {
  constructor() {
    // wrote this formula this way for reference
    this.hull = Math.floor(Math.random() * ((6 - 3) + 1)) + 3;
    this.firepower = Math.floor(Math.random() * ((4 - 2) + 1)) + 2;
    this.accuracy =
      Number.parseFloat(Math.random() * (.8 - .6) + .6).toFixed(1);
    this.id = 'Alien';
  }

  attack(target) {
    const hit = Math.random() <= this.accuracy;
    spacelog(`${this.id} attacks ${target.id}`);

    if (hit) {
      spacelog(`it's a hit`);

      target.hull -= this.firepower;

      spacelog(`${target.id} has taken ${this.firepower} points of damage.`);
      spacelog(`${target.id} has ${target.hull} hull remaining.`);
      if (target.hull > 0) {
        spacelog(`${target.id} has ${target.hull} hull remaining.`);
      } else {
        // TARGET DESTROYED
        spacelog(`${target.id} is vaporized.`);
      }
    }
  }

  // spawn one alien or an array of aliens of size 'num'
  static spawn(num = 1) {
    const alienses = [];
    if (num > 1) {
      for (let i = 0; i < num; i++) {
        alienses.push(new AlienShip());
      }
    }
    else {
      return new AlienShip();
    }
    return alienses;
  }
}
// #endregion players






const endGame = (won) => {
  if (won) {
    resultsDiv.replaceChildren(
      `YOU WIN\n`,
      'All aliens have been defeated.');
    } else {
      resultsDiv.replaceChildren(
        `GAME OVER\n`,
      `Your ship is vaporized.\n`,
      `Alien[${aliens.length - 1}] has defeated you.`);
  }
}




spacelog('');
// THE BATTLE

const battle = () => {
  webConsole.replaceChildren('');

  let alive = true;
  // these first two loops would not get through all 6 battles
  // because of splicing the array
  // aliens.forEach((alien, index) => {
  // for (let i = 0; i < aliens.length; i++) {


  // this reverse order loop seems to work
  for (let i = aliens.length - 1; i >= 0; i--) {
    spacelog(`aliens remaining: ${aliens.length}`);
    spacelog(`alien[${i}] now up. it has ${aliens[i].hull} hull points.`);
    while (player.hull > 0 && aliens[i].hull > 0) {

      // ADD OPTION TO RUN AND HIDE HERE

      player.attack(aliens[i]);
      if (aliens[i].hull > 0) {
        spacelog(`alien ${i} survived`);
        aliens[i].attack(player);
      }
      else {
        spacelog(`alien ${i} died`);
        document.querySelector(`.alien${i}`).classList.add('dead-alien');
      }
    } // end while loop

    if (player.hull <= 0) {
      document.querySelector(`.alien${i}`).classList.add('winning-alien');

      spacelog('GAME OVER');
      alive = false;
      break;
    }

    // remove dead alien from array
    aliens.splice(i, 1);

    spacelog('---------------\n');

    updateAlienWebDisplay();
    updatePlayerWebDisplay();
  }
  endGame(alive);
}

const fight = () => {
  
}




// spacelog(new USS());
// spacelog(new Alien());
// spacelog(Math.random());
// spacelog(Alien.spawn());
// spacelog(Alien.spawn(6));


