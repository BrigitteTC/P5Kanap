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

      //on récupère l'id du produit
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
          FoundProduct = true; /*on a trouvé le produit*/
        } else {
          LoopIndex++; /* pas trouvé on incrémente d'index*/
        }
      }

      //le produit à afficher
      let Product = data[LoopIndex];

      //Affichage du résultat dans le HTML

      //Maj titre  id='title'
      document.getElementById("title").innerHTML = Product.name;

      // maj prix id='price'
      document.getElementById("price").innerHTML = Product.price;

      //Maj image  class= 'item__img'
      //creation elt img
      let newImg = document.createElement("img");
      //recuperation elt de la class item_img
      let newItem = document.getElementsByClassName("item__img");
      //ajout de l'enfant img a l'elt de class Item_img.
      // attention on recupere un tableau dont il faut prendre le 1ier elt
      newItem[0].appendChild(newImg);

      //maj img
      newImg.src = Product.imageUrl;

      newImg.alt = Product.altTxt;

      //maj description  id="description"
      document.getElementById("description").innerHTML = Product.description;

      //maj options  id="colors"
      // on recupere l'elt avec id "colors"
      let eltOptions = document.getElementById("colors");
      //boucle sur les options de couleur pour crer les enfants correspondants
      let numCouleur = 0; //numero de couleur
      for (numCouleur in Product.colors) {
        //creation elt
        let newOption = document.createElement("option");
        //ajout de l'enfant 'option'
        eltOptions.appendChild(newOption);
        //maj option
        newOption.innerHTML = Product.colors[numCouleur];
        console.log(Product.colors[numCouleur]);
      }

      //le bouton
      let eltButton = document.getElementById("addToCart");
      let newa = document.createElement("a"); //lien du bouton
      eltButton.appendChild(newa);
      newa.href = "./cart.html?id=" + Product._id;

      //DEBUG: affichage elts
      console.log(LoopIndex);
      console.log(data[LoopIndex].name);
      console.log(data[LoopIndex].imageUrl);
      console.log(data[LoopIndex].altTxt);
    } else {
      console.error("Retour du serveur:", response.status);
    }
  } catch (e) {
    console.log(e);
  }
};

// Appel de la ft pour récupérer les produits

getProductById(serverGET);
