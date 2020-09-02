var config = {
  elements_flottants: {

  },
  navigation: {
    souris: { x: null, y: null },
    touch: { x: null, y: null },
  },
  ecran: {
    largeur: 0,
    hauteur: 0,
  },
  vitesse_maj_tuiles_visibles: 250,
  rapport_image_ecran: 6,
  scale_ext_canva: 2,
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
  nb_images_initiales: 6, 
  sources: [
    'madonna1.jpg',
    'madonna2.jpg',
    'madonna3.jpg',
    'madonna4.jpg'
  ],
  positions_images_tuiles: [
    { x: "3%", y: "4%" },
    { x: "7%", y: "15%" },
    { x: "1%", y: "75%" },
    { x: "10%", y: "35%" },
    { x: "46%", y: "20%" },
    { x: "33%", y: "45%" },
    { x: "74%", y: "64%" },
    { x: "81%", y: "92%" },
    { x: "51%", y: "52%" },
    { x: "31%", y: "72%" },
    { x: "58%", y: "82%" },
    { x: "78%", y: "2%" },
    { x: "89%", y: "72%" }
  ],
  tuiles: {
    taille: { 
      x: { valeur: 200, unite: "vw" },
      y: { valeur: 200, unite: "vh" },
    },
    liste: []
  }
}

window.onload = function () {

  // Traduire les elements texte
  init_traduction();
  init_menu();

  // Element
  let canva = document.getElementById("animation-accueil");
  config.canva = canva;

  // Dimensions animation
  let bounding = canva.getBoundingClientRect();
  config.ecran.largeur = bounding.width;
  config.ecran.hauteur = bounding.height;

  // Appliquer une transformation sur chaque image
  canva.addEventListener("wheel", translation_scroll);
  canva.addEventListener("mousedown", commencer_translation);
  canva.addEventListener("mouseup", terminer_translation);
  canva.addEventListener("touchstart", commencer_translation_touch);
  canva.addEventListener("touchend", terminer_translation_touch);

  // Creer les premieres images
  for(let i = 0; i < config.nb_images_initiales; ++i) {
    canva.appendChild(creer_image());
  }

  document.getElementById("modal").addEventListener("click", hide_modal);

  // Lancer l'animation
  window.setInterval(animer_images, config.ms_animation);
  window.setInterval(function () { 
    canva.appendChild(creer_image());
  }, config.delais_apparition_image);

  // Creer la premiere tuile
  new Tuile({x: 0, y: 0}, creer_images());

  // Mise à jour des tuiles visibles
  window.setInterval(maj_tuiles_visibles, config.vitesse_maj_tuiles_visibles);
}

function translation_scroll (ev) {
  ev.stopPropagation();
  ev.preventDefault();

  config.translate.x += Math.sign(ev.deltaX) * -1 * config.vitesse_translation;
  config.translate.y += Math.sign(ev.deltaY) * -1 * config.vitesse_translation;

  config.images.forEach((image) => { appliquer_transform_image(image); });
  config.tuiles.liste.forEach((tuile) => { appliquer_transform_tuile(tuile); });
}

function round_decimal (nb) {
  return Math.round(nb * 10) / 10;
}

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
  config.navigation.souris.x = null;
  config.navigation.souris.y = null;

  config.canva.addEventListener("mousemove", translation);
}

function commencer_translation_touch (e) {
  config.navigation.touch.x = null;
  config.navigation.touch.y = null;

  config.canva.addEventListener("touchmove", translation_touch);
}

function terminer_translation (e) {
  config.canva.removeEventListener("mousemove", translation);
}

function terminer_translation_touch (e) {
  config.canva.removeEventListener("touchmove", translation_touch);
}

function translation_touch (e) {
  e.stopPropagation();
  e.preventDefault();

  let x0 = config.navigation.touch.x;
  let y0 = config.navigation.touch.y;

  config.navigation.touch.x = e.touches[0].screenX;
  config.navigation.touch.y = e.touches[0].screenY;

  if(x0 == null && y0 == null) return;

  let delta_x = config.navigation.touch.x - x0;
  let delta_y = config.navigation.touch.y - y0;

  config.translate.x += delta_x * config.vitesse_translation;
  config.translate.y += delta_y * config.vitesse_translation;

  config.images.forEach((image) => { appliquer_transform_image(image); });
  config.tuiles.liste.forEach((tuile) => { appliquer_transform_tuile(tuile); });
}

function translation (e) {

  let x0 = config.navigation.souris.x;
  let y0 = config.navigation.souris.y;

  config.navigation.souris.x = e.clientX;
  config.navigation.souris.y = e.clientY;

  if(x0 == null && y0 == null) return;

  let delta_x = config.navigation.souris.x - x0;
  let delta_y = config.navigation.souris.y - y0;

  config.translate.x += delta_x * config.vitesse_translation;
  config.translate.y += delta_y * config.vitesse_translation;

  config.images.forEach((image) => { appliquer_transform_image(image); });
  config.tuiles.liste.forEach((tuile) => { appliquer_transform_tuile(tuile); });
}
