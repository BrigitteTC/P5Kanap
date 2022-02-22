/* product.js
date: 21/02/2022
auteur: BTC

Script pour mettre à jour la page du canapé sur la page html correspondante
*******************************************************************/

//REcherche id passé dans la page HTML

//---------------------------------------------------
//fonction getId
// Retourne l'id du produit de la page
//params entrée: aucun
//retour: id
//------------------------------------------------

var id = function () {
  var str = window.location.href;
  console.log(str);
  var url = new URL(str);
  var search_params = new URLSearchParams(url.search);
  if (search_params.has("id")) {
    var id = search_params.get("id");
    console.log(id);
    return id;
  }
};
