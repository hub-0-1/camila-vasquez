var rotation_scroller = 0;
var vitesse_rotation = 1.3;

var dernier_x = 0;

window.onload = function () {

  init_traduction();

  let texte = document.getElementById("texte");
  texte.scroll({ left: 1, top: 0 });

  document.getElementById("texte").addEventListener("scroll", function (e) { 
    deplacement_span_infini(e);
    deplacer_scroller(e);
  });
}

function deplacement_span_infini (e) {
  let span_1 = texte.firstElementChild, span_2 = texte.lastElementChild;
  let rect_1 = span_1.getBoundingClientRect(), rect_2 = span_2.getBoundingClientRect();

  let translation = e.currentTarget.scrollLeft;
  let pct_avancement = translation / (rect_1.width + rect_2.width);

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
