class Tuile {
  constructor(position, images) {
    this.element = document.createElement("div");
    this.images = images;
    this.position = position;

    // Info de base
    this.element.className = "tuile";
    this.element.alt = "Tuile";
    this.element.style.width = Math.round(config.ecran.largeur / config.rapport_image_ecran) + "px"

    // Positionner la tuile
    this.element.style.width = config.tuiles.taille.x.valeur + config.tuiles.taille.x.unite;
    this.element.style.marginLeft = (-1 * config.tuiles.taille.x.valeur / 4) + config.tuiles.taille.x.unite;

    this.element.style.height = config.tuiles.taille.y.valeur + config.tuiles.taille.y.unite;
    this.element.style.marginTop = (-1 * config.tuiles.taille.y.valeur / 4) + config.tuiles.taille.y.unite;

    this.element.style.left = (position.x * config.tuiles.taille.x.valeur) + config.tuiles.taille.x.unite;
    this.element.style.top = (position.y * config.tuiles.taille.y.valeur) + config.tuiles.taille.y.unite;

    // Postionner les images
    let positions_images = deep_copy(config.positions_images_tuiles);
    this.images.forEach((image) => {
      let position_image = positions_images.pop();
      image.element.style.left = position_image.x;
      image.element.style.top = position_image.y;
    });

    // Ajouter les images
    this.images.forEach((image) => {
      this.element.appendChild(image.element);
    });

    // Finaliser
    config.tuiles.liste.push(this);
    config.canva.prepend(this.element);
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

  afficher () { }
  
  cacher () { }
}

class Image {
  constructor(source) {
    this.element = document.createElement("img");
    this.source = "../images/" + source;

    // Info de base
    this.element.src = this.source;
    this.element.className = "image-flottante";
    this.element.alt = "Madonna";

    this.element.style.width = Math.round(config.ecran.largeur / config.rapport_image_ecran) + "px";

    this.element.addEventListener("click", this.afficher_definitions.bind(this));
  }

  afficher_definitions () {

    // TODO lier le texte a l'image
    let langue = document.getElementById("langue").getAttribute("data-langue");

    afficher_definition_officielle(this.source, config.textes[langue].apnee.original);
    window.setTimeout(cacher_definition_officielle, config.temps_apparition_definition);

    window.setTimeout(() => {
      afficher_definition_interpretation(this.source, config.textes[langue].apnee.interpretation);
    }, config.temps_apparition_definition);

    window.setTimeout(cacher_definition_interpretation, config.temps_apparition_definition * 2);
  }
}

function maj_tuiles_visibles () {
  let liste_tuiles_visibles = tuiles_visibles();

  let tuiles_invisibles = config.tuiles.liste.filter((tuile) => { return !liste_tuiles_visibles.includes(tuile) });

  liste_tuiles_visibles.forEach((tuile) => {
    afficher_tuiles_voisines(tuile);
  });

}

function deep_copy (obj) { return JSON.parse(JSON.stringify(obj)); }

function trouver_tuiles_voisines (tuile_centrale) {

  let voisines = {
    haut_gauche: null,
    haut: null,
    haut_droite: null,
    droite: null,
    bas_droite: null,
    bas: null,
    bas_gauche: null,
    gauche: null,
  }

  // Haut gauche
  console.log(tuile_centrale.position);

  voisines.haut_gauche = config.tuiles.liste.find((tuile) => { 
    return (tuile.position.x == tuile_centrale.position.x - 1
            && tuile.position.y == tuile_centrale.position.y - 1) });

  if(!voisines.haut_gauche) {
    voisines.haut_gauche = new Tuile({x: tuile_centrale.position.x - 1, y: tuile_centrale.position.y - 1}, creer_images());
  }

  // Haut
  voisines.haut = config.tuiles.liste.find((tuile) => { 
    return (tuile.position.x == tuile_centrale.position.x
            && tuile.position.y == tuile_centrale.position.y - 1) });

  if(!voisines.haut) {
    voisines.haut = new Tuile({x: tuile_centrale.position.x, y: tuile_centrale.position.y - 1}, creer_images());
  }
  
  // Haut Droite
  voisines.haut_droite = config.tuiles.liste.find((tuile) => { 
    return (tuile.position.x == tuile_centrale.position.x + 1
            && tuile.position.y == tuile_centrale.position.y - 1) });

  if(!voisines.haut_droite) {
    voisines.haut_droite = new Tuile({x: tuile_centrale.position.x + 1, y: tuile_centrale.position.y - 1}, creer_images());
  }

  // Droite
  voisines.droite = config.tuiles.liste.find((tuile) => { 
    return (tuile.position.x == tuile_centrale.position.x + 1
            && tuile.position.y == tuile_centrale.position.y) });

  if(!voisines.droite) {
    voisines.droite = new Tuile({x: tuile_centrale.position.x + 1, y: tuile_centrale.position.y}, creer_images());
  }

  // Bas Droite
  voisines.bas_droite = config.tuiles.liste.find((tuile) => { 
    return (tuile.position.x == tuile_centrale.position.x + 1
            && tuile.position.y == tuile_centrale.position.y + 1) });

  if(!voisines.bas_droite) {
    voisines.bas_droite = new Tuile({x: tuile_centrale.position.x + 1, y: tuile_centrale.position.y + 1}, creer_images());
  }

  // Bas
  voisines.bas = config.tuiles.liste.find((tuile) => { 
    return (tuile.position.x == tuile_centrale.position.x
            && tuile.position.y == tuile_centrale.position.y + 1) });

  if(!voisines.bas) {
    voisines.bas = new Tuile({x: tuile_centrale.position.x, y: tuile_centrale.position.y + 1}, creer_images());
  }

  // Bas Gauche
  voisines.bas_gauche = config.tuiles.liste.find((tuile) => { 
    return (tuile.position.x == tuile_centrale.position.x - 1
            && tuile.position.y == tuile_centrale.position.y + 1) });

  if(!voisines.bas_gauche) {
    voisines.bas_gauche = new Tuile({x: tuile_centrale.position.x - 1, y: tuile_centrale.position.y + 1}, creer_images());
  }

  // Gauche
  voisines.gauche = config.tuiles.liste.find((tuile) => { 
    return (tuile.position.x == tuile_centrale.position.x - 1
            && tuile.position.y == tuile_centrale.position.y) });

  if(!voisines.gauche) {
    voisines.gauche = new Tuile({x: tuile_centrale.position.x - 1, y: tuile_centrale.position.y}, creer_images());
  }

  return voisines;
}

function tuiles_visibles () {
  return config.tuiles.liste.filter((tuile) => {
    return tuile.est_visible();
  });
}

function afficher_tuiles_voisines (tuile) {
  let tuiles_voisines = trouver_tuiles_voisines(tuile);

  Object.keys(tuiles_voisines).forEach((key) => {
    if(tuiles_voisines[key]) {
      let tuile = tuiles_voisines[key];
      tuile.afficher();
    }
  });
}

function creer_images () {
  return config.tuiles.sources.map((source) => { return new Image (source) });
}

function appliquer_transform_tuile (tuile) {
  console.log(config.tuiles.translate);
  tuile.element.style.transform = "translate(" + config.tuiles.translate.x + "px, " + config.tuiles.translate.y + "px) "; 
}

