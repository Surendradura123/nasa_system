const cache = {};

exports.setCache = (key, data, ttl = 300000) => {
  cache[key] = {
    data,
    expiry: Date.now() + ttl,
  };
};

exports.getCache = (key) => {
  const item = cache[key];

  if (!item) return null;

  if (Date.now() > item.expiry) {
    delete cache[key];
    return null;
  }

  return item.data;
};