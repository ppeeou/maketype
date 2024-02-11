import assert from "assert";
import * as makeType from "../";

describe("Number", function () {
  it("isNumber", function (done) {
    assert.equal(makeType.isNumber(5), true);
    assert.equal(makeType.isNumber(Infinity), true);
    assert.equal(makeType.isNumber(NaN), false);
    assert.equal(makeType.isNumber("5"), false);
    assert.equal(
      makeType.isNumber(function () {}),
      false
    );
    assert.equal(makeType.isNumber({}), false);
    assert.equal(makeType.isNumber([]), false);
    assert.equal(makeType.isNumber((function* () {})()), false);
    done();
  });
  it("toNumber", function (done) {
    assert.equal(makeType.toNumber(5), 5);
    assert.equal(makeType.toNumber("5"), 5);
    assert.equal(makeType.toNumber(Infinity), Infinity);
    assert.equal(makeType.toNumber(NaN), 0);
    assert.equal(
      makeType.toNumber(function () {}),
      0
    );
    assert.equal(makeType.toNumber({}), 0);
    assert.equal(makeType.toNumber([]), 0);
    done();
  });
});

describe("String", function () {
  it("isString", function (done) {
    assert.equal(makeType.isString("5"), true);
    assert.equal(makeType.isString(Infinity), false);
    assert.equal(makeType.isString(NaN), false);
    assert.equal(
      makeType.isString(function () {}),
      false
    );
    assert.equal(makeType.isString({}), false);
    assert.equal(makeType.isString([]), false);
    assert.equal(makeType.isString((function* () {})()), false);
    done();
  });
  it("toString", function (done) {
    assert.equal(makeType.toString(5), "5");
    assert.equal(makeType.toString(Infinity), "Infinity");
    assert.equal(makeType.toString(NaN), "[object Number]");
    assert.equal(makeType.toString("5"), "5");
    assert.equal(
      makeType.toString(function () {}),
      "[object Function]"
    );
    assert.equal(makeType.toString({}), "[object Object]");
    assert.equal(makeType.toString([]), "[object Array]");
    done();
  });
});

describe("Function", function () {
  it("isFunction", function (done) {
    assert.equal(makeType.isFunction("5"), false);
    assert.equal(makeType.isFunction(Infinity), false);
    assert.equal(makeType.isFunction(NaN), false);
    assert.equal(
      makeType.isFunction(function () {}),
      true
    );
    assert.equal(makeType.isFunction({}), false);
    assert.equal(makeType.isFunction([]), false);
    assert.equal(makeType.isFunction((function* () {})()), false);
    done();
  });
});

describe("Array", function () {
  it("isArray", function (done) {
    assert.equal(makeType.isArray("5"), false);
    assert.equal(makeType.isArray(Infinity), false);
    assert.equal(makeType.isArray(NaN), false);
    assert.equal(
      makeType.isArray(function () {}),
      false
    );
    assert.equal(makeType.isArray({}), false);
    assert.equal(makeType.isArray([]), true);
    assert.equal(makeType.isArray((function* () {})()), false);
    done();
  });
  it("toArray", function (done) {
    assert.ok(makeType.isArray(makeType.toArray("5")));
    assert.ok(makeType.isArray(makeType.toArray(Infinity)));
    assert.ok(makeType.isArray(makeType.toArray(NaN)));
    assert.ok(makeType.isArray(makeType.toArray(function () {})));
    assert.ok(makeType.isArray(makeType.toArray({})));
    assert.ok(makeType.isArray(makeType.toArray([])));
    assert.deepEqual(makeType.toArray("12345"), ["1", "2", "3", "4", "5"]);
    assert.deepEqual(
      makeType.toArray({ a: 1, b: 2, c: 3, d: 4, e: 5 }),
      [1, 2, 3, 4, 5]
    );
    done();
  });
});

describe("Object", function () {
  it("isObject", function (done) {
    assert.equal(makeType.isObject("5"), false);
    assert.equal(makeType.isObject(Infinity), false);
    assert.equal(makeType.isObject(NaN), false);
    assert.equal(
      makeType.isObject(function () {}),
      false
    );
    assert.equal(makeType.isObject({}), true);
    assert.equal(makeType.isObject([]), false);
    assert.equal(makeType.isObject((function* () {})()), false);
    done();
  });
});

describe("Iterable", function () {
  it("isGenerator", function (done) {
    assert.equal(makeType.isGenerator("5"), false);
    assert.equal(makeType.isGenerator(Infinity), false);
    assert.equal(makeType.isGenerator(NaN), false);
    assert.equal(
      makeType.isGenerator(function () {}),
      false
    );
    assert.equal(makeType.isGenerator({}), false);
    assert.equal(makeType.isGenerator([]), false);
    assert.equal(makeType.isGenerator((function* () {})()), true);
    done();
  });

  it("isIterable", function (done) {
    assert.equal(makeType.isIterator("5"), true);
    assert.equal(makeType.isIterator(Infinity), false);
    assert.equal(makeType.isIterator(NaN), false);
    assert.equal(
      makeType.isIterator(function () {}),
      false
    );
    assert.equal(makeType.isIterator({}), false);
    assert.equal(makeType.isIterator([]), true);
    assert.equal(makeType.isIterator((function* () {})()), true);
    done();
  });

  it("toIterator", function (done) {
    let iter = makeType.toIterator("543");
    assert.equal(iter.next().value, "5");
    assert.equal(iter.next().value, "4");
    assert.equal(iter.next().value, "3");

    iter = makeType.toIterator([1, 2, 3]);
    assert.equal(iter.next().value, 1);
    assert.equal(iter.next().value, 2);
    assert.equal(iter.next().value, 3);

    iter = makeType.toIterator(
      (function* () {
        yield 1;
        yield 2;
        yield 3;
      })()
    );
    assert.equal(iter.next().value, 1);
    assert.equal(iter.next().value, 2);
    assert.equal(iter.next().value, 3);
    done();
  });
});

describe("Promise", function () {
  it("isPromise", function (done) {
    assert.equal(makeType.isPromise("5"), false);
    assert.equal(makeType.isPromise(Infinity), false);
    assert.equal(makeType.isPromise(NaN), false);
    assert.equal(
      makeType.isPromise(function () {}),
      false
    );
    assert.equal(makeType.isPromise({}), false);
    assert.equal(makeType.isPromise([]), false);
    assert.equal(makeType.isPromise((function* () {})()), false);
    assert.equal(makeType.isPromise(Promise.resolve(5)), true);
    done();
  });

  it("toPromise(common)", function (done) {
    const add10 = (a: number, cb: Function) => cb(null, a + 10);
    const add10P = makeType.toPromise(add10);

    add10P(5)
      .then((res: any) => assert.equal(res, 15))
      .then(done);
  });

  const delay = (res: any, ok: boolean, cb: Function) =>
    setTimeout(() => (ok ? cb(null, res) : cb("error")), 1);

  const delayP = makeType.toPromise(delay);

  it("toPromise wrapper (success case)", function (done) {
    delayP(10, true)
      .then((res: any) => assert.equal(res, 10))
      .then(done);
  });

  it("toPromise wrapper (fail case)", function (done) {
    delayP(10, false)
      .catch((error: any) => assert.equal(error, "error"))
      .then(done);
  });
});
