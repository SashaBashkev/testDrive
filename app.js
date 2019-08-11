// ====== UI VARS ======//
let init = document.querySelector(".init");
let reset = document.querySelector(".reset");
let make = document.querySelector(".make");
let fuel = document.querySelector(".fuel");
let speed = document.querySelector(".speed");
let speedMax = document.querySelector(".speedMax");
let engineOn = document.querySelector(".engineOn");
let engineOff = document.querySelector(".engineOff");
let drive = document.querySelector(".drive");
let stop = document.querySelector(".stop");
let accelerate = document.querySelector(".accelerate");
let addFuel = document.querySelector(".addFuel");
let alertInfo = document.querySelector(".alert");
let speedInfo = document.querySelector(".speedInfo");
let distanceInfo = document.querySelector(".distanceInfo");
let fuelInfo = document.querySelector(".fuelInfo");

// ====== FORM VALIDATE AND TEST INIT ======//
const initTest = () => {
  const result = formValidate();
  console.log(result);
  if (result) {
    populateCar(result);
  }
};
// Display alert message with passed paramters
const showInfo = (text, className) => {
  alertInfo.style.display = "block";
  alertInfo.classList.add(className);
  alertInfo.innerHTML = text;
  setTimeout(() => {
    alertInfo.classList.remove(className);
    alertInfo.style.display = "none";
  }, 1500);
};
/**
 * Validate form for empty values. In case of positive result
 * initiate car obj with given values and pass for further processing
 *  */

const formValidate = () => {
  if (make.value === "" || fuel.value === "" || speed.value === "") {
    showInfo("Please fill all form inputs!", "alert-danger");
    return false;
  }
  const car = {
    make: make.value,
    speed: speed.value,
    fuel: fuel.value
  };
  make.value = "";
  speed.value = "";
  fuel.value = "";
  showInfo("Car successfuly init!", "alert-success");
  return car;
};
/**
 * populateCar func distructure given obj params and creat new Car instance with implementation
 * of all required methods for that instance via events on UI buttons.
 * Native methods;
 * -- startEngine
 * -- stopEngine
 * -- drive
 * -- accelerate
 * -- stop
 *  */
const populateCar = ({ make, fuel, speed }) => {
  const newCar = new Car(make, parseInt(fuel), parseInt(speed));
  let initDrive = null;
  //UI rendering
  renderCarInfo(newCar);
  // Increment fuel amount
  addFuel.addEventListener("click", () => {
    newCar.fuelAmount += 1;
    fuelInfo.innerHTML = parseInt(newCar.fuelAmount);
  });
  // Initate engine
  engineOn.addEventListener("click", () => {
    showInfo(newCar.startEngine(), "alert-info");
  });
  // Stop engine
  engineOff.addEventListener("click", () => {
    showInfo(newCar.stopEngine(), "alert-info");
  });
  // Activate drive mode
  drive.addEventListener("click", () => {
    showInfo(newCar.drive(), "alert-info");
    // In drive mode every 1000ms newCar speed/distance/fuel recalculated and re-rendered
    initDrive = setInterval(() => {
      speedInfo.innerHTML = newCar.speed;
      distanceInfo.innerHTML = newCar.distance.toFixed(1);
      newCar.fuelAmount < 0
        ? (fuelInfo.innerHTML = 0)
        : (fuelInfo.innerHTML = newCar.fuelAmount.toFixed(1));
      checkSpeed(newCar);
      checkFuel(newCar) ? clearInterval(initDrive) : "";
    }, 1000);
  });
  // Activate stop mode and terminating drive/acceletare states
  stop.addEventListener("click", () => {
    showInfo(newCar.stop(), "alert-info");
    clearInterval(initDrive);
    speedInfo.innerHTML = newCar.speed;
    distanceInfo.innerHTML = newCar.distance.toFixed(1);
    fuelInfo.innerHTML = newCar.fuelAmount.toFixed(1);
  });
  // Activates default processes in double mode speed/fuel consumption/distance
  accelerate.addEventListener("click", () => {
    showInfo(newCar.accelerate(), "alert-danger");
    clearInterval(initDrive);
    initDrive = setInterval(() => {
      speedInfo.innerHTML = newCar.speed;
      distanceInfo.innerHTML = newCar.distance.toFixed(1);
      newCar.fuelAmount < 0
        ? (fuelInfo.innerHTML = 0)
        : (fuelInfo.innerHTML = newCar.fuelAmount.toFixed(1));
      checkSpeed(newCar);
      checkFuel(newCar) ? clearInterval(initDrive) : "";
    }, 100);
  });
};
// Comparing current and max speed
const checkSpeed = car => {
  // in case of max speed true, return fixed number of the speed
  if (car.speed >= car.maxSpeed) {
    speedInfo.classList.remove("badge-primary");
    speedInfo.classList.add("badge-danger");
    speedInfo.innerHTML = car.maxSpeed;
    return;
  } else {
    // return default speed value
    speedInfo.classList.remove("badge-danger");
    speedInfo.classList.add("badge-primary");
    speedInfo.innerHTML = car.speed;
    return;
  }
};
// Varifying for fuelAmount and in case of true, trigger drive/accelerate state termination
const checkFuel = car => {
  if (car.fuelAmount < 0) {
    showInfo(`${car.make} stoped! OUT OF FUEL!`, "alert-danger");
    speedInfo.classList.remove("badge-danger");
    speedInfo.classList.add("badge-primary");
    speedInfo.innerHTML = 0;
    car.stop();
    return true;
  }
  return false;
};
const renderCarInfo = ({ make, fuelAmount, maxSpeed }) => {
  document.querySelector(".carMake").innerHTML = `<b>${make}: </b>`;
  speedMax.innerHTML = maxSpeed;
  fuelInfo.innerHTML = fuelAmount;
};
init.addEventListener("click", initTest);
reset.addEventListener("click", () => {
  alert("Updated");
  window.location.reload();
});
