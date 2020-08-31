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
        lexique: "Lexique",
        tableau_blanc: "Tableau blanc",
        cartographie: "Cartographie",
        autre_langue: "EN"
      },
      tableau: {
        intro: {
          ligne1: "Fermez les yeux",
          ligne2: "Écoutez",
          ligne3: "Bougez la souris en maintenant le clic enfoncé",
          ligne4: "Répondez au son spontanément",
          ligne5: "À la fin, ouvrez les yeux et contemplez"
        },
        lancement: {
          ligne1: "Pour commencer",
          ligne2: "Cliquez",
          ligne3: "Ici"
        }
      }
    }
  },
  en: {
    translation: {
      header: {
        design_typo: "Design typo EN",
        lexique: "Lexique",
        tableau_blanc: "White board",
        cartographie: "Cartography",
        autre_langue: "FR"
      },
      tableau: {
        intro: {
          ligne1: "Close your eyes",
          ligne2: "Listen",
          ligne3: "Move the mouse while maintaining your click",
          ligne4: "Spontaniously respond to the sound",
          ligne5: "At the end, open your eyes and see"
        },
        lancement: {
          ligne1: "To start",
          ligne2: "Click",
          ligne3: "Here"
        }
      }
    }
  }
}
