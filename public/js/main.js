const delay = (s => new Promise(res => setTimeout(res, s * 1000)));

const Storage = {
  set: ((key, value) => {
    localStorage.setItem(key, value);
  }),
  get: ((key) => {
    return localStorage.getItem(key);
  }),
  setMany: ((items) => {
    if (typeof items === 'object') {
      for (const [key, value] of Object.entries(items)) localStorage.setItem(key, value);
    }
  })
};