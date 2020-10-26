var config = {
  ecran: {
    largeur: 0,
    hauteur: 0
  },
  souris: { x: null, y: null },
  touch: { x: null, y: null },
  vitesse_translation: 1.3,
  temps_apparition_definition: 12500,
  positions_images_tuiles: [
    { x: "3%", y: "4%" },
    { x: "7%", y: "15%" },
    { x: "1%", y: "75%" },
    { x: "10%", y: "35%" },
    { x: "46%", y: "20%" },
    { x: "33%", y: "45%" },
    { x: "74%", y: "64%" },
    { x: "14%", y: "100%" },
    { x: "51%", y: "52%" },
    { x: "31%", y: "72%" },
    { x: "58%", y: "82%" },
    { x: "78%", y: "2%" },
    { x: "90%", y: "39%" },
    { x: "70%", y: "34%" },
    { x: "100%", y: "0%" },
    { x: "15%", y: "72%" }
  ],
  tuiles: {
    vitesse_maj_tuiles_visibles: 250,
    translate: { x: 0, y: 0 },
    taille: { 
      x: { valeur: 200, unite: "vw" },
      y: { valeur: 200, unite: "vh" },
    },
    sources: [
      '/images/lexique/apnee.png',
      '/images/lexique/breches.png',
      '/images/lexique/chambouler.png',
      '/images/lexique/faire_peut.png',
      '/images/lexique/jamais_travailler.png',
      '/images/lexique/jouer_adultes.png',
      '/images/lexique/montagne.png',
      '/images/lexique/presence.png',
      '/images/lexique/regarder_maison.png',
      '/images/lexique/se_refugier.png',
      '/images/lexique/mistifi.png',
      '/images/lexique/inverser.png',
      '/images/lexique/egal.png'
    ],
    liste: []
  }
}

window.onload = function () {

  // Traduire les elements texte
  init_menu();
  init_traduction();
  config.textes = traiter_textes();

  // Element
  let canva = document.getElementById("animation-lexique");
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

  // Creer la premiere tuile
  new Tuile({x: 0, y: 0}, creer_images());

  // Mise à jour des tuiles visibles
  window.setInterval( maj_tuiles_visibles, config.tuiles.vitesse_maj_tuiles_visibles);
}

function afficher_definition_interpretation (src_image, texte) {
  let modal = document.getElementById("modal-interpretation");

  // Afficher les definitions
  modal.style.display = "block";
  modal.querySelector("p").innerHTML = texte;
  window.setTimeout(function () {
    modal.style.opacity = "1";
  }, 10);
}

function cacher_definition_interpretation () {

  let modal = document.getElementById("modal-interpretation");
  modal.style.opacity = "0";
  window.setTimeout(function () {
    modal.style.display = "none";
    
    // Afficher les tuiles
    [].forEach.call(document.querySelectorAll(".image-flottante"), (image) => {
      image.style.opacity = "1";
    });

  }, 2000);

}

function afficher_definition_officielle (src_image, texte, element) {

  // Cacher les tuiles
  [].forEach.call(document.querySelectorAll(".image-flottante"), (image) => {
    image.style.opacity = "0";
  });
  element.style.opacity = "1";

  let rect = element.getBoundingClientRect();
  let modal_officiel = document.getElementById("modal-officiel");
  let modal_interpretation = document.getElementById("modal-interpretation");

  if(rect.left + rect.width / 2 > window.innerWidth / 2) {
    modal_officiel.style.left = (rect.left - 350) + "px";
    modal_interpretation.style.left = (rect.x - 350) + "px";
  }
  else {
    modal_officiel.style.left = (rect.left + rect.width + 25) + "px";
    modal_interpretation.style.left = (rect.left + rect.width + 25) + "px";
  }

  if(rect.top + rect.height / 2 > window.innerHeight / 2) {
    modal_officiel.style.top = (rect.top - 20) + "px";
    modal_interpretation.style.top = (rect.y - 20) + "px";
  }
  else {
    modal_officiel.style.top = (rect.top + rect.height) + "px";
    modal_interpretation.style.top = (rect.top + rect.height) + "px";
  }

  modal_officiel.style.display = "block";
  modal_officiel.querySelector("p").innerHTML = texte;
  window.setTimeout(function () {
    modal_officiel.style.opacity = "1";
  }, 0);
}

function cacher_definition_officielle () {

  let modal = document.getElementById("modal-officiel");
  modal.style.opacity = "0";
  window.setTimeout(function () {
    modal.style.display = "none";
  }, 2000);
}

function commencer_translation (e) {
  e.stopPropagation();
  e.preventDefault();

  config.souris.x = null;
  config.souris.y = null;

  config.canva.addEventListener("mousemove", translation);
}

function commencer_translation_touch (e) {
  e.stopPropagation();
  e.preventDefault();

  config.touch.x = null;
  config.touch.y = null;

  config.canva.addEventListener("touchmove", translation_touch);
}

function terminer_translation (e) {
  e.stopPropagation();
  e.preventDefault();

  config.canva.removeEventListener("mousemove", translation);
}

function terminer_translation_touch (e) {
  e.stopPropagation();
  e.preventDefault();

  config.canva.removeEventListener("touchmove", translation_touch);
}

function translation_touch (e) {
  e.stopPropagation();
  e.preventDefault();

  let x0 = config.touch.x;
  let y0 = config.touch.y;

  config.touch.x = e.touches[0].screenX;
  config.touch.y = e.touches[0].screenY;

  if(x0 == null && y0 == null) return;

  let delta_x = config.touch.x - x0;
  let delta_y = config.touch.y - y0;

  config.tuiles.translate.x += delta_x * config.vitesse_translation;
  config.tuiles.translate.y += delta_y * config.vitesse_translation;

  config.tuiles.liste.forEach((tuile) => { appliquer_transform_tuile(tuile); });
}

function translation (e) {
  e.stopPropagation();
  e.preventDefault();

  let x0 = config.souris.x;
  let y0 = config.souris.y;

  config.souris.x = e.clientX;
  config.souris.y = e.clientY;

  if(x0 == null && y0 == null) return;

  let delta_x = config.souris.x - x0;
  let delta_y = config.souris.y - y0;

  config.tuiles.translate.x += delta_x * config.vitesse_translation;
  config.tuiles.translate.y += delta_y * config.vitesse_translation;

  config.tuiles.liste.forEach((tuile) => { appliquer_transform_tuile(tuile); });
}

function translation_scroll (ev) {
  ev.stopPropagation();
  ev.preventDefault();

  config.tuiles.translate.x += Math.sign(ev.deltaX) * -1 * config.vitesse_translation * 3;
  config.tuiles.translate.y += Math.sign(ev.deltaY) * -1 * config.vitesse_translation * 3;

  config.tuiles.liste.forEach((image) => { appliquer_transform_tuile(image); });
} 
