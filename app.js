import spacelog from "./spaceLog.js";

// target html elements
const spaceConsole = document.querySelector('.console');
const playerDiv = document.querySelector('.player');
const aliensDiv = document.querySelector('.aliens');
const battleBtn = document.querySelector('.battle-btn');
const autoBattle = document.querySelector('#auto-battle');
const retreatBtn = document.querySelector('.retreat');
const continueBtn = document.querySelector('.continue');
const numAliens = document.querySelector('#num-aliens');
const resultsDiv = document.querySelector('.results');
const inGameMsg = document.querySelector('.in-game-msg');
const xImg = document.querySelector('.x-img');
const rocketImg = document.querySelector('.rocket')
const sploded = document.querySelector('.sploded');

let player = null;
let aliens = null;

let choseRetreat = false;
let choseContinue = false;

const createAlienDivs = () => {
  aliensDiv.innerText = '';
  aliens.forEach((alien, i) => {
    aliens[i].id = `Alien[${i}]`;
    const div = document.createElement('div');
    div.classList.add('alien', `alien${i}`);
    div.innerText = aliens[i].id;
    aliensDiv.append(div);
  })
}

const updateAlienWebDisplay = () => {
  aliens.forEach((alien, i) => {
    // for (let i = aliens.length - 1; i >= 0; i--) {
    const alienbox = document.querySelector(`.alien${i}`);
    alienbox.innerText =
      `id: ${aliens[i].id} 
      hull: ${aliens[i].hull}
      firepower: ${aliens[i].firepower}
      accuracy: ${aliens[i].accuracy}
    `;

  })
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

  numAliens.addEventListener('change', () => {
    spacelog('numAliens change event')
  })

  battleBtn.addEventListener('click', () => {
    aliens = AlienShip.spawn(numAliens.value);
    // createAlienDivs();
    // updateAlienWebDisplay();
    battle();
  });
  retreatBtn.addEventListener('click', () => {
    choseRetreat = true;
    choseContinue = false;
  });
  continueBtn.addEventListener('click', () => {
    choseContinue = true;
    choseRetreat = false;
  })
  player = new PlayerShip();

  updatePlayerWebDisplay();

});

// #region ships

// PLAYER SHIP CLASS
class PlayerShip {
  constructor() {
    this.hull = 20;
    this.firepower = 5;
    this.accuracy = 0.7;
    this.id = 'USS HelloWorld';
    this.alive = true;
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
    this.alive = true;
  }

  attack(target) {
    const hit = Math.random() <= this.accuracy;
    spacelog(`${this.id} attacks ${target.id}`);

    if (hit) {
      // THIS IS THE ONLY LINE IN attack() THAT DOES ANYTHING.
      // all of this logging could easily be moved out into the battle & fight fns.
      target.hull -= this.firepower;

      spacelog(`it's a hit`);
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


// this is how long this takes to write without using innerHTML
const endGame = (won) => {
  if (won) {
    const p1 = document.createElement('p');
    p1.replaceChildren(`YOU WIN`)
    const p2 = document.createElement('p');
    p2.replaceChildren(`All aliens defeated`)
    p1.classList.add('won-p1')
    p2.classList.add('won-p2')
    resultsDiv.replaceChildren(
      p1, p2)
  } else {
    const p1 = document.createElement('p');
    p1.replaceChildren(`GAME OVER`)
    const p2 = document.createElement('p');
    p2.replaceChildren(`Your ship is vaporized.`)
    const p3 = document.createElement('p');
    p3.replaceChildren(`Alien[${aliens.length - 1}] has defeated you.`)
    p1.classList.add('lost-p1')
    p2.classList.add('lost-p2')
    p3.classList.add('lost-p3')
    resultsDiv.replaceChildren(
      p1, p2, p3);
  }
}


// async wait technique taken from:
// https://thewebdev.info/2022/02/09/how-to-create-pause-or-delay-in-a-javascript-for-loop/#:~:text=JavaScript%20for%20loop%3F-,To%20create%20pause%20or%20delay%20in%20a%20JavaScript%20for%20loop,with%20a%20for%2Dof%20loop.&text=to%20define%20the%20wait%20function,to%20loop%20through%20an%20array.
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// [[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[  THE BATTLE  ]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]] 

const battle = async () => {
  // clear spacelog console
  spaceConsole.replaceChildren('');
  resultsDiv.replaceChildren('')

  let stillAlive = true;
  let battleEnded = false;

  // RUN THE INTRO ANIMATION
  rocketImg.classList.add('rocket-intro')

  createAlienDivs();
  updateAlienWebDisplay();

  // this seems kinda hacky
  await wait(3000);
  rocketImg.classList.remove('rocket-intro');

  for (let i = 0; i < aliens.length; i++) {

    spacelog(`---------BATTLE WITH ALIEN[${i}]------\n`);
    spacelog(`aliens remaining: 
              ${aliens.filter(a => a.alive === true).length}`);

    updateAlienWebDisplay();

    // FIGHT this alien. fight() returns bool.
    stillAlive = fight(i);

    // call wait between fights to simulate something happening
    if (stillAlive) {
      // that means this alien is defeated
      aliens[i].alive = false;

      if (!autoBattle.checked) {
        // here we want to wait for user to click attack button or retreat button
        while (!choseContinue) {
          if (choseRetreat) {
            battleEnded = true;
            break;
          }
          inGameMsg.replaceChildren(`${aliens[i].id} was defeated. hit attack / retreat to continue. `)
          await wait(100);
          if (i === aliens.length) choseContinue = true;
        }
      }
      else {
        inGameMsg.replaceChildren(`${aliens[i].id} was defeated. hit attack / retreat to continue. `)

      }
      inGameMsg.replaceChildren('')
    }
    else {
      // mark this alien the victor and break
      document.querySelector(`.alien${i}`).classList.add('winning-alien');
      spacelog('GAME OVER');
      break;
      // return false; // (from the forEach loop, not the function)
    }


    spacelog('---------------\n');

    if (battleEnded) {
      const p1 = document.createElement('p');
      p1.classList.add('retreated-p1')
      p1.replaceChildren(`GAME OVER`)
      resultsDiv.replaceChildren(p1, 'You have retreated')
      break;
    }

  } // end for

  if (!battleEnded) {
    endGame(stillAlive)
  }
}

const fight = (i) => {
  choseContinue = false;
  choseRetreat = false;

  spacelog(`alien[${i}] now up. it has ${aliens[i].hull} hull points.`);

  // while both fighters are still alive, repeat
  while (player.hull > 0 && aliens[i].hull > 0) {

    const x = document.createElement('img');
    // ADD OPTION TO RUN AND HIDE HERE

    player.attack(aliens[i]);
    if (aliens[i].hull > 0) {
      spacelog(`alien ${i} survived`);
      aliens[i].attack(player);
    }
    else {
      document.querySelector(`.alien${i}`).classList.add('dead-alien');
      x.src = sploded.src;
      x.classList.add('sploded');
      x.style.display = aliens[i].hull <= 0 ? "block" : "none";
      document.querySelector(`.alien${i}`).append(x);
    }
  } // end while loop

  if (player.hull <= 0) {

    player.alive = false;
    return false;
  }

  // remove dead alien from array
  // aliens.splice(i, 1);

  // return yes, still alive
  return true;
}



// setInterval(() => {
//   if (choseContinue) {
//     continueBtn.classList.add('continue-selected');

//   } else {
//     continueBtn.classList.remove('continue-selected');
//   }
//   if (choseRetreat) {
//     retreatBtn.classList.add('retreat-selected');

//   } else {
//     retreatBtn.classList.remove('retreat-selected');
//   }
// }, 100);




