/* eslint consistent-return: "off" */
const express = require('express'); // Import the Express framework
const fs = require('fs'); // Import the File System module

const app = express(); // Create an Express application
const PORT = 1245; // Define the port for the server
const DB_FILE = process.argv.length > 2 ? process.argv[2] : ''; // Get the database file path from command-line arguments

/**
 * Reads and processes student data from a CSV file.
 * @param {string} dataPath - Path to the CSV file.
 * @returns {Promise<string>} A promise that resolves to a report of student details.
 */
const countStudents = (dataPath) => new Promise((resolve, reject) => {
  if (!dataPath) {
    return reject(new Error('Cannot load the database'));
  }

  fs.readFile(dataPath, (err, data) => {
    if (err) {
      return reject(new Error('Cannot load the database'));
    }

    if (data) {
      const reportParts = [];
      const fileLines = data.toString('utf-8').trim().split('\n');
      const studentGroups = {};
      const dbFieldNames = fileLines[0].split(',');
      const studentPropNames = dbFieldNames.slice(0, dbFieldNames.length - 1);

      // Process each line of student data
      for (const line of fileLines.slice(1)) {
        const studentRecord = line.split(',');
        const studentPropValues = studentRecord.slice(
          0,
          studentRecord.length - 1,
        );
        const field = studentRecord[studentRecord.length - 1];

        if (!studentGroups[field]) {
          studentGroups[field] = [];
        }

        const studentEntries = studentPropNames.map((propName, idx) => [
          propName,
          studentPropValues[idx],
        ]);
        studentGroups[field].push(Object.fromEntries(studentEntries));
      }

      // Generate the summary report
      const totalStudents = Object.values(studentGroups).reduce(
        (acc, group) => acc + group.length,
        0,
      );
      reportParts.push(`Number of students: ${totalStudents}`);

      for (const [field, group] of Object.entries(studentGroups)) {
        reportParts.push(
          `Number of students in ${field}: ${group.length}. List: ${group
            .map((student) => student.firstname)
            .join(', ')}`,
        );
      }

      resolve(reportParts.join('\n'));
    }
  });
});

// Define the root route
app.get('/', (_, res) => {
  res.send('Hello Holberton School!'); // Respond with a greeting message
});

// Define the /students route
app.get('/students', (_, res) => {
  const responseParts = ['This is the list of our students'];

  countStudents(DB_FILE)
    .then((report) => {
      responseParts.push(report);
      const responseText = responseParts.join('\n');
      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Content-Length', Buffer.byteLength(responseText));
      res.status(200).send(responseText);
    })
    .catch((err) => {
      responseParts.push(err.message);
      const responseText = responseParts.join('\n');
      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Content-Length', Buffer.byteLength(responseText));
      res.status(500).send(responseText);
    });
});

// Start the server and listen on the defined port
app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});

// Export the app for external use
module.exports = app;
