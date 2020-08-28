class Tuile {
  constructor(position, images) {
    this.element = document.createElement("div");
    this.images = images;
    this.position = position;

    // Info de base
    this.element.className = "tuile";
    this.element.alt = "Tuile";
    this.element.style.width = Math.round(config.largeur / config.rapport_image_ecran) + "px"
    this.element.addEventListener("click", (e) => {
      show_modal(e.target.src);
    });

    // Positionner la tuile
    this.element.style.width = config.tuiles.taille.x.valeur + config.tuiles.taille.x.unite;
    this.element.style.marginLeft = (-1 * config.tuiles.taille.x.valeur / 4) + config.tuiles.taille.x.unite;

    this.element.style.height = config.tuiles.taille.y.valeur + config.tuiles.taille.y.unite;
    this.element.style.marginTop = (-1 * config.tuiles.taille.y.valeur / 4) + config.tuiles.taille.y.unite;

    this.element.style.left = (position.x * config.tuiles.taille.x.valeur) + config.tuiles.taille.x.unite;
    this.element.style.top = (position.y * config.tuiles.taille.y.valeur) + config.tuiles.taille.y.unite;

    // Postionner les images
    let positions_images = deep_copy(config.positions_images_tuiles);
    images.forEach((image) => {
      let position_image = positions_images.pop();
      image.element.style.left = position_image.x;
      image.element.style.top = position_image.y;
    });

    // Ajouter les images
    images.forEach((image) => {
      this.element.appendChild(image.element);
    });
  }

  est_visible () {
    let rect = this.element.getBoundingClientRect();

    let threshold = 0;

    const vpWidth = window.innerWidth;
    const vpHeight = window.innerHeight;

    const above = rect && rect.bottom - threshold <= 0;
    const below = rect && rect.top - vpHeight + threshold >= 0;
    const left = rect && rect.right - threshold <= 0;
    const right = rect && rect.left - vpWidth + threshold >= 0;
    const inside = !!rect && !above && !below && !left && !right;

    return inside;
  }
}

class Image {
  constructor(source) {
    this.element = document.createElement("img");

    // Info de base
    this.element.src = "../images/" + source;
    this.element.className = "image-flottante";
    this.element.alt = "Madonna";

    this.element.style.width = Math.round(config.largeur / config.rapport_image_ecran) + "px";

    this.element.addEventListener("click", (e) => {
      show_modal(e.target.src);
    });
  }
}

function creer_tuile () {
  let tuile = document.createElement("div");
  config.tuiles.liste.push(tuile);

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
    let position = positions.pop();
    let image = creer_image(sources.pop(), position);

    tuile.appendChild(image);
  }
}

function afficher_texte_imagine () { }
function afficher_texte_original () { }

function deep_copy (obj) { return JSON.parse(JSON.stringify(obj)); }

// TODO //
function maj_tuiles_visibles () {
  tuiles_visibles().forEach((tuile) => {
    afficher_tuiles_voisines(tuile);
  })
}

function trouver_tuiles_voisines (tuile) {
  return [];
}

function afficher_tuile (tuile) {
  tuile.style.display = "block";
}

function tuiles_visibles () {
  return config.tuiles.liste.filter((tuile) => {
    return tuile.est_visible();
  });
}

function afficher_tuiles_voisines (tuile) {
  trouver_tuiles_voisines(tuile).forEach((tuile) => {
    afficher_tuile(tuile);
  });
}

