var config = {
  frame_rate: 30,
  images: {
    nb_t0 : 9,
    liste: [],
    parametres: {
      translate: { x: 0, y: 0 },
      interval_apparition_image: 1000,
      delais_suppression_image: 1000 * 450, // 30 secondes
      multiplicateur_vecteur_translation: 0.7,
      multiplicateur_vecteur_rotation: 0.2 
    },
    positionnements: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 0, y: 1 },
      { x: -1, y: 1 },
      { x: -1, y: 0 },
      { x: -1, y: -1 },
      { x: 0, y: -1 },
      { x: 1, y: -1 }
    ],
    sources: [
      '/images/accueil/flottantes_doc_labo/atelier_causerie_02.jpg',
      '/images/accueil/flottantes_doc_labo/atelier_causerie_03.jpg',
      '/images/accueil/flottantes_doc_labo/constat_01.jpg',
      '/images/accueil/flottantes_doc_labo/constat_02.jpg',
      '/images/accueil/flottantes_doc_labo/constat_03.jpg',
      '/images/accueil/flottantes_doc_labo/constat_04.jpg',
      '/images/accueil/flottantes_doc_labo/constat_05.jpg',
      '/images/accueil/flottantes_doc_labo/constat_06.jpg',
      '/images/accueil/flottantes_doc_labo/constat_08.jpg',
      '/images/accueil/flottantes_doc_labo/la_realite_image_fixe001.jpg',
      '/images/accueil/flottantes_doc_labo/la_realite_image_fixe003.jpg',
      '/images/accueil/flottantes_doc_labo/la_realite_image_fixe006.jpg',
      '/images/accueil/flottantes_doc_labo/la_realite_image_fixe007.jpg',
      '/images/accueil/flottantes_doc_labo/la_realite_image_fixe008.jpg',
      '/images/accueil/flottantes_doc_labo/la_realite_image_fixe009.jpg',
      '/images/accueil/flottantes_doc_labo/la_realite_image_fixe010.jpg',
      '/images/accueil/flottantes_doc_labo/la_realite_image_fixe011.jpg',
      '/images/accueil/flottantes_doc_labo/la_realite_image_fixe012.jpg',
      '/images/accueil/flottantes_doc_labo/la_realite_image_fixe013.jpg',
      '/images/accueil/flottantes_doc_labo/la_realite_image_fixe014.jpg',
      '/images/accueil/flottantes_doc_labo/la_realite_image_fixe015.jpg',
      '/images/accueil/flottantes_doc_labo/la_realite_image_fixe018.jpg',
      '/images/accueil/flottantes_doc_labo/la_realite_image_fixe019.jpg',
      '/images/accueil/flottantes_doc_labo/post-pandemie_01.jpg',
      '/images/accueil/flottantes_doc_labo/post-pandemie_02.jpg',
      '/images/accueil/flottantes_doc_labo/post-pandemie_03.jpg',
      '/images/accueil/flottantes_doc_labo/post-pandemie_04.jpg',
      '/images/accueil/flottantes_doc_labo/post-pandemie_05.jpg',
      '/images/accueil/flottantes_doc_labo/utopie_01.jpg',
      '/images/accueil/flottantes_doc_labo/utopie_03.jpg',
      '/images/accueil/flottantes_doc_labo/utopie_04.jpg',
      '/images/accueil/flottantes_doc_labo/utopie_06.jpg',
      '/images/accueil/flottantes_doc_labo/utopie_07.jpg'
    ],
  },
  navigation: {
    coords: { x: null, y: null },
    ajustement_vitesse_scroll: 3
  },
  ecran: {},
  rapport_image_ecran: 6,
  vitesse_translation: 1.3,
  positionnement_actuel: 0,
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
  for(let i = 0; i < config.images.nb_t0; ++i) { canva.appendChild(creer_image()); }
  document.getElementById("modal").addEventListener("click", hide_modal);

  // Lancer l'animation
  window.setInterval(animer_images, config.frame_rate);
  window.setInterval(function () { 
    canva.appendChild(creer_image());
  }, config.images.parametres.interval_apparition_image);

  // Afficher titres
  afficher_titres();
}

function hide_modal () {
  let modal = document.getElementById("modal");
  modal.classList.remove("active");
}

function show_modal (image) {
  let modal = document.getElementById("modal");
  modal.classList.add("active");
  modal.querySelector("img").src = image.src;
}

function commencer_translation (e) {
  reset_coords();
  config.canva.addEventListener("mousemove", translation);
}

function commencer_translation_touch (e) {
  reset_coords();
  config.canva.addEventListener("touchmove", translation_touch);
}

function terminer_translation (e) {
  config.canva.removeEventListener("mousemove", translation);
  console.log(config.images.parametres.translate);
}

function terminer_translation_touch (e) {
  config.canva.removeEventListener("touchmove", translation_touch);
}

function translation_scroll (e) {
  e.stopPropagation();
  e.preventDefault();

  config.images.parametres.translate.x += Math.sign(e.deltaX) * -1 * config.vitesse_translation * config.navigation.ajustement_vitesse_scroll;
  config.images.parametres.translate.y += Math.sign(e.deltaY) * -1 * config.vitesse_translation * config.navigation.ajustement_vitesse_scroll;

  config.images.liste.forEach((image) => { appliquer_transform_image(image); });
}

function translation_touch (e) {
  e.stopPropagation();
  e.preventDefault();

  let x0 = config.navigation.coords.x;
  let y0 = config.navigation.coords.y;

  config.navigation.coords.x = e.touches[0].screenX;
  config.navigation.coords.y = e.touches[0].screenY;

  if(x0 == null && y0 == null) return;

  let delta_x = config.navigation.coords.x - x0;
  let delta_y = config.navigation.coords.y - y0;

  config.images.parametres.translate.x += delta_x * config.vitesse_translation;
  config.images.parametres.translate.y += delta_y * config.vitesse_translation;

  config.liste.images.forEach((image) => { appliquer_transform_image(image); });
}

function translation (e) {

  let x0 = config.navigation.coords.x;
  let y0 = config.navigation.coords.y;

  config.navigation.coords.x = e.clientX;
  config.navigation.coords.y = e.clientY;

  if(x0 == null && y0 == null) return;

  let delta_x = config.navigation.coords.x - x0;
  let delta_y = config.navigation.coords.y - y0;

  config.images.parametres.translate.x += delta_x * config.vitesse_translation;
  config.images.parametres.translate.y += delta_y * config.vitesse_translation;

  config.images.liste.forEach((image) => { appliquer_transform_image(image); });
}

function reset_coords () {
  config.navigation.coords.x = null;
  config.navigation.coords.y = null;
}

function afficher_titres () {
  window.setTimeout(function () {
    document.getElementById("logo-presentation").style.opacity = 1;
    window.setTimeout(function () {
      document.getElementById("titre").style.opacity = 1;
      window.setTimeout(function () {
        document.getElementById("sous-titre").style.opacity = 1;
        window.setTimeout(function () {
          document.getElementById("presentation").style.opacity = 0;
          window.setTimeout(function () {
            document.getElementById("presentation").style.display = "none";
          }, 2000);
        }, 2000);
      }, 2000);
    }, 2000);
  }, 0);
}
