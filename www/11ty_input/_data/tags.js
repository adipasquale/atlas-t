const strapiApiFetch = require("../../lib/strapiApiFetch");
const getProjets = require("./projets")

module.exports = async () => {
  const allProjets = (await getProjets())
    .map(projet => ({ ...projet, allMediaIds: projet.attributes.medias.data.map(m => m.id) }))
    .map(projet => ({ id: projet.id, ...projet.attributes, allMediaIds: projet.allMediaIds }))
  const tags = (await strapiApiFetch(`tags?populate=*&pagination[pageSize]=1000`))
    .map(tag => {
      const projets = []
      tag.attributes.medias.data?.forEach(media => {
        const mediaProjet = allProjets.find(projet => projet.allMediaIds.includes(media.id))
        let projet = projets.find(tpm => tpm.id === mediaProjet.id)
        if (!projet) {
          projet = { ...mediaProjet, medias: [] }
          projets.push(projet)
        }
        projet.medias.push(media)
      })
      delete tag.attributes.medias
      return { ...tag, projets }
    })
  return tags
}
