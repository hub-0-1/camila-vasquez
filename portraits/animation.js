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
  document.querySelector("#portraits").style.transform = "translateX(-600px)";
}

