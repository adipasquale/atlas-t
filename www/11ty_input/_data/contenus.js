const strapiApiFetch = require("../../lib/strapiApiFetch");

module.exports = async () => {
  const contenusArr = await strapiApiFetch("contenus?pagination[pageSize]=1000&populate=*")
  const contenus = {}
  contenusArr.forEach(contenu => {
    contenus[contenu.attributes.identifiant] = contenu
  })
  return contenus
}

