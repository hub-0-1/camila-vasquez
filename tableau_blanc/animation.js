var config = {
  prochain_path: [],
  index_path: 0,
  path_actuel: null
};

window.onload = function () {

  // Init
  init_menu();
  init_traduction();

  config.svg = document.getElementById("dessin");

  config.svg.addEventListener("mousedown", commencer_dessin);
  config.svg.addEventListener("mouseup", terminer_dessin);
  config.svg.addEventListener("touchstart", commencer_dessin);
  config.svg.addEventListener("touchend", terminer_dessin);

  // Afficher 
  let temps_affichage_total = 1000 + 2 * 2000, buffer = 250;
  afficher_et_cacher(document.getElementById("ligne1"), buffer, 1000, 2000);
  afficher_et_cacher(document.getElementById("ligne2"), 2 * buffer + 1 * temps_affichage_total, 1000, 2000);
  afficher_et_cacher(document.getElementById("ligne3"), 3 * buffer + 2 * temps_affichage_total, 1000, 2000);
  afficher_et_cacher(document.getElementById("ligne4"), 4 * buffer + 3 * temps_affichage_total, 1000, 2000);
  afficher(document.getElementById("ligne5"), 5 * buffer + 4 * temps_affichage_total);
  afficher(document.getElementById("ligne6"), 6 * buffer + 5 * temps_affichage_total);

  // Lancer l')expérience
  document.getElementById("ligne6").addEventListener("click", (e) => {
    document.getElementById("ambiance").play();
    cacher(document.getElementById("consignes"), 0, 2000);
  });

  // Terminer l'expérience
  document.getElementById("ambiance").addEventListener("ended", (e) => {
    document.getElementById("conclusion").style.display = "flex";
    [].forEach.call(document.querySelectorAll("path"), (path) => {
      path.setAttribute("stroke", "rgb(250, 234, 118, 0.2)")
    });
  });
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
  config.path_actuel.setAttribute("stroke-width", "3");
  config.path_actuel.setAttribute("stroke", "rgb(250, 234, 118)");
}

function cacher (element, delai, temps_transition) {
  window.setTimeout(() => {
    element.style.opacity = 0;
    window.setTimeout(() => { element.style.display = "none"; }, temps_transition);
  }, delai);
}

function afficher (element, delai) {
  window.setTimeout(() => {
    element.style.display = "initial";
    element.style.opacity = 0;

    // Présent, visible
    window.setTimeout(() => { element.style.opacity = 1; }, 10);
  }, delai);
}

function afficher_et_cacher (element, delai, temps, temps_transition) {

  // Présent, non-visible
  window.setTimeout(() => {
    element.style.display = "initial";
    element.style.opacity = 0;

    // Présent, visible
    window.setTimeout(() => { element.style.opacity = 1; }, 10);
  }, delai);


  // Présent, non-visible
  window.setTimeout(() => { element.style.opacity = 0; }, delai + temps + temps_transition);

  window.setTimeout(() => { element.style.display = "none"; }, delai + temps + (2 * temps_transition));
}
