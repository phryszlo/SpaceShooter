

class PlayerShip {
  constructor() {
    this.hull = 20;
    this.firepower = 5;
    this.accuracy = 0.7;
    this.identifier = 'USS HelloWorld';
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
    console.log(`${this.identifier} attacks ${target.identifier}`);

    if (hit) {
      console.log(`it's a hit`);
      target.hull -= this.firepower;
      console.log(`${target.identifier} has taken ${this.firepower} points of damage.`);
      console.log(`${target.identifier} has ${target.hull} hull remaining.`);
      if (target.hull > 0) {
        console.log(`${target.identifier} has ${target.hull} hull remaining.`);
      } else {
        // TARGET DESTROYED
        console.log(`${target.identifier} is vaporized.`);
      }
    }
  }

  takeHit(damage) {
    this.hull -= damage;
    if (this.hull <= 0) {
      console.log('you are blowed up and very dead.');
    }
    else {
      console.log(`you have taken ${damage} points of damage to your hull.`);
      console.log(`hull remaining: ${this.hull}`);
    }
  }
}

class AlienShip {
  constructor() {
    // wrote this formula this way for reference
    this.hull = Math.floor(Math.random() * ((6 - 3) + 1)) + 3;
    this.firepower = Math.floor(Math.random() * ((4 - 2) + 1)) + 2;
    this.accuracy =
      Number.parseFloat(Math.random() * (.8 - .6) + .6).toFixed(1);
    this.identifier = 'Alien';
  }

  attack(target) {
    const hit = Math.random() <= this.accuracy;
    console.log(`${this.identifier} attacks ${target.identifier}`);

    if (hit) {
      console.log(`it's a hit`);

      target.hull -= this.firepower;

      console.log(`${target.identifier} has taken ${this.firepower} points of damage.`);
      console.log(`${target.identifier} has ${target.hull} hull remaining.`);
      if (target.hull > 0) {
        console.log(`${target.identifier} has ${target.hull} hull remaining.`);
      } else {
        // TARGET DESTROYED
        console.log(`${target.identifier} is vaporized.`);
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

// THE PLAYERS
const player = new PlayerShip();
const aliens = AlienShip.spawn(6);


// log what we're up against
aliens.forEach((alien, index) => {
  console.log(`alien ${index} has ${alien.hull} hull points.`);
})


console.log();
// THE BATTLE

// these first two loops would not get through all 6 battles
// because of splicing the array
// aliens.forEach((alien, index) => {
// for (let i = 0; i < aliens.length; i++) {


// this reverse order loop seems to work
for (let i = aliens.length - 1; i >= 0; i--) {
  console.log(`aliens remaining: ${aliens.length}`);
  console.log(`alien[${i}] now up. it has ${aliens[i].hull} hull points.`);
  while (player.hull > 0 && aliens[i].hull > 0) {

    // ADD OPTION TO RUN AND HIDE HERE

    player.attack(aliens[i]);
    if (aliens[i].hull > 0) {
      console.log(`alien ${i} survived`);
      aliens[i].attack(player);
    }
    else {
      console.log(`alien ${i} died`);

    }
  } // end while loop

  if (player.hull <= 0) {
    console.log('GAME OVER');
    break;
  }

  // remove dead alien from array
  aliens.splice(i, 1);

  console.log('---------------\n');
}




// console.log(new USS());
// console.log(new Alien());
// console.log(Math.random());
// console.log(Alien.spawn());
// console.log(Alien.spawn(6));


