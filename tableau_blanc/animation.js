var config = {
  prochain_path: [],
  index_path: 0,
  path_actuel: null
};

window.onload = function () {


  // Init
  init_traduction();
  init_menu();

  config.canva = document.getElementById("canvas-tableau");
  config.svg = document.getElementById("dessin");

  config.canva.addEventListener("mousedown", commencer_dessin);
  config.canva.addEventListener("mouseup", terminer_dessin);
  config.canva.addEventListener("touchstart", commencer_dessin);
  config.canva.addEventListener("touchend", terminer_dessin);
}

function commencer_dessin (e) {
  config.canva.addEventListener("mousemove", capter);
  config.canva.addEventListener("touchmove", capter);

  let path = document.createElement("path");
  path.id = "path" + config.index_path;

  config.svg.appendChild(path);
  config.path_actuel = path;
}

function terminer_dessin (e) {
  config.canva.removeEventListener("mousemove", capter);
  config.canva.removeEventListener("touchmove", capter);

  console.log(config.prochain_path);
  config.prochain_path = [];
  config.index_path += 1;
}

function capter (e) {
  e.stopPropagation();
  e.preventDefault();

  // Determiner coordonnees
  let coordonnees = {};
  if(e.type == "mousemove") {
    coordonnees.x = e.clientX; 
    coordonnees.y = e.clientY; 
  }
  else { // Touchmove
    coordonnees.x = e.touches[0].clientX; 
    coordonnees.y = e.touches[0].clientY; 
  }
  config.prochain_path.push(coordonnees);

  // Dessiner
  config.path_actuel.setAttribute("d", "M150 0 L75 200 L225 200 Z");
  config.path_actuel.setAttribute("stroke-width", "5");
  config.path_actuel.setAttribute("stroke", "black");
}
