function init_traduction () {

  // Switcher
  document.getElementById("langue").addEventListener("click", function (e) {
    let nouvelle_langue = e.target.getAttribute("data-langue") == "fr" ? "en" : "fr";
    traduire(nouvelle_langue);
    e.target.setAttribute("data-langue", nouvelle_langue);
  })

  i18next.init({ 
    lng: "fr",
    fallbackLng: "fr",
    resources: traduction 
  }, function () {
    traduire();
  });
}

async function traduire (lng) {

  // Si on modifie le langage
  if (lng) await i18next.changeLanguage(lng);

  // Faire les traductions
  [].forEach.call(document.querySelectorAll("[data-i18n]"), (el) => {
    el.innerHTML = i18next.t(el.getAttribute("data-i18n"));
  })
}

var traduction = {
  fr: {
    translation: {
      header: {
        design_typo: "Design typographique",
        dictionnaire: "Lexique",
        tableau_blanc: "Tableau blanc",
        cartographie: "Cartographie",
        autre_langue: "EN"
      }
    }
  },
  en: {
    translation: {
      header: {
        design_typo: "Design typo EN",
        dictionnaire: "Lexique",
        tableau_blanc: "White board",
        cartographie: "Cartography",
        autre_langue: "FR"
      }
    }
  }
}
