export default class HolbertonCourse {
  constructor(name, lenght, students) {
    if (typeof name !== 'string') {
      throw TypeError('Name must be a string');
    }
    if (typeof lenght !== 'number') {
      throw TypeError('Length must be a number');
    }
    this._name = name;
    this._lenght = lenght;
    this._students = students;
  }

  set name(name) {
    this._name = name;
  }

  set lenght(lenght) {
    this._lenght = lenght;
  }

  set students(students) {
    this._students = students;
  }

  get name() {
    return this._name;
  }

  get lenght() {
    return this._lenght;
  }

  get students() {
    return this._students;
  }
}
