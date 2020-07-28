var config = {
  images_src: [
    'madonna1.jpg',
    'madonna2.jpg',
    'madonna3.jpg',
    'madonna4.jpg',
    'madonna5.jpg',
    'madonna6.jpg',
    'madonna7.jpg',
    'madonna8.jpg',
    'madonna9.jpg',
    'madonna10.jpg'
  ],
  images: [],
  translate: {
    x: 0,
    y: 0
  },
  vitesse_translation: 1.3
}

window.onload = function () {

  config.canva = document.getElementById("animation-accueil");
  config.bounding_rect_animation = config.canva.getBoundingClientRect();

  // Appliquer une transformation sur chaque image
  config.canva.addEventListener("wheel", translation_images);

  // Creer les premieres images
  let image = creer_image();
  positionner_image(image, generer_coordonnees_source());
  config.canva.appendChild(image);
}

function translation_images (ev) {
  ev.stopPropagation();
  ev.preventDefault();

  config.translate.x += Math.sign(ev.deltaX) * config.vitesse_translation;
  config.translate.y += Math.sign(ev.deltaY) * config.vitesse_translation;

  config.images.forEach((image) => {
    image.style.transform = "translate(" + config.translate.x + "px, " + config.translate.y + "px)"
  });
}

function positionner_image (image, coordonnes) {
  image.style.top = coordonnes.y + "px";
  image.style.left = coordonnes.x + "px";
}

function creer_image () {
  let img = document.createElement("img");
  img.src = "images/" + src_image_aleatoire();
  img.className = "image-flottante"
  img.alt = "Madonna";

  config.images.push(img);

  return img; 
}

function src_image_aleatoire () {
  let index = Math.round(Math.random() * (config.images_src.length - 1));
  return config.images_src[index];
}

function generer_coordonnees_source (x0, y0) {
  return {
    x: 10,
    y: 10
  }
}
