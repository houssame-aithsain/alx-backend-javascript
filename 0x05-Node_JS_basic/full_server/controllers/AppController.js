class AppController {
  /**
     * Handles the homepage route.
     * @param {Object} req Request object.
     * @param {Object} res Response object.
     */
  static getHomepage(req, res) {
    res.status(200).send('Hello Holberton School!');
  }
}

export default AppController;
