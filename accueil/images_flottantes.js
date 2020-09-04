function creer_image () {
  let img = document.createElement("img");
  config.images.liste.push(img);

  // Info de base
  img.src = "images/" + src_image_aleatoire();
  img.className = "image-flottante"
  img.alt = "Madonna";
  img.style.width = Math.round(config.ecran.largeur / config.rapport_image_ecran) + "px"
  img.addEventListener("click", (e) => {
    show_modal(e.target.src);
  });
  img.setAttribute("data-r", 0);

  // Position initiale
  positionner_image(img);

  // Deplacement
  determiner_vecteur_deplacement(img);

  // Rotation
  determiner_sens_rotation(img);

  // Prochaine position d'apparition
  config.positionnement_actuel = (config.positionnement_actuel + 1) % config.images.positionnements.length;
  
  // Supression de l'image apres un certain temps
  window.setTimeout(function () {
    img.remove();
    delete img;
  }, config.images.parametres.delais_suppression_image);

  return img; 
}

function positionner_image (image) {
  let coordonnees = { };
  let pos_init = config.images.positionnements[config.positionnement_actuel];

  if(pos_init.x == -1) { coordonnees.x = Math.round(Math.random() * -1 * config.ecran.largeur * config.scale_ext_canva) - config.ecran.largeur; }
  else if(pos_init.x == 0) { coordonnees.x = Math.round(Math.random() * config.ecran.largeur); }
  else if(pos_init.x == 1) { coordonnees.x = Math.round(Math.random() * 1 * config.ecran.largeur * config.scale_ext_canva) + config.ecran.largeur; }

  if(pos_init.y == -1) { coordonnees.y = Math.round(Math.random() * -1 * config.ecran.hauteur * config.scale_ext_canva) - config.ecran.hauteur; }
  else if(pos_init.y == 0) { coordonnees.y = Math.round(Math.random() * config.ecran.hauteur); }
  else if(pos_init.y == 1) { coordonnees.y = Math.round(Math.random() * 1 * config.ecran.hauteur * config.scale_ext_canva) + config.ecran.hauteur; }

  image.style.left = coordonnees.x + "px";
  image.style.top = coordonnees.y + "px";
}

function determiner_vecteur_deplacement (image) {
  let vecteur = { };
  let pos_init = config.images.positionnements[config.positionnement_actuel];

  if(pos_init.x == -1) { vecteur.x = round_decimal((Math.random() / 2) + 0.5); } // [0.5, 1]
  else if(pos_init.x == 0) { vecteur.x = round_decimal((Math.random() / 2) + 0.5) * Math.random() >= 0.5 ? 1 : -1; } // [-1, -0.5], [0.5, 1]
  else if(pos_init.x == 1) { vecteur.x = round_decimal((Math.random() / 2) - 1); } // [-1, -0.5]

  if(pos_init.y == -1) { vecteur.y = round_decimal((Math.random() / 2) + 0.5); }
  else if(pos_init.y == 0) { vecteur.y = round_decimal((Math.random() / 2) + 0.5) * Math.random() >= 0.5 ? 1 : -1; }
  else if(pos_init.y == 1) { vecteur.y = round_decimal((Math.random() / 2) - 1); }

  vecteur = { x: -1, y: -1 }

  image.setAttribute("data-dx", vecteur.x * config.multiplicateur_vecteur);
  image.setAttribute("data-dy", vecteur.y * config.multiplicateur_vecteur);
}

function determiner_sens_rotation (image) {
  image.setAttribute("data-dr", (Math.random() > 0.5 ? 1 : -1));
}

function src_image_aleatoire () {
  let index = Math.round(Math.random() * (config.images.sources.length - 1));
  return config.images.sources[index];
}

function animer_images () {
  config.images.liste.forEach((image) => {
    // Flotement - translation
    let top_px = parseFloat(image.style.top.slice(0, -2));
    let left_px = parseFloat(image.style.left.slice(0, -2));

    let deltaX = parseFloat(image.getAttribute("data-dx"));
    let deltaY = parseFloat(image.getAttribute("data-dy"));

    image.style.top = (top_px + deltaY) + "px";
    image.style.left = (left_px + deltaX) + "px";

    // Flotement - rotation
    let delta_rotation = parseInt(image.getAttribute("data-dr"));
    let rotation_originale = parseInt(image.getAttribute("data-r"));
    image.setAttribute("data-r", rotation_originale + delta_rotation);

    appliquer_transform_image(image);
  });
}

function appliquer_transform_image (image) {
  image.style.transform = "translate(" + config.images.parametres.translate.x + "px, " + config.images.parametres.translate.y + "px) rotate(" + image.getAttribute("data-r") + "deg)";
}

