var config = {
  images: [
    'madonna1.jpg',
    'madonna2.jpg',
    'madonna3.jpg',
    'madonna4.jpg',
    'madonna5.jpg',
    'madonna6.jpg',
    'madonna7.jpg',
    'madonna8.jpg',
    'madonna9.jpg',
    'madonna10.jpg'
  ]
}

window.onload = function () {

  let canva = document.getElementById("animation-accueil");

  canva.addEventListener("wheel", function (e) { 
    let bounding_rect_animation = e.target.getBoundingClientRect();

    let image = creer_image(src_image_aleatoire());
    image.style.top = 10 + "px";
    image.style.left = 10 + "px";

    canva.appendChild(image);
    console.log(e);
  });
}

function creer_image (src) {
  let img = document.createElement("img");
  img.src = "images/" + src;
  img.className = "image-flottante"
  img.alt = "Madonna";

  return img; 
}

function src_image_aleatoire () {
  let index = Math.round(Math.random() * (config.images.length - 1));
  return config.images[index];
}
