function init_menu () {
  let menu = document.createElement("div");
  menu.innerHTML = `<div id="menu">
      <div class="item-menu"><div class="index">01.</div><a class="oeuvre" href="/lexique/" data-i18n="header.lexique"></a></div>
      <div class="item-menu"><div class="index">02.</div><a class="oeuvre" href="/collage/" data-i18n="header.collage"></a></div>
      <div class="item-menu"><div class="index">03.</div><a class="oeuvre" href="/temps_ensemble/" data-i18n="header.design_typo"></a></div>
      <div class="item-menu"><div class="index">04.</div><a class="oeuvre" href="/portraits/" data-i18n="header.portraits"></a></div>
      <div class="item-menu"><div class="index">05.</div><a class="oeuvre" href="/tableau_blanc/" data-i18n="header.tableau_blanc"></a></div>
      <div class="item-menu"><div class="index">06.</div><a class="oeuvre" href="#info" data-i18n="header.info" onclick="afficher_info();"></a></div>
    </div>

    <a id="container-logo" href="/"><img id="logo" class="icone" src="/images/logo.png"></a>
    <div id="langue" data-i18n="header.autre_langue" data-langue="fr"></div>
    <div id="hamburger">Menu</div>`;
  document.body.appendChild(menu);
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
