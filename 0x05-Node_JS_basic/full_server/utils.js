import fs from 'fs';

/**
 * Reads and processes student data from a CSV file.
 * @param {String} dataPath - The path to the CSV file containing student data.
 * @returns {Promise<{
 *   String: {firstname: String, lastname: String, age: number}[]
 * }>} - A promise that resolves with the processed student data grouped by a specific field.
 * @throws {Error} - Throws an error if the file cannot be read or the path is invalid.
 */
const readDatabase = (dataPath) => new Promise((resolve, reject) => {
  // Validate if dataPath is provided
  if (!dataPath) {
    return reject(new Error('Cannot load the database'));
  }

  // Read the CSV file
  fs.readFile(dataPath, (err, data) => {
    if (err) {
      return reject(new Error('Cannot load the database'));
    }
    
    // If data is available, process it
    if (data) {
      const fileLines = data
        .toString('utf-8')       // Convert buffer to string
        .trim()                 // Remove extra spaces or newlines at the beginning/end
        .split('\n');           // Split by lines
      
      const studentGroups = {};   // Object to hold grouped student data
      const dbFieldNames = fileLines[0].split(',');  // Extract field names from the first line
      const studentPropNames = dbFieldNames.slice(0, dbFieldNames.length - 1); // Student property names (excluding the last field)

      // Process each line (skip the header line)
      for (const line of fileLines.slice(1)) {
        const studentRecord = line.split(',');
        const studentPropValues = studentRecord.slice(0, studentRecord.length - 1); // Values of student properties
        const field = studentRecord[studentRecord.length - 1];  // The field (grouping key)

        // If the group does not exist, initialize it
        if (!Object.keys(studentGroups).includes(field)) {
          studentGroups[field] = [];
        }

        // Create student object with properties and values
        const studentEntries = studentPropNames
          .map((propName, idx) => [propName, studentPropValues[idx]]);
        
        // Add the student to the respective group
        studentGroups[field].push(Object.fromEntries(studentEntries));
      }

      // Resolve the promise with the grouped data
      resolve(studentGroups);
    }
  });
});

export default readDatabase;
module.exports = readDatabase;
