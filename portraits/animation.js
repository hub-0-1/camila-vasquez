window.onload = function () {

  init_menu();
  init_traduction();

  document.getElementById("legende").style.width = document.getElementById("animation-portraits").style.width;

  [].forEach.call(document.querySelectorAll(".image"), (image) => {
    image.addEventListener("click", toggleFocus.bind(image));
  });

  [].forEach.call(document.querySelectorAll("#portraits img"), (image) => {
    image.style.opacity = 1;  
  });
}

function toggleFocus () {
  this.classList.toggle("focus");
  if([].includes.call(this.classList, "focus")) {

    [].forEach.call(document.querySelectorAll(".image"), (image) => {
      if(image == this) return;
      image.classList.remove("focus");
    });

    document.querySelector("#animation-portraits").scroll({
      top: 0,
      left: this.offsetLeft - ((window.innerWidth / 2) - (this.offsetWidth / 2)),
      behavior: 'smooth'
    })
  }
}

