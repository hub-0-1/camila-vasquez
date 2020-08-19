var config = {
  prochain_path: [],
  index_path: 0,
  path_actuel: null
};

window.onload = function () {


  // Init
  init_traduction();
  init_menu();

  config.svg = document.getElementById("dessin");

  config.svg.addEventListener("mousedown", commencer_dessin);
  config.svg.addEventListener("mouseup", terminer_dessin);
  config.svg.addEventListener("touchstart", commencer_dessin);
  config.svg.addEventListener("touchend", terminer_dessin);
}

function commencer_dessin (e) {
  config.svg.addEventListener("mousemove", capter);
  config.svg.addEventListener("touchmove", capter);

  let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.id = "path" + config.index_path;

  config.svg.appendChild(path);
  config.path_actuel = path;
}

function terminer_dessin (e) {
  config.svg.removeEventListener("mousemove", capter);
  config.svg.removeEventListener("touchmove", capter);

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
  let string_path = "";
  config.prochain_path.forEach((coordonnee) => {
    string_path += (string_path == "" ? "M" : " L") + coordonnee.x + " " + coordonnee.y;
  });

  config.path_actuel.setAttribute("d", string_path);
  config.path_actuel.setAttribute("fill", "none");
  config.path_actuel.setAttribute("stroke-width", "7");
  config.path_actuel.setAttribute("stroke", "#f19731");
}
