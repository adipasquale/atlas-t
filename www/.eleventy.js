const marked = require('marked')

const responsiveImageWidths = [512, 1024, 2048]
const maxResponsiveImageWidth = Math.max(...responsiveImageWidths)

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("img")
  eleventyConfig.addPassthroughCopy("js")
  eleventyConfig.addPassthroughCopy("css")
  eleventyConfig.addPassthroughCopy({
    "node_modules/photoswipe/dist/photoswipe-lightbox.esm.js": "js/photoswipe-lightbox.esm.js",
    "node_modules/photoswipe/dist/photoswipe.esm.js": "js/photoswipe.esm.js",
    "node_modules/photoswipe/dist/photoswipe.css": "css/photoswipe.css",
  })

  eleventyConfig.addShortcode("heroImg", media => {
    const { hash, ext, caption, width } = media.attributes
    const filename = `${hash}${ext}`
    const maxWidth = Math.min(width, maxResponsiveImageWidth)
    const maxHeight = maxWidth * 1

    return `
      <img
        width="${maxWidth}"
        height="${maxHeight}"
        sizes="(min-width: 50em) 50em, 100vw"
        srcset="${responsiveImageWidths.map(w => `https://res.cloudinary.com/outofscreen/image/upload/f_auto/q_auto/c_fill,ar_1,w_${w}/${filename} ${w}w`).join(", ")}"
        src="https://res.cloudinary.com/outofscreen/image/upload/f_auto/q_auto/c_fill,ar_1,w_2048/${filename}"
        alt="${caption || ""}"
      />
    `
  })

  photoswipeLink = (content, media) => {
    const { hash, ext, width, height } = media.attributes
    const filename = `${hash}${ext}`
    const maxWidth = Math.min(width, maxResponsiveImageWidth)
    const maxHeight = Math.round(maxWidth * (height / width))
    return `
      <a
        class="photoswipe-item"
        data-pswp-srcset="${responsiveImageWidths.map(w => `https://res.cloudinary.com/outofscreen/image/upload/f_auto/q_auto/c_limit,w_${w}/${filename} ${w}w`).join(", ")}"
        data-pswp-width="${maxWidth}"
        data-pswp-height="${maxHeight}"
        href="https://res.cloudinary.com/outofscreen/image/upload/f_auto/q_auto/c_limit,w_1280/${filename}">
        ${content}
      </a>
    `
  }
  eleventyConfig.addPairedShortcode("photoswipeLink", photoswipeLink)

  const cloudinaryImage = media => {
    const { hash, ext, width, caption } = media.attributes
    const filename = `${hash}${ext}`
    const maxWidth = Math.min(width, maxResponsiveImageWidth)
    const maxHeight = Math.round(maxWidth * (3 / 2))

    return `
      <img
        width="${maxWidth}"
        height="${maxHeight}"
        sizes="(min-width: 50em) 50em, 100vw"
        srcset="${responsiveImageWidths.map(w => `https://res.cloudinary.com/outofscreen/image/upload/f_auto/q_auto/c_fill,ar_2:3,w_${w}/${filename} ${w}w`).join(", ")}"
        src="https://res.cloudinary.com/outofscreen/image/upload/f_auto/q_auto/c_fill,ar_2:3,w_512/${filename}"
        alt="${caption || ""}" />
    `
  }
  eleventyConfig.addShortcode("cloudinaryImage", cloudinaryImage)

  eleventyConfig.addShortcode("galleryImage", media => {
    const { ext } = media.attributes

    if (ext == ".mp4") {
      const publicId = media.attributes.provider_metadata.public_id
      return `
        <iframe
          src="https://player.cloudinary.com/embed/?public_id=${publicId}&cloud_name=outofscreen&player[muted]=true&player[skin]=light&player[controlBar][volumePanel]=false&player[floatingWhenNotVisible]=false&player[autoplay]=true"
          allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
          style="height: auto; width: 100%; aspect-ratio: 640 / 360;"
          allowfullscreen
          frameborder="0"
        ></iframe>
      `
    } else {
      return photoswipeLink(cloudinaryImage(media), media)
    }
  })

  eleventyConfig.addFilter("markdown", function (value) {
    return marked.parse(value)
  })

  eleventyConfig.addFilter("jsonify", function (value) {
    return JSON.stringify(value)
  })

  return {
    dir: {
      input: "11ty_input",
      output: "11ty_output",
      layouts: "_layouts"
    },
    markdownTemplateEngine: "njk"
  }
}
