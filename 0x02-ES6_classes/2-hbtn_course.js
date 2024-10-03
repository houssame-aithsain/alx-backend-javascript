export default class HolbertonCourse {
  constructor(name, length, students) {
    if (typeof name !== 'string') {
      throw new TypeError('Name must be a string');
    }
    if ((typeof length !== 'number') && !(length instanceof Number)) {
      throw new TypeError('Length must be a number');
    }
    if (!(students instanceof Array)) {
      throw new TypeError('students must be an array of strings');
    }
    this._name = name;
    this._lenght = length;
    this._students = students;
  }

  set name(name) {
    if (typeof name !== 'string') {
      throw new TypeError('Name must be a string');
    }
    this._name = name;
  }

  set length(length) {
    if ((typeof length !== 'number') && !(length instanceof Number)) {
      throw new TypeError('Length must be a number');
    }
    this._length = length;
  }

  set students(students) {
    if (!(students instanceof Array)) {
      throw new TypeError('students must be an array of strings');
    }
    this._students = students;
  }

  get name() {
    return this._name;
  }

  get length() {
    return this._lenght;
  }

  get students() {
    return this._students;
  }
}
