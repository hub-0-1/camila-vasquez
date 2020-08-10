function init_menu () {
  document.getElementById("hamburger").addEventListener("click", () => {
    [].forEach.call(document.querySelectorAll(".item-menu"), (el) => {
      if([].includes.call(el.classList, "show")) {
        el.classList.remove("show");
      }
      else {
        el.classList.add("show");
      }
    });
  });
}
