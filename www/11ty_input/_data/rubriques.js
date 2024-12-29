const strapiApiFetch = require("../../lib/strapiApiFetch");

module.exports = async () =>
  await strapiApiFetch(`rubriques?populate=*&pagination[pageSize]=1000`)
