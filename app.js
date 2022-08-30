import spacelog from "./spaceLog.js";

// target html elements
const webConsole = document.querySelector('.console');
const playerDiv = document.querySelector('.player');
const aliensDiv = document.querySelector('.aliens');
const battleBtn = document.querySelector('.battle-btn');

window.addEventListener('load', () => {
  battleBtn.addEventListener('click', () => {
    createAlienDivs(aliens);
    battle();
  });
});



// #region ships

// PLAYER SHIP CLASS
class PlayerShip {
  constructor() {
    this.hull = 20;
    this.firepower = 5;
    this.accuracy = 0.7;
    this.identification = 'USS HelloWorld';
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
    spacelog(`${this.identification} attacks ${target.identification}`);

    if (hit) {
      spacelog(`it's a hit`);
      target.hull -= this.firepower;
      spacelog(`${target.identification} has taken ${this.firepower} points of damage.`);
      spacelog(`${target.identification} has ${target.hull} hull remaining.`);
      if (target.hull > 0) {
        spacelog(`${target.identification} has ${target.hull} hull remaining.`);
      } else {
        // TARGET DESTROYED
        spacelog(`${target.identification} is vaporized.`);
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
    this.identification = 'Alien';
  }

  attack(target) {
    const hit = Math.random() <= this.accuracy;
    spacelog(`${this.identification} attacks ${target.identification}`);

    if (hit) {
      spacelog(`it's a hit`);

      target.hull -= this.firepower;

      spacelog(`${target.identification} has taken ${this.firepower} points of damage.`);
      spacelog(`${target.identification} has ${target.hull} hull remaining.`);
      if (target.hull > 0) {
        spacelog(`${target.identification} has ${target.hull} hull remaining.`);
      } else {
        // TARGET DESTROYED
        spacelog(`${target.identification} is vaporized.`);
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




// THE PLAYERS
const player = new PlayerShip();
const aliens = AlienShip.spawn(8);


// WHAT WE'RE UP AGAINST
aliens.forEach((alien, index) => {
  spacelog(`alien ${index} has ${alien.hull} hull points.`);
})


// CREATE ALIEN DIVS IN WEB ALIEN CONTAINER
//    (called from battle-btn click)
const createAlienDivs = (aliens) => {
  aliens.forEach((alien, index) => {
    alien.identification = `Alien[${index}]`;
    const div = document.createElement('div');
    div.classList.add('alien', `alien${index}`);
    div.innerHTML = alien.identification;
    aliensDiv.append(div);
  })
}






spacelog();
// THE BATTLE

const battle = () => {


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

      }
    } // end while loop

    if (player.hull <= 0) {
      spacelog('GAME OVER');
      break;
    }

    // remove dead alien from array
    aliens.splice(i, 1);

    spacelog('---------------\n');
  }

}



// spacelog(new USS());
// spacelog(new Alien());
// spacelog(Math.random());
// spacelog(Alien.spawn());
// spacelog(Alien.spawn(6));


