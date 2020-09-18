function init_menu () {
  document.getElementById("hamburger").addEventListener("click", () => {

    let el = document.getElementById("menu");
    let main = document.getElementsByTagName("main")[0];

    if([].includes.call(el.classList, "show")) {
      main.style.opacity = 1;
      el.style.opacity = 0;
      window.setTimeout(function () { el.classList.remove("show"); }, 2000);
    }
    else {
      main.style.opacity = 0;
      el.classList.add("show");
      window.setTimeout(function () { el.style.opacity = 1; }, 1);
    }

  });
}
