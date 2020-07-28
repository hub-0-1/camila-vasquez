var rotation_scroller = 0;
var vitesse_rotation = 1.3;

window.onload = function () {
  document.getElementById("animation-design-typographique").addEventListener("wheel", function (e) { 
    let direction = Math.sign(e.deltaX);

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
  });
}

function set_rotation (rotation) {
  document.getElementById("element-transformation").setAttribute("transform", 
    "rotate(" + rotation * vitesse_rotation + ", 60, 60)");
}
