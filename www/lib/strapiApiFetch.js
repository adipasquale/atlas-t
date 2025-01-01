require('dotenv').config()
const EleventyFetch = require("@11ty/eleventy-fetch");

module.exports = async (path) => {
  let url = `https://atlas-t-strapi.fly.dev/api/${path}`;

  const res = await EleventyFetch(url, {
    duration: "0m",
    type: "json",
    fetchOptions: {
      headers: {
        Authorization: `bearer ${process.env.STRAPI_API_TOKEN}`
      }
    }
  });
  return res.data;
};
