function creer_image (coords) {
  let img = document.createElement("img");
  config.images.liste.push(img);

  // Info de base
  img.src = src_image_aleatoire();
  img.alt = this.src;
  img.addEventListener("click", (e) => { show_modal(e.target); });
  img.setAttribute("data-r", 0);
  img.setAttribute("data-id-texte", img.src.match(/(\w+)\.(jpg|png)$/)[1]);

  // Affichage
  img.className = "image-flottante"
  window.setTimeout(function () {
    if (img.clientWidth > img.clientHeight) {
      img.classList.add("paysage");
    }
    else {
      img.classList.add("portrait");
    }
  }, 0);

  // Position initiale
  let coordonnees = { 
    x: Math.round(config.ecran.largeur * Math.random()) + (config.ecran.largeur * coords.x),
    y: Math.round(config.ecran.hauteur * Math.random()) + (config.ecran.hauteur * coords.y)
  };

  img.style.left = coordonnees.x + -1 * config.images.parametres.translate.x + "px";
  img.style.top = coordonnees.y + -1 * config.images.parametres.translate.y + "px";

  // Deplacement
  img.setAttribute("data-dx", -1 * ((Math.random() / 2) + 0.5) * config.images.parametres.multiplicateur_vecteur_translation);
  img.setAttribute("data-dy", -1 * ((Math.random() / 2) + 0.5) * config.images.parametres.multiplicateur_vecteur_translation);

  // Rotation
  img.setAttribute("data-dr", (Math.random() > 0.5 ? 1 : -1) * config.images.parametres.multiplicateur_vecteur_rotation);

  return img; 
}

function src_image_aleatoire () {
  config.index_source = ((config.index_source + 1 + Math.round(Math.random() * 10)) % (config.images.sources.length - 1));
  return config.images.sources[config.index_source];
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
    let delta_rotation = parseFloat(image.getAttribute("data-dr"));
    let rotation_originale = parseFloat(image.getAttribute("data-r"));
    image.setAttribute("data-r", rotation_originale + delta_rotation);

    appliquer_transform_image(image);
  });
}

function appliquer_transform_image (image) {
  image.style.transform = "translate(" + config.images.parametres.translate.x + "px, " + config.images.parametres.translate.y + "px) rotate(" + image.getAttribute("data-r") + "deg)";
}

