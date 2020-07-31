var rotation_scroller = 0;
var vitesse_rotation = 1.3;

window.onload = function () {

  // Global
  container_texte = document.getElementById("texte");
  elements_textes = document.querySelectorAll(".element-texte");
  container_texte_min_x = container_texte.getBoundingClientRect().x;
  container_texte_max_x = container_texte.getBoundingClientRect().x + container_texte.getBoundingClientRect().width;

  elements_textes[1].style.left = elements_textes[0].getBoundingClientRect().width + "px";

  document.getElementById("animation-design-typographique").addEventListener("wheel", function (evt) { 
    ajuster_position_scroll(evt);
    ajuster_position_texte();
  });
}

function ajuster_position_scroll (evt) {
  let direction = Math.sign(evt.deltaX);

  // Pas de scroll en X
  if(direction == 0) {
    return;
  }
  else if(direction == 1) {
    rotation_scroller += 1;
    set_rotation (rotation_scroller);
  }
  else if(direction == -1) {
    rotation_scroller -= 1;
    set_rotation (rotation_scroller);
  }
}

function ajuster_position_texte () {
  let element_texte_actif = detecter_texte_actif(elements_textes);
  let bounding_rect = element_texte_actif.getBoundingClientRect();

  let pct_affichage = Math.abs(Math.round(bounding_rect.x / bounding_rect.width * 100));

  let premier_texte = document.getElementById("texte").firstElementChild;
  let dernier_texte = document.getElementById("texte").lastElementChild;

  // Si element texte n'est pas dernier, deplacer
  console.log(pct_affichage);
  if(pct_affichage < 40 && element_texte_actif == premier_texte) {

    console.log("< 40", container_texte.children);
    container_texte.removeChild(dernier_texte);
    container_texte.prepend(dernier_texte);
  }
  // Deplacer premier en dernier
  else if (pct_affichage > 60 ) {

    console.log("> 60", container_texte.children);
    // Si element texte n'est pas premier, deplacer
    if(element_texte_actif == dernier_texte) {
      container_texte.removeChild(premier_texte);
      container_texte.appendChild(premier_texte);
    }
  }
}

function set_rotation (rotation) {
  document.getElementById("element-transformation").setAttribute("transform", 
    "rotate(" + rotation * vitesse_rotation + ", 60, 60)");
}

function detecter_texte_actif (elements_textes) {
  let element_actif = null;
  [].forEach.call(elements_textes, (element) => { 
    if(!hors_ecran(element)) element_actif = element; 
  });
  return element_actif;
}

function hors_ecran (el) {
  var rect = el.getBoundingClientRect();
  console.log("[", rect.x, ",", rect.x + rect.width, "]", "[", container_texte_min_x, ",", container_texte_max_x, "]");
  return (rect.x > container_texte_max_x && (rect.x + rect.width) < container_texte_min_x);
  return (
    (rect.x + rect.width) < 0 
    || (rect.y + rect.height) < 0
    || (rect.x > window.innerWidth || rect.y > window.innerHeight)
  );
};
