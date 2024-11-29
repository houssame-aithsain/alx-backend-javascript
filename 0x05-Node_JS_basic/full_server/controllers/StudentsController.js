import readDatabase from '../utils';

class StudentsController {
  /**
   * Handles the /students route.
   * @param {Object} req Request object.
   * @param {Object} res Response object.
   */
  static async getAllStudents(req, res) {
    const filePath = process.argv[2];

    try {
      const data = await readDatabase(filePath);
      const response = ['This is the list of our students'];

      Object.keys(data)
        .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))
        .forEach((field) => {
          response.push(
            `Number of students in ${field}: ${data[field].length}. List: ${data[field].join(', ')}`,
          );
        });

      res.status(200).send(response.join('\n'));
    } catch (error) {
      res.status(500).send('Cannot load the database');
    }
  }

  /**
   * Handles the /students/:major route.
   * @param {Object} req Request object.
   * @param {Object} res Response object.
   */
  static async getAllStudentsByMajor(req, res) {
    const { major } = req.params;
    const filePath = process.argv[2];

    if (major !== 'CS' && major !== 'SWE') {
      res.status(500).send('Major parameter must be CS or SWE');
      return;
    }

    try {
      const data = await readDatabase(filePath);
      const students = data[major] || [];
      res.status(200).send(`List: ${students.join(', ')}`);
    } catch (error) {
      res.status(500).send('Cannot load the database');
    }
  }
}

export default StudentsController;
