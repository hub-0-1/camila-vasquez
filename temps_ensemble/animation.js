var config = {
  souris: { x: null, y: null }
}

var rotation_scroller = 0;
var vitesse_rotation = 1.3;

var dernier_x = 0;

window.onload = function () {

  init_traduction();
  init_menu();

  let texte = document.getElementById("texte");
  texte.scroll({ left: 1, top: 0 });

  document.getElementById("texte").addEventListener("scroll", function (e) { 
    evenement_scroll(e);
    deplacer_scroller(e);
  });

  document.querySelector("#texte").addEventListener("mousedown", commencer_translation);
  document.querySelector("#texte").addEventListener("mouseup", terminer_translation);
}


function evenement_scroll (e) {
  let delta_x = e.currentTarget.scrollLeft;
  deplacement_span_infini(delta_x);
}

function deplacement_span_infini (delta_x) {
  let span_1 = texte.firstElementChild, span_2 = texte.lastElementChild;
  let rect_1 = span_1.getBoundingClientRect(), rect_2 = span_2.getBoundingClientRect();

  let pct_avancement = delta_x / (rect_1.width + rect_2.width);
  console.log(delta_x, pct_avancement);

  // Si le texte est a moins de 10%
  if(pct_avancement < 0.1) {
    texte.prepend(span_2);
    texte.scrollBy(rect_2.width, 0);
  }

  // Si le texte est a plus de 90%
  else if (pct_avancement > 0.9) {
    texte.appendChild(span_1);
    texte.scrollBy(-1 * rect_1.width, 0);
  }
}

function deplacer_scroller (e) {
  if(dernier_x < e.currentTarget.scrollLeft) {
    rotation_scroller += 1;
    set_rotation (rotation_scroller);
  }
  else {
    rotation_scroller -= 1;
    set_rotation (rotation_scroller);
  }

  dernier_x = e.currentTarget.scrollLeft;
}

function set_rotation (rotation) {
  document.getElementById("spinner").setAttribute("style", 
    "transform: rotate(" + rotation * vitesse_rotation + "deg)");
}

function commencer_translation (e) {
  e.stopPropagation();
  e.preventDefault();

  config.souris.x = null;
  config.souris.y = null;

  document.querySelector("#texte").addEventListener("mousemove", translation);
}

function terminer_translation (e) {
  e.stopPropagation();
  e.preventDefault();

  document.querySelector("#texte").removeEventListener("mousemove", translation);
}

function translation (e) {
  e.stopPropagation();
  e.preventDefault();

  let x0 = config.souris.x;

  config.souris.x = e.clientX;

  if(x0 == null) return;

  let delta_x = config.souris.x - x0;

  deplacement_span_infini (delta_x);
  let actuel = document.querySelector("#texte").scrollLeft;
  document.querySelector("#texte").scroll({left: actuel - delta_x});
}

