window.onload = function () {

  init_menu();
  init_traduction();

  const viewer = new ImageViewer(document.querySelector("#animation-cartographie img"), { 
    snapView: false,
    maxZoom: 2500
  });

  window.setTimeout(function () {
    viewer.zoom(1000, { x: 500, y: 500});
  }, 0);

  window.setTimeout(function () {
    document.getElementById("explications").style.opacity = 0;
    window.setTimeout(function () {
      document.getElementById("explications").style.display = "none";
    }, 2000);
  }, 2500);
}
