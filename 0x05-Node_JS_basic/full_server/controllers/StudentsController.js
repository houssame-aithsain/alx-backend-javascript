import readDatabase from '../utils';

/**
 * List of valid majors supported by the system.
 * @constant
 */
const VALID_MAJORS = ['CS', 'SWE'];

/**
 * Class handling student-related route actions.
 */
class StudentsController {
  /**
   * Retrieves and displays all students, grouped by their respective fields.
   * @param {Object} request - The request object.
   * @param {Object} response - The response object.
   */
  static getAllStudents(request, response) {
    const dataPath = process.argv.length > 2 ? process.argv[2] : '';

    readDatabase(dataPath)
      .then((studentGroups) => {
        const responseParts = ['This is the list of our students'];

        // Comparison function for sorting strings in ascending alphabetical
        const cmpFxn = (a, b) => {
          if (a[0].toLowerCase() < b[0].toLowerCase()) {
            return -1;
          }
          if (a[0].toLowerCase() > b[0].toLowerCase()) {
            return 1;
          }
          return 0;
        };

        // Iterate through each group, sorted by field, and build the response string
        for (const [field, group] of Object.entries(studentGroups).sort(cmpFxn)) {
          responseParts.push([
            `Number of students in ${field}: ${group.length}.`,
            'List:',
            group.map((student) => student.firstname).join(', '),
          ].join(' '));
        }

        // Send the response with a 200 status code
        response.status(200).send(responseParts.join('\n'));
      })
      .catch((err) => {
        // If an error occurs, respond with a 500 status code and the error message
        response
          .status(500)
          .send(err instanceof Error ? err.message : err.toString());
      });
  }

  /**
   * Retrieves and displays students filtered by their major.
   * @param {Object} request - The request object.
   * @param {Object} response - The response object.
   */
  static getAllStudentsByMajor(request, response) {
    const dataPath = process.argv.length > 2 ? process.argv[2] : '';
    const { major } = request.params;

    // Validate if the provided major is valid
    if (!VALID_MAJORS.includes(major)) {
      response.status(500).send('Major parameter must be CS or SWE');
      return;
    }

    // Retrieve the student data and filter by major
    readDatabase(dataPath)
      .then((studentGroups) => {
        let responseText = '';

        // If the major group exists, list the students in that major
        if (Object.keys(studentGroups).includes(major)) {
          const group = studentGroups[major];
          responseText = `List: ${group.map((student) => student.firstname).join(', ')}`;
        }

        // Send the response with a 200 status code
        response.status(200).send(responseText);
      })
      .catch((err) => {
        // If an error occurs, respond with a 500 status code and the error message
        response
          .status(500)
          .send(err instanceof Error ? err.message : err.toString());
      });
  }
}

export default StudentsController;
module.exports = StudentsController;
