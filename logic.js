class Car {
  constructor(make, fuel, maxSpeed) {
    // inital params required for functionality
    this.make = make;
    this.fuelAmount = fuel;
    this.maxSpeed = maxSpeed;
    this.speed = 0;
    this.engine = false;
    this.driveMode = null;
    this.speedMode = null;
    this.distance = 0;
    this.skill = 0;
    this.position = "";
  }
  // Initiate active mode and avoid double ignition
  startEngine() {
    if (this.engine) {
      return `"${this.make}" Engine is aready on!`;
    } else {
      this.engine = true;
      return `"${this.make}" Engine is on!`;
    }
  }
  // Disactivate active mode and avoid double engine turn off
  stopEngine() {
    if (this.engine) {
      this.engine = false;
      return `"${this.make}" Engine is off!`;
    } else {
      return `"${this.make}" Engine is already off!`;
    }
  }
  engineStatus() {
    return this.engine
      ? console.log(`${this.make}: Engine is on!`)
      : console.log(`${this.make}: Engine is off!`);
  }
  // Activate drive mode
  drive() {
    // if engine turned on, continue nested opretations
    if (this.engine) {
      // if fuel less 0, destroy drive mode and return reason
      if (this.fuelAmount < 0) {
        clearInterval(this.driveMode);
        return `"${this.make}" Can\'t drive, OUT OF FUEL!`;
      } else {
        // Main condition of drive mode:
        // 1. Clear possible acceleration mode
        clearInterval(this.speedMode);
        this.speedMode = null;
        // 2. Append interval and data update to driveMode
        this.driveMode = setInterval(() => {
          // 2.1 Check for fuel, in case of positive result (fuel < 0) quit driveMode
          this.fuelAmount < 0 ? clearInterval(this.driveMode) : "";
          // 2.2 Check engine mode, if true continue processing
          if (this.engine) {
            // 2.3 Increase speed
            this.speed += 1;
            // 2.4 Decrease fuel
            this.fuelAmount -= 0.1;
            // 2.5 Updata distance
            this.distance += 0.1;
            // this.skill = Math.floor(Math.random() * 9);
            // console.log(this.skill);
            // console.log(
            //   `${this.make} speed: ${this.speed}. Driver skill: ${this.skill}`
            // );
          }
        }, 1000);
        // In case of positive fuel amout notify about driveMode
        return `"${this.make}" moves.`;
      }
    } else {
      // if engine turned off, return reason
      return `"${this.make}" Can\'t drive, engine is off!`;
    }
  }
  // Accelerate mode strictly repeat driveMode conditions with
  // doubled propeties indexes
  accelerate() {
    if (this.engine) {
      if (this.fuelAmount < 0) {
        return `"${this.make}" Can\'t drive, OUT OF FUEL!`;
      } else {
        clearInterval(this.driveMode);
        this.driveMode = null;
        this.speedMode = setInterval(() => {
          this.fuelAmount < 0 ? clearInterval(this.speedMode) : "";
          this.speed += 2;
          this.fuelAmount -= 0.2;
          this.distance += 0.2;
        }, 100);
        return `"${this.make}" SPEED MODE is ON!`;
      }
    }
    return `"${this.make}" Can\'t drive, engine is off!`;
  }
  stop() {
    // if engine was set on, then terminate all possible modes, reset speed and return notification
    if (this.engine) {
      clearInterval(this.driveMode);
      clearInterval(this.speedMode);
      this.speed = 0;
      // this.skill = null;
      return `"${this.make}" stoped.`;
    } else {
      // Avoid double stop activation
      return `Engine is off! "${this.make}" is already stoped.`;
    }
  }
}

/*
  ====================
  EDITIONAL CODE FOR IMPLEMENTATION OF RACE CONDITIONS BETWEEN 2 CARS,
  CALCULATING POSITION DEPENDING ON SKILL OF EACH CAR AND DISPLAYING RESULTS   
  ====================
 */ 
// function carPosition(car1, car2) {
//   if (car1.skill == car2.skill) {
//     car2.position = "Peer";
//     car1.position = "Peer";
//     return { car1, car2 };
//   } else if (car1.skill > car2.skill) {
//     car2.position = "Second place";
//     car1.position = "First place";
//     return { car1, car2 };
//   } else if (car1.skill < car2.skill) {
//     car1.position = "Second place";
//     car2.position = "First place";
//     return { car1, car2 };
//   }
//   return { car1, car2 };
// }

// function initCars(car1, car2) {
//   car1.drive();
//   car2.drive();
//   let player1 = {
//     make: car1.make,
//     skill: car1.skill,
//     speed: car1.speed,
//     position: carPosition(car1, car2)["car1"].position
//   };
//   let player2 = {
//     make: car2.make,
//     skill: car2.skill,
//     speed: car2.speed,
//     position: carPosition(car1, car2)["car2"].position
//   };
//   // return console.log(carPosition(car1, car2)[0]);
//   return console.log(player1, player2);
// }
// initCars(audi, bmw);
// let timer = setInterval(() => initCars(audi, bmw), 1500);
// clearInterval(timer);
// setTimeout(() => {
//   audi.stop();
//   bmw.stop();
// }, 5000);
