"use strict";

const Promise = require(`bluebird`);

const fs = require(`fs-extra`);

const _ = require(`lodash`);

const objectToMap = obj => new Map(Object.entries(obj));

const mapToObject = map => {
  const obj = {};

  for (var _iterator = map, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
    var _ref;

    if (_isArray) {
      if (_i >= _iterator.length) break;
      _ref = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) break;
      _ref = _i.value;
    }

    let _ref2 = _ref,
        key = _ref2[0],
        value = _ref2[1];
    obj[key] = value;
  }

  return obj;
};

let db;
let directory;
let save;
/**
 * Initialize cache store. Reuse existing store if available.
 */

exports.initCache = () => {
  fs.ensureDirSync(`${process.cwd()}/.cache/cache`);

  if (process.env.NODE_ENV === `test`) {
    directory = require(`os`).tmpdir();
  } else {
    directory = process.cwd() + `/.cache/cache`;
  }

  let previousState;

  try {
    previousState = JSON.parse(fs.readFileSync(`${directory}/db.json`));
  } catch (e) {// ignore
  }

  if (previousState) {
    db = objectToMap(previousState);
  } else {
    db = new Map();
  }
};
/**
 * Get value of key
 * @param key
 * @returns {Promise}
 */


exports.get = key => new Promise((resolve, reject) => {
  resolve(db.get(key));
});
/**
 * Create or update key with value
 * @param key
 * @param value
 * @returns {Promise} - Promise object which resolves to 'Ok' if successful.
 */


exports.set = (key, value) => new Promise((resolve, reject) => {
  db.set(key, value);
  save();
  resolve(`Ok`);
});

if (process.env.NODE_ENV !== `test`) {
  save = _.debounce(() => {
    fs.writeFile(`${directory}/db.json`, JSON.stringify(mapToObject(db)));
  }, 250);
} else {
  save = _.noop;
}
//# sourceMappingURL=cache.js.map