var config = {
  largeur: 0,
  hauteur: 0,
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
  nb_images_initiales: 6 
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
  config.largeur = bounding.width;
  config.hauteur = bounding.height;

  // Appliquer une transformation sur chaque image
  canva.addEventListener("wheel", translation_images);

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
}

function animer_images () {
  config.images.forEach((image) => {
    // Flotement - translation
    let top_px = parseFloat(image.style.top.slice(0, -2));
    let left_px = parseFloat(image.style.left.slice(0, -2));

    let deltaX = parseFloat(image.getAttribute("data-vecteur-x"));
    let deltaY = parseFloat(image.getAttribute("data-vecteur-y"));

    image.style.top = (top_px + deltaY) + "px";
    image.style.left = (left_px + deltaX) + "px";

    // Flotement - rotation
    let delta_rotation = parseInt(image.getAttribute("data-rotation"));
    if(image.style.transform.match(/rotate/)) {

      // Avant les modifications a la rotation
      let translate_orginal = (image.style.transform.match(/translate\(.+\)/) || "");
      if(translate_orginal) translate_orginal = translate_orginal[0];
      
      // Faire la rotation
      let rotation_originale = parseInt(image.style.transform.match(/[-\d]+/)[0]);
      image.style.transform = translate_orginal + image.style.transform.replace(/rotate\([\d-]+deg\)/, "rotate(" + (rotation_originale + delta_rotation) + "deg)");
    }
    else {
      image.style.transform += "rotate(" + delta_rotation + "deg)";
    }
  });
}

function translation_images (ev) {
  ev.stopPropagation();
  ev.preventDefault();

  config.translate.x += Math.sign(ev.deltaX) * -1 * config.vitesse_translation;
  config.translate.y += Math.sign(ev.deltaY) * -1 * config.vitesse_translation;

  config.images.forEach((image) => {
    image.style.transform = "translate(" + config.translate.x + "px, " + config.translate.y + "px)"
  });
}

function creer_image () {
  let img = document.createElement("img");
  config.images.push(img);

  // Info de base
  img.src = "images/" + src_image_aleatoire();
  img.className = "image-flottante"
  img.alt = "Madonna";
  img.style.width = Math.round(config.largeur / config.rapport_image_ecran) + "px"
  img.addEventListener("click", (e) => {
    show_modal(e.target.src);
  });

  // Position initiale
  positionner_image(img);

  // Deplacement
  determiner_vecteur_deplacement(img);

  // Rotation
  determiner_sens_rotation(img);

  // Prochaine position d'apparition
  config.positionnement_actuel = (config.positionnement_actuel + 1) % config.positionnements.length 
  
  // Supression de l'image apres un certain temps
  window.setTimeout(function () {
    img.remove();
    delete img;
  }, config.delais_suppression_image);

  return img; 
}

function positionner_image (image) {
  let coordonnees = { };
  let pos_init = config.positionnements[config.positionnement_actuel];

  if(pos_init.x == -1) { coordonnees.x = Math.round(Math.random() * -1 * config.largeur * config.scale_ext_canva) - config.largeur; }
  else if(pos_init.x == 0) { coordonnees.x = Math.round(Math.random() * config.largeur); }
  else if(pos_init.x == 1) { coordonnees.x = Math.round(Math.random() * 1 * config.largeur * config.scale_ext_canva) + config.largeur; }

  if(pos_init.y == -1) { coordonnees.y = Math.round(Math.random() * -1 * config.hauteur * config.scale_ext_canva) - config.hauteur; }
  else if(pos_init.y == 0) { coordonnees.y = Math.round(Math.random() * config.hauteur); }
  else if(pos_init.y == 1) { coordonnees.y = Math.round(Math.random() * 1 * config.hauteur * config.scale_ext_canva) + config.hauteur; }

  image.style.left = coordonnees.x + "px";
  image.style.top = coordonnees.y + "px";
}

function determiner_vecteur_deplacement (image) {
  let vecteur = { };
  let pos_init = config.positionnements[config.positionnement_actuel];

  if(pos_init.x == -1) { vecteur.x = round_decimal((Math.random() / 2) + 0.5); } // [0.5, 1]
  else if(pos_init.x == 0) { vecteur.x = round_decimal((Math.random() / 2) + 0.5) * Math.random() >= 0.5 ? 1 : -1; } // [-1, -0.5], [0.5, 1]
  else if(pos_init.x == 1) { vecteur.x = round_decimal((Math.random() / 2) - 1); } // [-1, -0.5]

  if(pos_init.y == -1) { vecteur.y = round_decimal((Math.random() / 2) + 0.5); }
  else if(pos_init.y == 0) { vecteur.y = round_decimal((Math.random() / 2) + 0.5) * Math.random() >= 0.5 ? 1 : -1; }
  else if(pos_init.y == 1) { vecteur.y = round_decimal((Math.random() / 2) - 1); }

  vecteur = { x: -1, y: -1 }

  image.setAttribute("data-vecteur-x", vecteur.x * config.multiplicateur_vecteur);
  image.setAttribute("data-vecteur-y", vecteur.y * config.multiplicateur_vecteur);
}

function determiner_sens_rotation (image) {
  image.setAttribute("data-rotation", (Math.random() > 0.5 ? 1 : -1));
}

function src_image_aleatoire () {
  let index = Math.round(Math.random() * (config.images_src.length - 1));
  return config.images_src[index];
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
