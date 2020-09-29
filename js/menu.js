function init_menu () {
  document.getElementById("hamburger").addEventListener("click", () => {

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
  });
}

function cacher_main () {
  let main = document.getElementsByTagName("main")[0];
  main.style.opacity = 0;
}

function afficher_main () {
  let main = document.getElementsByTagName("main")[0];
  main.style.opacity = 1;
}
