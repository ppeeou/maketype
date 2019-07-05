// refs https://github.com/lodash/lodash/blob/master/.internal/asciiToArray.js
/**
 * Converts an ASCII `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function asciiToArray(string) {
  return string.split('')
}

export default asciiToArray;