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

//----------------------------------------------------
// getNbProduct();
// fonction: retourne le nombre de produits sélectionnés
// paramètre entrée: rien
// paramètre de sortie: nombre de produits
//
// algo: vérifie nb min et max selectionné
// retourne le nombre select
// message d'alerte su la quantité est 0 ou > 1000
//---------------------------------------------
function getNbProduct() {
  let eltQty = document.getElementById("quantity");
  // Valeur rentrée

  // test valeur comprise entre min et max
  // On rentre les valeurs en dur 1 et 100 pour éviter qu'un utilisateur
  // ne modifie le code de min et max

  // et tester nombre entier (on ne veut pas de nombre décimal)
  if (
    !Number.isInteger(eltQty.value) ||
    Number(eltQty.value) < 1 ||
    Number(eltQty.value) > 100
  ) {
    // message d'erreur
    // A voir utilisation alert
    // on efface la quantite

    // tester les chiffres à virgule  .  A refuser
    //window.open("donnez un nombre entier compris entre 1 et 100");
    eltQty.value = 0;
  }
  return Number(eltQty.value);
}

//----------------------------------------------------
// getCouleur();
// fonction: retourne la couleur sélectionnée
// paramètre entrée: rien
// paramètre de sortie: couleur
//
// algo:
//
//---------------------------------------------
function getCouleur() {
  // A completer
  let eltColor = document.getElementById("color");
  let Couleur = eltColor.option; // couleur choisie
  console.log(Couleur);

  //test 1 valeur a été choisie
  if (Couleur === "Undefined") {
    //alerte: choisissez une couleur
  }
  return Couleur;
}

//--------------------------------------------------------------
// ft getProducts
// nom: getProduct
// Paramètres:
//  server: adresse du serveur avec les données à récupérer
// retour: data: données récupérées
//
// algo:
//  lit les données du serveur
// await: attend le retour de la promese
//-------------------------------------------------------------
var getProductById = async function (server) {
  let data; //données récupérées par la ft
  try {
    //on récupère l'id du produit passé dans l'URL
    var str = window.location.href;
    console.log(str);
    var url = new URL(str);
    var search_params = new URLSearchParams(url.search);
    if (search_params.has("id")) {
      var ProductId = search_params.get("id");
      console.log(ProductId);
    }

    //Construction de la route du produit
    server = server + "/" + ProductId;
    console.log(server);

    // Recherche data du produit sur le serveur
    let response = await fetch(server);
    if (response.ok) {
      //le produit à afficher
      let Product = await response.json();
      console.log(Product);

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

      //le boutton
      let eltButton = document.getElementById("addToCart");

      // Traitement du click sur le bouton
      eltButton.addEventListener("click", function () {
        console.log("on a cliqué");
        // Verif nb de canapes choisis
        let nbProduct = getNbProduct(); //nb de canapés choisis
        if (nbProduct > 0) {
          //Verif option couleur choisie
          let couleur = getCouleur();
          // go vers la page panier avec l'id et la couleur choisie
          window.location.href =
            "../html/cart.html?id=" +
            Product._id +
            "?color=" +
            couleur +
            "?nb=" +
            nbProduct;
        }
      });

      //DEBUG: affichage elts
      console.log(Product);
      console.log(Product.name);
      console.log(Product.imageUrl);
      console.log(Product.altTxt);
    } else {
      console.error("Retour du serveur:", response.status);
    }
  } catch (e) {
    console.log(e);
  }
};

// Appel de la ft pour récupérer les produits

getProductById(serverGET);
