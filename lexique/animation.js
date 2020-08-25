var config = {
  souris: { x: null, y: null },
  touch: { x: null, y: null },
  largeur_image_max: "5%",
  sources: [
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
  tuiles: {
    taille: { x: 300, y: 300 },
    positions: [
      { x: "1%", y: "2%" },
      { x: "10%", y: "20%" },
      { x: "1%", y: "2%" },
      { x: "1%", y: "2%" },
      { x: "1%", y: "2%" },
      { x: "1%", y: "2%" },
      { x: "1%", y: "2%" },
    ],
    liste: []
  },
  translate: { x: 0, y: 0 },
  vitesse_translation: 1.3,
  positionnement_actuel: 0
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
  /*
  canva.addEventListener("wheel", translation_scroll);
  canva.addEventListener("mousedown", commencer_translation);
  canva.addEventListener("mouseup", terminer_translation);
  canva.addEventListener("touchstart", commencer_translation_touch);
  canva.addEventListener("touchend", terminer_translation_touch);
  */

  // Creer la premiere tuile
  let tuile = creer_tuile();
  config.canva.appendChild(tuile);

  let style = document.createElement("style");
  style.innerHTML = " .tuile { " 
    + "width:" + config.tuiles.taille.x + "px;"
    + "height:" + config.tuiles.taille.y + "px;"
    + " }";

  document.body.appendChild(style);
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

  positionner_images(tuile);

  return tuile; 
}

function creer_image (src, position) {
  let img = document.createElement("img");

  // Info de base
  img.src = "../images/" + src;
  img.className = "image-flottante"
  img.alt = "Madonna";

  img.style.width = Math.round(config.largeur / config.rapport_image_ecran) + "px";
  img.style.left = position.x;
  img.style.top = position.y;

  img.addEventListener("click", (e) => {
    show_modal(e.target.src);
  });

  return img; 
}

// Utiliser algo backtrack?
function positionner_images (tuile) {

  let positions = deep_copy(config.tuiles.positions);
  let sources = deep_copy(config.sources);

  while(positions.length > 0 && sources.length > 0) {
    console.log(sources, positions);
    let position = positions.pop();
    let image = creer_image(sources.pop(), position);

    tuile.appendChild(image);
  }
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

function overlap (rect1, rect2) {
  return !(rect1.right < rect2.left 
    || rect1.left > rect2.right 
    || rect1.bottom < rect2.top 
    || rect1.top > rect2.bottom);
}

function deep_copy (obj) { return JSON.parse(JSON.stringify(obj)); }
