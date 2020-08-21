function init_menu () {
  document.getElementById("hamburger").addEventListener("click", () => {

    let el = document.getElementById("menu");

    if([].includes.call(el.classList, "show")) {
      el.classList.remove("show");
    }
    else {
      el.classList.add("show");
    }

  });
}
