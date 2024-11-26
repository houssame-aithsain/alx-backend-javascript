const express = require('express'); // Import the Express module
const fs = require('fs');
// Import the File System module
const app = express(); // Create an Express application

/**
 * Counts the students in a CSV file.
 * @param {string} dataPath The path to the CSV data file.
 * @returns {Promise<string>} A promise that resolves to a report string.
 */
const countStudents = (dataPath) => new Promise((resolve, reject) => {
  if (!dataPath) {
    reject(new Error('Cannot load the database'));
  }

  fs.readFile(dataPath, 'utf-8', (err, data) => {
    if (err) {
      reject(new Error('Cannot load the database'));
    } else {
      const reportParts = ['This is the list of our students'];
      const fileLines = data.split('\n').filter((line) => line.trim() !== ''); // Filter empty lines
      const studentGroups = {};
      const dbFieldNames = fileLines[0].split(','); // Assumes the first row is the header
      const studentPropNames = dbFieldNames.slice(0, dbFieldNames.length - 1);

      for (const line of fileLines.slice(1)) {
        const studentRecord = line.split(',');
        const studentPropValues = studentRecord.slice(0, studentRecord.length - 1);
        const field = studentRecord[studentRecord.length - 1];

        if (!Object.keys(studentGroups).includes(field)) {
          studentGroups[field] = [];
        }

        const studentEntries = studentPropNames.map((propName, idx) => [
          propName,
          studentPropValues[idx],
        ]);

        studentGroups[field].push(Object.fromEntries(studentEntries));
      }

      const totalStudents = Object.values(studentGroups).reduce((pre,
        cur) => (pre || []).length + cur.length);
      reportParts.push(`Number of students: ${totalStudents}`);

      // Create a report of students in each group
      for (const [field, group] of Object.entries(studentGroups)) {
        reportParts.push(
          `Number of students in ${field}: ${group.length}. List: ${group.map((student) => student.firstname).join(', ')}`,
        );
      }

      resolve(reportParts.join('\n')); // Return the final report
    }
  });
});

// Define the root route
app.get('/', (req, res) => {
  res.send('Hello Holberton School!'); // Respond with the message
});

// Define the students route
app.get('/students', (req, res) => {
  const dbFile = process.argv[2]; // Get the database file from the command-line argument

  countStudents(dbFile)
    .then((report) => {
      res.setHeader('Content-Type', 'text/plain');
      res.statusCode = 200;
      res.send(report); // Send the students report
    })
    .catch((err) => {
      res.setHeader('Content-Type', 'text/plain');
      res.statusCode = 500;
      res.send(`Error: ${err.message}`); // Handle errors
    });
});

// Start the server on port 1245
app.listen(1245, () => {
  console.log('Server listening on port 1245');
});

// Export the app for testing purposes
module.exports = app;
