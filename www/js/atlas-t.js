// on document ready without jquery
import PhotoSwipeLightbox from '/js/photoswipe-lightbox.esm.js';

document.addEventListener("DOMContentLoaded", function (event) {
  if (document.querySelector("a.photoswipe-item")) {
    const lightbox = new PhotoSwipeLightbox({
      gallery: 'body',
      children: 'a.photoswipe-item',
      pswpModule: () => import('/js/photoswipe.esm.js'),
      showHideAnimationType: 'none',
      zoomAnimationDuration: 0,
      preloaderDelay: 0
    });
    lightbox.init();
  }
})
