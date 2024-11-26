const http = require('http');
const fs = require('fs');
const path = require('path');

// Function to read the students database asynchronously
const countStudents = (filePath) => new Promise((resolve, reject) => {
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      return reject(new Error('Cannot load the database'));
    }

    const lines = data.split('\n').filter((line) => line.trim() !== '');
    const students = { CS: [], SWE: [] };

    lines.slice(1).forEach((line) => {
      const [firstname, lastname, age, field] = line.split(',');

      if (field === 'CS' || field === 'SWE') {
        students[field].push(firstname);
      }
    });

    const totalStudents = lines.length - 1;
    const result = [`Number of students: ${totalStudents}`];
    Object.entries(students).forEach(([field, names]) => {
      result.push(`Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`);
    });

    resolve(result.join('\n'));
  });
});

const app = http.createServer((req, res) => {
  const { url } = req;

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

  if (url === '/') {
    res.end('Hello Holberton School!');
  } else if (url === '/students') {
    const dbPath = process.argv[2]; // Get the database file path from command line argument
    if (!dbPath) {
      res.end('Database file is missing');
      return;
    }

    countStudents(dbPath)
      .then((data) => {
        res.end(`This is the list of our students\n${data}`);
      })
      .catch((err) => {
        res.end(err.message);
      });
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

const PORT = 1245;
const HOST = 'localhost';

app.listen(PORT, HOST, () => {
  process.stdout.write(`Server listening at -> http://${HOST}:${PORT}\n`);
});

module.exports = app;
