var config = {
  souris: { x: null, y: null },
  touch: { x: null, y: null },
  largeur_image_max: "5%",
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
    'madonna10.jpg',
    'madonna11.jpg',
    'madonna12.jpg'
  ],
  images: [],
  translate: { x: 0, y: 0 },
  vitesse_translation: 1.3,
  ms_animation: 40,
  delais_apparition_image: 1500,
  delais_suppression_image: 1000 * 30, // 30 secondes
  multiplicateur_vecteur: 3,
  positionnements: [
    { x: 0, y: 0 },
    //{ x: -1, y: -1 },
    //{ x: 0, y: -1 },
    //{ x: 1, y: -1 },
    { x: 1, y: 0 },
    { x: 1, y: 1 },
    { x: 0, y: 1 },
    //{ x: -1, y: 1 },
    { x: -1, y: 0 }
  ],
  positionnement_actuel: 0,
  nb_images_initiales: 6 
}

window.onload = function () {

  // Traduire les elements texte
  init_traduction();

  // Element
  let canva = document.getElementById("animation-lexique");
  config.canva = canva;

  // Dimensions animation
  let bounding = canva.getBoundingClientRect();
  config.largeur = bounding.width;
  config.hauteur = bounding.height;

  // Appliquer une transformation sur chaque image
  canva.addEventListener("wheel", translation_scroll);
  canva.addEventListener("mousedown", commencer_translation);
  canva.addEventListener("mouseup", terminer_translation);
  canva.addEventListener("touchstart", commencer_translation_touch);
  canva.addEventListener("touchend", terminer_translation_touch);

  // Creer la premiere tuile
  let tuile = creer_tuile();
  config.canva.appendChild(tuile);
}

function creer_tuile () {
  let tuile = document.createElement("div");

  // Info de base
  tuile.className = "tuile";
  tuile.alt = "Tuile";
  tuile.style.width = Math.round(config.largeur / config.rapport_image_ecran) + "px"
  tuile.addEventListener("click", (e) => {
    show_modal(e.target.src);
  });

  config.images_src.forEach((image) => {
    positionner_image(tuile, image);
  })

  return tuile; 
}

function creer_image (src) {
  let img = document.createElement("img");
  config.images.push(img);

  // Info de base
  img.src = "images/" + src;
  img.className = "image-flottante"
  img.alt = "Madonna";
  img.style.width = Math.round(config.largeur / config.rapport_image_ecran) + "px"
  img.addEventListener("click", (e) => {
    show_modal(e.target.src);
  });

  return img; 
}

function positionner_image (tuile, image) {
  // TODO positionner image intelligement ici (algo backtrack)
  tuile.appendChild(image);
}

function afficher_texte_imagine () { }
function afficher_texte_original () { }

function hide_modal () {
  let modal = document.getElementById("modal");
  modal.classList.remove("active");
}

function show_modal (image_url) {
  let modal = document.getElementById("modal");
  modal.classList.add("active");
  modal.querySelector("img").src = image_url;
}

function commencer_translation (e) {
  config.souris.x = null;
  config.souris.y = null;

  config.canva.addEventListener("mousemove", translation);
}

function commencer_translation_touch (e) {
  config.touch.x = null;
  config.touch.y = null;

  config.canva.addEventListener("touchmove", translation_touch);
}

function terminer_translation (e) {
  config.canva.removeEventListener("mousemove", translation);
}

function terminer_translation_touch (e) {
  config.canva.removeEventListener("touchmove", translation_touch);
}

