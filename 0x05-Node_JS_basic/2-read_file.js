// 2-read_file.js
const fs = require('fs');

function countStudents(path) {
  try {
    const data = fs.readFileSync(path, 'utf8'); // Read file synchronously
    const lines = data.split('\n').filter(line => line.trim() !== '');
    
    const students = {};
    let totalStudents = 0;
    
    lines.forEach((line, index) => {
      if (index === 0) return; // Skip header line
      const [firstName, lastName, age, field] = line.split(',');
      
      if (!firstName || !lastName || !field) return; // Skip incomplete records

      totalStudents++;

      if (!students[field]) {
        students[field] = [];
      }
      students[field].push(firstName);
    });

    console.log(`Number of students: ${totalStudents}`);

    Object.keys(students).forEach(field => {
      console.log(`Number of students in ${field}: ${students[field].length}. List: ${students[field].join(', ')}`);
    });
  } catch (err) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
