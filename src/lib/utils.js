export function asyncCatch(promise, finallyFunc) {
  return promise.then(res => [null, res])
      .catch(err => {
        // if (err.name === 'AbortError') return Promise.resolve([null, null]);
        return [err, null];
      })
      .finally(finallyFunc);
}