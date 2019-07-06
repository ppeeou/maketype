import isLength from './.internal/isLength';
import hasUnicode from './.internal/hasUnicode';
import asciiToArray from './.internal/asciiToArray';
import unicodeToArray from './.internal/unicodeToArray';

/**
 * @param {Mixed} val
 * @return {Boolean}
 */
export function isNumber(n) {
  if (isNaN(n)) return false;
  return typeof n === 'number' || Object.prototype.toString.call(n) == '[object Number]';
}

/**
 * @param {Mixed} val
 * @return {Number}
 * @description
 * simple
 */
export function toNumber(n) {
  if (isNaN(n)) return 0;
  if (isNumber(n)) return n;
  n = parseInt(n, 10)
  return isNaN(n) ? 0 : n;
}

export function isArrayLike(value) {
  return value != null && typeof value != 'function' && isLength(value.length)
}

/**
 * @param {Mixed} val
 * @return {Boolean}
 */
export function isString(s) {
  return typeof s === 'string';
}

/**
 * @param {Mixed} val
 * @return {string}
 * @description
 * simple
 */
export function toString(s) {
  if (isString(s)) return s;
  if (isNumber(s)) return `${s}`;
  return Object.prototype.toString.call(s);
}

export function isFunction(fn) {
  return typeof fn === 'function';
}

/**
 * @param {Mixed} val
 * @return {Boolean}
 */
export function isArray(arr) {
  if (typeof Array.isArray === "function") {
    return Array.isArray(arr);
  }
  const objectToString = Object.prototype.toString;
  const objectTaggedString = objectToString.call([]);
  return objectToString.call(arr) === objectTaggedString;
}

/**
 * @param {Mixed} val
 * @return {array}
 * @description
 * simple
 */
export function toArray(arr) {
  if (!arr) return [];
  if (isArray(arr)) return arr;
  if (isArrayLike(arr)) return hasUnicode(arr) ? unicodeToArray(arr) : asciiToArray(arr);
  if (isObject(arr)) return Object.values(arr);
  return [];
}

/**
 * @param {Mixed} val
 * @return {Boolean}
 */
export function isObject(val) {
  return Object == val.constructor;
}

/**
 * @param {Mixed} val
 * @return {Boolean}
 */
export function isGenerator(obj) {
  return 'function' == typeof obj.next && 'function' == typeof obj.throw;
}

/**
 * @param {object} obj 
 * @return {Boolean}
 */
export function isIterator(obj) {
  return !!obj && !!obj[Symbol.iterator];
}

/**
 * @param {object} obj 
 * @return {Iterator}
 */
export function toIterator(obj) {
  return isIterator(obj) ? obj[Symbol.iterator]() : function* () { };
}

/**
 * @param {object} obj 
 * @return {Boolean}
 */
export function isPromise(obj) {
  return 'function' == typeof obj.then;
}

/**
 * @param {function} fn 
 * @return {Promise}
 */
export function toPromise(fn) {
  if (isPromise(fn)) return fn;
  return (...args) => {
    return new Promise((resolve, reject) => {
      fn(...args, function (err, ...res) {
        if (err) return reject(err);
        if (res.length == 1) return resolve(res[0]);
        resolve(res);
      });
    })
  }
}
