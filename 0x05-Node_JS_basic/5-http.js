/* eslint consistent-return: "off" */
const http = require('http');
const fs = require('fs');

const PORT = 1245;
const HOST = 'localhost';
const app = http.createServer();
const DB_FILE = process.argv.length > 2 ? process.argv[2] : ''; // Fetch the database file path from the command-line argument

/**
 * Parses the CSV file and generates a report of students grouped by their field of study.
 * @param {String} dataPath - The path to the CSV file containing student data.
 * @returns {Promise<String>} A promise that resolves with the formatted student report.
 */
const countStudents = (dataPath) => new Promise((resolve, reject) => {
  if (!dataPath) {
    return reject(new Error('Cannot load the database')); // Error if no database file is provided
  }

  fs.readFile(dataPath, (err, data) => {
    if (err) {
      return reject(new Error('Cannot load the database')); // Error handling for file read failure
    }

    const reportParts = [];
    const fileLines = data.toString('utf-8').trim().split('\n'); // Split the file into lines
    const studentGroups = {}; // Object to group students by their field of study
    const dbFieldNames = fileLines[0].split(','); // Extract field names (columns) from the header row
    const studentPropNames = dbFieldNames.slice(0, dbFieldNames.length - 1);

    // Iterate through each student record and group them by their field of study
    for (const line of fileLines.slice(1)) {
      const studentRecord = line.split(','); // Split the record into individual values
      const studentPropValues = studentRecord.slice(0, studentRecord.length - 1);
      const field = studentRecord[studentRecord.length - 1]; // Field of study (last item)

      if (!studentGroups[field]) {
        studentGroups[field] = []; // Initialize an empty array for the field if it doesn't exist
      }

      const studentEntries = studentPropNames.map((propName, idx) => [
        propName, studentPropValues[idx], // Pair each property with its corresponding value
      ]);

      // Add the student record to the corresponding field group
      studentGroups[field].push(Object.fromEntries(studentEntries));
    }

    // Calculate the total number of students and generate the report
    const totalStudents = Object.values(studentGroups).reduce(
      (acc, group) => acc + group.length, 0, // Sum the total students across all fields
    );
    reportParts.push(`Number of students: ${totalStudents}`);

    // Generate a detailed report for each field
    for (const [field, group] of Object.entries(studentGroups)) {
      reportParts.push(
        `Number of students in ${field}: ${group.length}. List: ${group.map((student) => student.firstname).join(', ')}`,
      );
    }

    resolve(reportParts.join('\n')); // Return the formatted report as a string
  });
});

/**
 * Route handlers for the HTTP server.
 * Each route handler responds to different HTTP endpoints.
 */
const SERVER_ROUTE_HANDLERS = [
  {
    route: '/',
    handler(_, res) {
      const responseText = 'Hello Holberton School!';
      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Content-Length', responseText.length);
      res.statusCode = 200;
      res.write(Buffer.from(responseText)); // Send the greeting message as response
      return res.end(); // Explicitly return the response (fix for consistent-return error)
    },
  },
  {
    route: '/students',
    handler(_, res) {
      const responseParts = ['This is the list of our students'];

      countStudents(DB_FILE)
        .then((report) => {
          responseParts.push(report); // Append the student report to the response
          const responseText = responseParts.join('\n');
          res.setHeader('Content-Type', 'text/plain');
          res.setHeader('Content-Length', responseText.length);
          res.statusCode = 200;
          res.write(Buffer.from(responseText)); // Send the report as response
          return res.end(); // Explicitly return the response (fix for consistent-return error)
        })
        .catch((err) => {
          responseParts.push(err instanceof Error ? err.message : err.toString());
          const responseText = responseParts.join('\n');
          res.setHeader('Content-Type', 'text/plain');
          res.setHeader('Content-Length', responseText.length);
          res.statusCode = 500; // Changed to 500 for server-side errors
          res.write(Buffer.from(responseText)); // Send the error message as response
          return res.end(); // Explicitly return the response (fix for consistent-return error)
        });
    },
  },
];

/**
 * HTTP server request handler.
 * Matches the incoming request URL with predefined routes and delegates to corresponding handlers.
 */
app.on('request', (req, res) => {
  for (const routeHandler of SERVER_ROUTE_HANDLERS) {
    if (routeHandler.route === req.url) {
      routeHandler.handler(req, res); // Delegate to the corresponding handler if route matches
      break;
    }
  }
});

/**
 * Start the server and listen on the specified port and host.
 */
app.listen(PORT, HOST, () => {
  process.stdout.write(`Server listening at -> http://${HOST}:${PORT}\n`);
});

module.exports = app;
