const strapiApiFetch = require("../../lib/strapiApiFetch");

module.exports = async () =>
  await strapiApiFetch(`projets?populate=*&pagination[pageSize]=1000`)
