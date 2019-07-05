const { toPromise } = require('./index.js');


const delay = (res, ok, cb) =>
  setTimeout(() => ok ? cb(null, res) : cb('error'), 1);

const delayP = toPromise(delay);


delayP(10, false)
  .then(console.log)
  .catch(console.error)
