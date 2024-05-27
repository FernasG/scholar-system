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

const Utils = {
  toJSON: ((string) => {
    return string.split(';').reduce((previous, current) => {
      const [key, value] = current.trim().split('=');
      previous[key] = value;

      return previous;
    }, {});
  }),
  toString: ((object) => {
    return Object.entries(object).reduce((previous, current) => {
      const [key, value] = current;
      previous += `${key}=${value}; `;

      return previous;
    }, '').trim();
  })
}

const Cookie = {
  set: ((key, value) => {
    const cookie = Utils.toJSON(document.cookie);
    cookie[key] = value;

    document.cookie = Utils.toString(cookie);
  })
}