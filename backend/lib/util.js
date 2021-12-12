module.exports = {
  /**
   * Prepare static response JSON
   * @param {boolean} success - True or False
   * @param {object} data - Any other date to be sent. Ex:view record data
   * @param {string} message - Optional message to be sent
   * @param {object} error - Error object
   * @returns {object}
   */
  commonResponse: (success, data = "", message = "", error = "") => ({
    success: success,
    data: data,
    message: message,
    error: error,
  }),
};
