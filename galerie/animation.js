var config = {
  souris: { x: null, y: null }
}

window.onload = function () {

  init_menu();
  init_traduction();

  document.getElementById("legende").style.width = document.getElementById("animation-galerie").style.width;

  [].forEach.call(document.querySelectorAll(".image"), (image) => {
    image.addEventListener("click", toggleFocus.bind(image));
  });

  [].forEach.call(document.querySelectorAll("#portraits img"), (image) => {
    window.setTimeout(() => {
      image.style.opacity = 1;
    }, 10);
  });

  document.querySelector("#animation-galerie").addEventListener("mousedown", commencer_translation);
  document.querySelector("#animation-galerie").addEventListener("mouseup", terminer_translation);
}

function toggleFocus () {
  this.classList.toggle("focus");
  if([].includes.call(this.classList, "focus")) {

    [].forEach.call(document.querySelectorAll(".image"), (image) => {
      if(image == this) return;
      image.classList.remove("focus");
    });

    document.querySelector("#animation-galerie").scroll({
      top: 0,
      left: this.offsetLeft - ((window.innerWidth / 2) - (this.offsetWidth / 2)),
      behavior: 'smooth'
    })
  }
}

function commencer_translation (e) {
  e.stopPropagation();
  e.preventDefault();

  config.souris.x = null;
  config.souris.y = null;

  document.querySelector("#animation-galerie").addEventListener("mousemove", translation);
}

function terminer_translation (e) {
  e.stopPropagation();
  e.preventDefault();

  document.querySelector("#animation-galerie").removeEventListener("mousemove", translation);
}

function translation (e) {
  e.stopPropagation();
  e.preventDefault();

  let x0 = config.souris.x;

  config.souris.x = e.clientX;

  if(x0 == null) return;

  let delta_x = config.souris.x - x0;

  let actuel = document.querySelector("#animation-galerie").scrollLeft;
  document.querySelector("#animation-galerie").scroll({left: actuel - delta_x});
}

