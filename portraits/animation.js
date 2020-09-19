window.onload = function () {
  document.getElementById("legende").style.width = document.getElementById("animation-portraits").style.width;

  [].forEach.call(document.querySelectorAll(".portrait"), (image) => {
    image.addEventListener("click", toggleFocus.bind(image));
  });

  [].forEach.call(document.querySelectorAll(".paysage"), (image) => {
    image.addEventListener("click", toggleFocus.bind(image));
  });
}

function toggleFocus () {
  this.classList.toggle("focus");
  if([].includes.call(this.classList, "focus")) {
    document.querySelector("#animation-portraits").scroll({
      top: 0,
      left: this.offsetLeft - ((window.innerWidth / 2) - (this.offsetWidth / 2)),
      behavior: 'smooth'
    })
  }
}

