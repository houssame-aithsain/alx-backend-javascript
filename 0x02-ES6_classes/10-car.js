const cloneSymbol = Symbol('cloneCar');

class Car {
  constructor(brand, motor, color) {
    this._brand = brand;
    this._motor = motor;
    this._color = color;
  }

  [cloneSymbol]() {
    return new this.constructor();
  }

  cloneCar() {
    return this[cloneSymbol]();
  }
}

export default Car;
