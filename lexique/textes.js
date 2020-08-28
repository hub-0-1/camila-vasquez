var textes = {
  appartenir: { 
    original: "$appartenir$ @v. intr. . conjug.@ _1._ %Faire partie de (qqch.).% *Appartenir à une vielle famille du pays.*",
    interpretation: "$appartenir à une communauté$ _1._ %Formule alternative ou complémentaire à la famille nucléaire, qui propose une possible solution à la solitude et l'isolement de l'individu, à la séparation des couples et à la dissolution des liens des familles élargies, phénomènes de l'ère actuelle, caractéristiques des sociétés capitalistes.%" 
  }
} 

function parser (texte) {
  texte = texte.replace(/%([-'0-9a-zÀ-ÿ'\s\.\(\),]+)%/gi, "<span class='baskerville'>$1</span>");
  texte = texte.replace(/_([-'0-9a-zÀ-ÿ'\s\.\(\)]+)_/gi, "<span class='baskerville bold'>$1</span>");
  texte = texte.replace(/\*([-'0-9a-zÀ-ÿ'\s\.\(\)]+)\*/gi, "<span class='baskerville italic'>$1</span>");
  texte = texte.replace(/\$([-'0-9a-zÀ-ÿ'\s\.\(\)]+)\$/gi, "<span class='baskerville bold italic'>$1</span>");
  texte = texte.replace(/@([-'0-9a-zÀ-ÿ'\s\.\(\)]+)@/gi, "<span class='optima'>$1</span>");

  return texte;
}

function parser_entree (texte) {
  return { original: parser(texte.original), interpretation: parser(texte.interpretation) };
}

function traiter_textes () {
  let textes_traites = {};

  Object.keys(textes).map((entree) => {
    textes_traites[entree] = parser_entree(textes[entree]);
  });

  return textes_traites;
}

