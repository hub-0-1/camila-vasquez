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
        design_typo: "Là où nous passons du temps ensemble",
        lexique: "Bref lexique illustré non exhaustif",
        tableau_blanc: "Dessins sonores",
        portraits: "Portraits à l'aveugle",
        collage: "Collage de collages",
        info: "Info",
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
      },
      info: {
        a_propos: {
          titre: "À propos",
          p1: "est un laboratoire socio-artistique qui a eu lieu à Waterville de 2019 à 2020. Durant un an, un groupe de huit familles hétéroparentales, nucléaires, recomposées et monoparentales se sont réunies pour créer et réfléchir ensemble sur le sens que prend la famille et ses défis dans nos sociétés contemporaines.",
          p2: "Le projet a été réalisé par l'artiste Camila Vásquez dans le cadre de la résidence d’artiste du Laboratoire communautaire d'art de la Galerie d'art Foreman et la résidence d'artiste du Centre culturel et communautaire de Waterville.",
          p3: "Le travail réalisé durant ce laboratoire a été mené par des personnes d'origine latinomaéricaine, asiatique, européenne et nord-américaine, résidant au Canada. Nous reconnaissons le contexte privilégié à partir duquel nous réfléchissons nos réalités, en tant qu’habitantes et habitants d'un pays développé, bénéficiant d'un cadre socio-économique stable. Nous espérons mettre en commun nos expériences avec celles des autres, en ce qu'il y a d'universel chez l'humain, tout en prenant en considération les multiples différences qui nous distinguent entre nous."
        },
        contact: {
          titre: "Contact",
          p1: "Ce site web a été produit par la Galerie d’art Foreman et a été programmé par 0/1 - Hub numérique Estrie.",
          p2: "Les animations ont été créés par Carl C. Ferland."
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
        portraits: "Blind portraits",
        collage: "Cartography",
        info: "Info",
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
      },
      info: {
        a_propos: {
          titre: "À propos",
          p1: "(Rethinking the Family: From utopia to new strategies) is a socio-artistic laboratory which took place in Waterville from 2019 to 2020. During the year, a group of eight heteroparental, nuclear, blended, and single-parent families joined together to create and reflect on the meaning family takes and its challenges in our contemporary societies.",
          p2: "The project was produced by artist Camila Vásquez as part of the Artist Residency at the Community Art Lab of the Foreman Art Gallery and as part of the Artist Residency at the Waterville Community and Cultural Center.",
          p3: "The work carried out during this laboratory was carried out by people of Latin American, Asian, European and North American origin, residing in Canada. We recognize the privileged context from which we reflect on our realities, as inhabitants of a developed country, benefiting from a stable socio-economic framework. We hope to find commonality in our experiences, in what is universal in humans, while taking into consideration the multiple differences that distinguish us from one another."
        },
        contact: {
          titre: "Contact",
          p1: "This website was produced by the Foreman Art Gallery and programmed by the 0/1 - Hub numérique de l’Estrie.",
          p2: "The animations were created by Carl C. Ferland."
        }
      }
    }
  }
}
