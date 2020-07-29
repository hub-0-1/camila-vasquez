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
      footer: {
        copyright: "@2020 Camila Vasquez. Tous droits réservés.",
        autre_langue: "EN"
      }
    }
  },
  en: {
    translation: {
      footer: {
        copyright: "@2020 Camila Vasquez. All rights reserved.",
        autre_langue: "FR"
      }
    }
  }
}
