import isLength from "./.internal/isLength";
import hasUnicode from "./.internal/hasUnicode";
import asciiToArray from "./.internal/asciiToArray";
import unicodeToArray from "./.internal/unicodeToArray";

export function isNumber(n: any): n is number {
  if (isNaN(n)) return false;
  return (
    typeof n === "number" ||
    Object.prototype.toString.call(n) == "[object Number]"
  );
}

export function toNumber(n: any): number {
  if (isNaN(n)) return 0;
  if (isNumber(n)) return n;
  n = parseInt(n, 10);
  return isNaN(n) ? 0 : n;
}

export function isArrayLike(value: any): boolean {
  return value != null && typeof value != "function" && isLength(value.length);
}

export function isString(s: any): s is string {
  return typeof s === "string";
}

export function toString(s: any): string {
  if (isString(s)) return s;
  if (isNumber(s)) return `${s}`;
  return Object.prototype.toString.call(s);
}

export function isFunction(fn: any): fn is Function {
  return typeof fn === "function";
}

export function isArray(arr: any): boolean {
  if (typeof Array.isArray === "function") {
    return Array.isArray(arr);
  }
  const objectToString = Object.prototype.toString;
  const objectTaggedString = objectToString.call([]);
  return objectToString.call(arr) === objectTaggedString;
}

export function toArray<T>(arr: any): T[] {
  if (!arr) return [];
  if (isArray(arr)) return arr;
  if (isArrayLike(arr))
    return (hasUnicode(arr) ? unicodeToArray(arr) : asciiToArray(arr)) as any[];
  if (isObject(arr)) return Object.values(arr);
  return [];
}

export function isObject(val: any): boolean {
  return Object == val.constructor;
}

export function isGenerator(obj: any): boolean {
  return "function" == typeof obj.next && "function" == typeof obj.throw;
}

export function isIterator(obj: any): boolean {
  return !!obj && !!obj[Symbol.iterator];
}

export function toIterator<T>(obj: any): Iterable<T> {
  return isIterator(obj) ? obj[Symbol.iterator]() : function* () {};
}

export function isPromise(obj: any): boolean {
  return "function" == typeof obj.then;
}

export function toPromise<T>(fn: any): (...any: any[]) => Promise<T> {
  if (isPromise(fn)) return fn;
  return (...args: any[]) => {
    return new Promise<T>((resolve, reject) => {
      fn(...args, function (err: any, ...res: any[]) {
        if (err) return reject(err);
        if (res.length == 1) return resolve(res[0]);
        resolve(res as T);
      });
    });
  };
}
