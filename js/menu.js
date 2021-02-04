function init_menu () {
  let menu = document.createElement("div");
  let info = document.createElement("div");
  menu.innerHTML = `
    <div id="menu">
      <div class="wrapper-menu">
        <div class="item-menu"><div class="index">01.</div><a class="oeuvre" href="/lexique/" data-i18n="header.lexique"></a></div>
        <div class="item-menu"><div class="index">02.</div><a class="oeuvre" href="/collage/" data-i18n="header.collage"></a></div>
        <div class="item-menu"><div class="index">03.</div><a class="oeuvre" href="/temps_ensemble/" data-i18n="header.design_typo"></a></div>
        <div class="item-menu"><div class="index">04.</div><a class="oeuvre" href="/portraits/" data-i18n="header.portraits"></a></div>
      </div>
      <div class="wrapper-menu">
        <div class="item-menu"><div class="index">05.</div><a class="oeuvre" href="/tableau_blanc/" data-i18n="header.tableau_blanc"></a></div>
        <div class="item-menu"><div class="index">06.</div><a class="oeuvre" href="/retour/" data-i18n="header.retour"></a></div>
        <div class="item-menu"><div class="index">07.</div><a class="oeuvre" href="#info" data-i18n="header.info" onclick="afficher_info();"></a></div>
      </div>
    </div>

    <a id="container-logo" href="/"><img id="logo" class="icone" src="/images/logo.png"></a>
    <div id="langue" data-i18n="header.autre_langue" data-langue="fr"></div>
    <div id="hamburger">Menu</div>
   `;

  info.id = "animation-info";
  info.className = "animation";
  info.innerHTML = `<div id="textes-info">
          <h2 data-i18n="info.a_propos.titre"></h2>
          <div class="contenu-a-propos">
            <p>
              <span style="font-style: italic;">Repenser la famille : de l'utopie aux nouvelles stratégies</span>
              <span data-i18n="info.a_propos.p1"></span>
            </p>
            <p data-i18n="info.a_propos.p2"></p>
            <p data-i18n="info.a_propos.p3"></p>
          </div>
          <h2 data-i18n="info.contact.titre"></h2>
          <p><a href="mailto:camilarosario.vasquez@gmail.com" style="text-decoration: underline;">camilarosario.vasquez@gmail.com</a></p>
          <p data-i18n="info.contact.p1"></p>
          <p data-i18n="info.contact.p2"></p>
          <a href="http://foreman.ubishops.ca/repenser-la-famille-de-lutopie-aux-nouvelles-strategies" data-i18n="info.contact.p3" style="text-decoration: underline;"></a>
      </div>`;

  document.body.appendChild(menu);
  document.querySelector("main").appendChild(info);

  info.addEventListener("click", cacher_info);
  document.getElementById("hamburger").addEventListener("click", toggle_menu); 
}

function cacher_main () {
  let main = document.getElementsByTagName("main")[0];
  main.style.opacity = 0;
}

function afficher_main () {
  let main = document.getElementsByTagName("main")[0];
  main.style.opacity = 1;
}

function toggle_menu () {
  let el = document.getElementById("menu");
  let main = document.getElementsByTagName("main")[0];

  if([].includes.call(el.classList, "show")) {
    afficher_main();
    el.style.opacity = 0;
    window.setTimeout(function () { el.classList.remove("show"); }, 2000);
  }
  else {
    cacher_main();
    el.classList.add("show");
    window.setTimeout(function () { el.style.opacity = 1; }, 1);
  }
}

function afficher_info () {
  let info = document.getElementById("animation-info");
  document.getElementsByClassName("animation")[0].style.opacity = 0.1;
  cacher_menu();
  afficher(info, 0);
}

function cacher_info () {
  let info = document.getElementById("animation-info");
  document.getElementsByClassName("animation")[0].style.opacity = 1;
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
