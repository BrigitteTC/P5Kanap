/* product.js
date: 21/02/2022
auteur: BTC

Script pour mettre à jour la page du canapé sur la page html correspondante
*******************************************************************/

//server avec la liste des produits
var serverGET = "http://localhost:3000/api/products";

//REcherche id passé dans la page HTML

//---------------------------------------------------
//fonction getId
// Retourne l'id du produit de la page
//params entrée: aucun
//retour: id
//------------------------------------------------

function getId() {
  var str = window.location.href;
  console.log(str);
  var url = new URL(str);
  var search_params = new URLSearchParams(url.search);
  if (search_params.has("id")) {
    var id = search_params.get("id");
    console.log(id);
    return id;
  }
}

//On récupère l'id de la page
var productId = getId;
console.log(productId);

//--------------------------------------------------------------
// ft getProducts
// nom: getProduct
// Paramètres:
//  server: adresse duserveur avec les données à récupérer
// retour: data: données récupérées
//
// algo:
//  lit les données du serveur
// await: attend le retour de la promese
//-------------------------------------------------------------
var getProductById = async function (server) {
  let data; //données récupérées par la ft
  try {
    let response = await fetch(server);
    if (response.ok) {
      data = await response.json();
      console.log(data);

      var str = window.location.href;
      console.log(str);
      var url = new URL(str);
      var search_params = new URLSearchParams(url.search);
      if (search_params.has("id")) {
        var ProductId = search_params.get("id");
        console.log(ProductId);
      }

      //recherche de l'Id
      let FoundProduct = false; /*init boolean à false Sera true quand on aura trouve*/
      LoopIndex = 0; /*index de boucle pour parcourir les produits*/
      while (LoopIndex < data.length && FoundProduct === false) {
        if (data[LoopIndex]._id === ProductId) {
          FoundProduct = true;
        }
        LoopIndex++;
      }

      //Affichage du résultat dans le HTML

      // creation des elts du html
      //Maj titre  id='title'
      document.getElementById("title").innerHTML = data[LoopIndex].name;

      //Maj image  class= item__img"

      //maj description  id="description"

      //maj options  id="colors"

      //DEBUG: affichage elts
      console.log(LoopIndex);
      console.log(data[LoopIndex].name);
    } else {
      console.error("Retour du serveur:", response.status);
    }
  } catch (e) {
    console.log(e);
  }
};

// Appel de la ft pour récupérer les produits

getProductById(serverGET);
