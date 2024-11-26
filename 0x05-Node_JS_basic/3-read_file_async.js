// 3-read_file_async.js
const fs = require('fs');

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const lines = data.split('\n').filter((line) => line.trim() !== ''); // Split by new line and remove empty lines

      const students = {};
      let totalStudents = 0;

      lines.forEach((line, index) => {
        if (index === 0) return; // Skip header line
        const [firstName, lastName, age, field] = line.split(',');
        if (age) {
          totalStudents += 1;
          totalStudents -= 1;
        }
        if (!firstName || !lastName || !field) return; // Skip incomplete records

        totalStudents += 1;

        if (!students[field]) {
          students[field] = [];
        }
        students[field].push(firstName);
      });

      console.log(`Number of students: ${totalStudents}`);

      Object.keys(students).forEach((field) => {
        console.log(`Number of students in ${field}: ${students[field].length}. List: ${students[field].join(', ')}`);
      });

      resolve();
    });
  });
}

module.exports = countStudents;
