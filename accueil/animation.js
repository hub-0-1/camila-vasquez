var config = {
  frame_rate: 30,
  images: {
    nb_lignes : 40,
    nb_colonnes : 50,
    coefficient_cachees: 20,
    liste: [],
    parametres: {
      translate: { x: 0, y: 0 },
      multiplicateur_vecteur_translation: 1.1,
      multiplicateur_vecteur_rotation: 0.2 
    },
    sources: window.images
  },
  sons: [],
  navigation: {
    coords: { x: null, y: null },
    ajustement_vitesse_scroll: 3
  },
  index_source: 0,
  ecran: {},
  vitesse_translation: 1.3,
}

window.onload = function () {

  // Traduire les elements texte
  init_traduction();
  init_menu();

  // Elements
  let canva = document.getElementById("animation-accueil");
  config.canva = canva;

  document.getElementById("modal").addEventListener("click", hide_modal);

  // Dimensions animation
  let bounding = canva.getBoundingClientRect();
  config.ecran.largeur = bounding.width / 2;
  config.ecran.hauteur = bounding.height / 2;

  // Appliquer une transformation sur chaque image
  canva.addEventListener("wheel", translation_scroll);
  canva.addEventListener("mousedown", commencer_translation);
  canva.addEventListener("mouseup", terminer_translation);
  canva.addEventListener("touchstart", commencer_translation_touch);
  canva.addEventListener("touchend", terminer_translation_touch);

  // Creer les premieres images
  window.setTimeout(function () { 
    for(let j = config.images.nb_lignes / -2; j < config.images.nb_lignes / 2; ++j) { 
      for(let i = config.images.nb_colonnes / -2; i < config.images.nb_colonnes / 2; ++i) { 
        canva.appendChild(creer_element({x: i, y: j})); 
      }
    }
  }, 0);

  // Lancer l'animation
  window.setInterval(animer_images, config.frame_rate);

  // Afficher titres
  afficher_titres();
}

function hide_modal () {
  let modal = document.getElementById("modal");
  modal.classList.remove("active");
  window.setTimeout(() => {
    modal.style.display = "none";
  }, 2000);
  document.getElementById("animation-accueil").style.opacity = 1;
}

function jouer_son (image) {
  let son = image.getAttribute("data-son");
  var audio = new Audio(son);
  config.sons.push(audio);
  audio.play();

  document.querySelector("#player").style.display = "initial";
  window.setTimeout(function () {
    document.querySelector("#player").style.opacity = 1;
  }, 0);
}

function arreter_sons () {
  config.sons.forEach((son) => {
    son.pause();
  })

  document.querySelector("#player").style.opacity = 0;
  window.setTimeout(function () {
    document.querySelector("#player").style.display = "none";
  }, 2000);
}

function show_modal (image) {
  document.getElementById("animation-accueil").style.opacity = 0;
  let modal = document.getElementById("modal");

  // Mise à jour des informations
  modal.querySelector("img").src = image.src;
  modal.querySelector("#type-texte").setAttribute("data-i18n", "accueil.legendes." + image.getAttribute("data-id-texte") + ".type");
  modal.querySelector("#media-texte").setAttribute("data-i18n", "accueil.legendes." + image.getAttribute("data-id-texte") + ".media");
  modal.querySelector("#note-texte").setAttribute("data-i18n", "accueil.legendes." + image.getAttribute("data-id-texte") + ".note");
  modal.querySelector("#rencontre-texte").setAttribute("data-i18n", "accueil.legendes." + image.getAttribute("data-id-texte") + ".rencontre");
  modal.querySelector("#annee-texte").setAttribute("data-i18n", "accueil.legendes." + image.getAttribute("data-id-texte") + ".annee");

  console.log(image);
  if(traduction.fr.translation.accueil.legendes[image.getAttribute("data-id-texte")].credit) {
    modal.querySelector("#credits-photo").setAttribute("data-i18n", "accueil.legendes." + image.getAttribute("data-id-texte") + ".credit");
  }
  else {
    modal.querySelector("#credits-photo").removeAttribute("data-i18n");
    modal.querySelector("#credits-photo").innerHTML = "";
  }

  traduire();

  modal.style.display = "initial";
  window.setTimeout(() => {
    modal.classList.add("active");
  }, 1);
}

function commencer_translation (e) {
  reset_coords();
  config.canva.addEventListener("mousemove", translation);
}

function commencer_translation_touch (e) {
  reset_coords();
  config.canva.addEventListener("touchmove", translation_touch);
}

function terminer_translation (e) {
  config.canva.removeEventListener("mousemove", translation);
}

function terminer_translation_touch (e) {
  config.canva.removeEventListener("touchmove", translation_touch);
}

function translation_scroll (e) {
  e.stopPropagation();
  e.preventDefault();

  config.images.parametres.translate.x += Math.sign(e.deltaX) * -1 * config.vitesse_translation * config.navigation.ajustement_vitesse_scroll;
  config.images.parametres.translate.y += Math.sign(e.deltaY) * -1 * config.vitesse_translation * config.navigation.ajustement_vitesse_scroll;

  config.images.liste.forEach((image) => { appliquer_transform_image(image); });
}

function translation_touch (e) {
  e.stopPropagation();
  e.preventDefault();

  let x0 = config.navigation.coords.x;
  let y0 = config.navigation.coords.y;

  config.navigation.coords.x = e.touches[0].screenX;
  config.navigation.coords.y = e.touches[0].screenY;

  if(x0 == null && y0 == null) return;

  let delta_x = config.navigation.coords.x - x0;
  let delta_y = config.navigation.coords.y - y0;

  config.images.parametres.translate.x += delta_x * config.vitesse_translation;
  config.images.parametres.translate.y += delta_y * config.vitesse_translation;

  config.liste.images.forEach((image) => { appliquer_transform_image(image); });
}

function translation (e) {

  let x0 = config.navigation.coords.x;
  let y0 = config.navigation.coords.y;

  config.navigation.coords.x = e.clientX;
  config.navigation.coords.y = e.clientY;

  if(x0 == null && y0 == null) return;

  let delta_x = config.navigation.coords.x - x0;
  let delta_y = config.navigation.coords.y - y0;

  config.images.parametres.translate.x += delta_x * config.vitesse_translation;
  config.images.parametres.translate.y += delta_y * config.vitesse_translation;

  config.images.liste.forEach((image) => { appliquer_transform_image(image); });
}

function reset_coords () {
  config.navigation.coords.x = null;
  config.navigation.coords.y = null;
}

function afficher_titres () {
  document.getElementById("container-logo").style.display = "none";
  document.getElementById("langue").style.display = "none";
  document.getElementById("hamburger").style.display = "none";

  document.getElementById("container-logo").style.opacity = 0;
  document.getElementById("langue").style.opacity = 0;
  document.getElementById("hamburger").style.opacity = 0;

  window.setTimeout(function () {
    document.getElementById("logo-presentation").style.opacity = 1;

    window.setTimeout(function () {
      document.getElementById("logo-presentation").style.opacity = 0;

      window.setTimeout(function () {
        document.getElementById("logo-presentation").style.display = "none";
        document.getElementById("titre").style.opacity = 1;
        window.setTimeout(function () {
          document.getElementById("sous-titre").style.opacity = 1;

          document.getElementById("hamburger").style.display = "initial";
          document.getElementById("langue").style.display = "initial";
          document.getElementById("container-logo").style.display = "initial";
          window.setTimeout(function () {

            document.getElementById("presentation").style.opacity = 0;

            document.getElementById("hamburger").style.opacity = 1;
            document.getElementById("langue").style.opacity = 1;
            document.getElementById("container-logo").style.opacity = 1;

            window.setTimeout(function () {
              document.getElementById("presentation").style.display = "none";
            }, 2000);
          }, 2000);
        }, 2000);
      }, 2000);
    }, 2000);
  }, 0);
}

function afficher_info () {
  let info = document.getElementById("animation-info");
  document.getElementById("animation-accueil").style.opacity = 0.1;
  cacher_menu();
  afficher(info, 0);
}

function cacher_info () {
  let info = document.getElementById("animation-info");
  document.getElementById("animation-accueil").style.opacity = 1;
  cacher(info, 0, 2000);
}

function cacher (element, delai, temps_transition) {
  window.setTimeout(() => {
    element.style.opacity = 0;
    window.setTimeout(() => { element.style.display = "none"; }, temps_transition);
  }, delai);
}

function afficher (element, delai) {
  window.setTimeout(() => {
    element.style.display = "initial";
    element.style.opacity = 0;

    // Présent, visible
    window.setTimeout(() => { element.style.opacity = 1; }, 10);
  }, delai);
}

function cacher_menu () {
  let el = document.getElementById("menu");

  afficher_main();
  el.style.opacity = 0;
  window.setTimeout(function () { el.classList.remove("show"); }, 2000);
}
