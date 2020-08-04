var rotation_scroller = 0;
var vitesse_rotation = 1.3;

var dernier_x = 0;


window.onload = function () {
  let texte = document.getElementById("texte");

  document.getElementById("texte").addEventListener("scroll", function (e) { 

    let span_1 = texte.firstElementChild, span_2 = texte.lastElementChild;
    let rect_1 = span_1.getBoundingClientRect(), rect_2 = span_2.getBoundingClientRect();

    let translation = e.currentTarget.scrollLeft;
    let pct_avancement_span_1 = translation / rect_1.width;
    let pct_avancement_span_2 = translation / (rect_1.width + rect_2.width);

    console.log(pct_avancement_span_2);

    // Si le premier element est a moins de 20%
    if(pct_avancement_span_1 < 0.2) {
      span_2.parentElement.prepend(span_2);
      texte.scrollBy(rect_2.width, 0);
    }

    // Si le dernier element est a plus de 80%
    else if (pct_avancement_span_2 > 0.8) {
      span_1.parentElement.appendChild(span_1);
      texte.scrollBy(-1 * rect_1.width, 0);
    }

    deplacer_scroller(e);
  });
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
  document.getElementById("element-transformation").setAttribute("transform", 
    "rotate(" + rotation * vitesse_rotation + ", 60, 60)");
}

function detecter_span_actif () {
  let element_actif = null;
  [].forEach.call(document.querySelectorAll("#texte span"), (element) => { 
    if(!hors_ecran(element)) element_actif = element; 

  });
  return element_actif;
}

function hors_ecran (el) {
  var rect = el.getBoundingClientRect();
  return (
    (rect.x + rect.width) < 0 
    || (rect.y + rect.height) < 0
    || (rect.x > window.innerWidth || rect.y > window.innerHeight)

  );

};

