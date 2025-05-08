const axios = require('axios');
const NodeCache = require('node-cache');

const cache = new NodeCache({ stdTTL: 60 });

const getData = async (url, key) => {
  const cached = cache.get(key);
  if (cached) return cached;

  const res = await axios.get(url);
  cache.set(key, res.data);
  return res.data;
};

module.exports = { getData, cache };
