/*--------------------------
 cart.js
date: 26/02/2022
auteur: BTC

Script pour mettre à jour la page panier
*******************************************************************/

//--------------------------------------------------------------
// ft getProductById
// nom: getProduct
// Paramètres:
//  server: adresse du serveur avec les données à récupérer
// retour: data: données récupérées
//
// algo:
// Récupère l'id passé dans l'URL
// En ft de l'ID, récupère les données du serveur pour cet ID
//    Affiche le produit dan sle HTML
// Attend le click sur le bouton
//    Vérifie le nb et la couleur sélectionnés par l'utilisateur
//    Si ces données sont valides:
//      Envoie les infos sur la page panier
//
// await: attend le retour de la promese
//-------------------------------------------------------------
var getProductByIdNbColor = async function (server) {
  let data; //données récupérées par la ft
  try {
    //on récupère l'id du produit passé dans l'URL

    let productId = getInfoInURL(id);
    console.log(productId);

    //On récupère le nb de produits
    let productNb = getInfoInURL(color);

    //On récupère la couleur
    let productColor = getColorinURL(nb);

    //Construction de la route du produit
    server = server + "/" + productId;
    console.log(server);

    // Recherche data du produit sur le serveur
    let response = await fetch(server);
    if (response.ok) {
      //le produit à afficher
      let Product = await response.json();
      console.log(Product);

      // stockage dans le local storage

      //Affichage du résultat dans le HTML

      //Maj titre  id='title'
      document.getElementById("title").innerHTML = Product.name;

      // maj prix id='price'
      document.getElementById("price").innerHTML = product.price;

      //Maj image  class= 'item__img'
      //creation elt img
      let newImg = document.createElement("img");
      //recuperation elt de la class item_img
      let newItem = document.getElementsByClassName("item__img");
      //ajout de l'enfant img a l'elt de class Item_img.
      // attention on recupere un tableau dont il faut prendre le 1ier elt
      newItem[0].appendChild(newImg);

      //maj img
      newImg.src = product.imageUrl;

      newImg.alt = product.altTxt;

      //maj description  id="description"
      document.getElementById("description").innerHTML = product.description;

      //maj options  id="colors"
      // on recupere l'elt avec id "colors"
      let eltOptions = document.getElementById("colors");
      //boucle sur les options de couleur pour crer les enfants correspondants
      let numCouleur = 0; //numero de couleur
      for (numCouleur in product.colors) {
        //creation elt
        let newOption = document.createElement("option");
        //ajout de l'enfant 'option'
        eltOptions.appendChild(newOption);

        // ajout value
        let newValue = document.createElement("value");
        newOption.appendChild(newValue);
        //maj value
        newValue.innerHTML = product.colors[numCouleur];
        console.log(product.colors[numCouleur]);
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

          // Verif couleur choisie est bien dans les options
          if (couleur !== "") {
            // go vers la page panier avec l'id et la couleur choisie
            window.location.href =
              "../html/cart.html?id=" +
              product._id +
              "?color=" +
              couleur +
              "?nb=" +
              nbProduct;
          }
        }
      });

      //DEBUG: affichage elts
      console.log(product);
      console.log(product.name);
      console.log(product.imageUrl);
      console.log(product.altTxt);
    } else {
      console.error("Retour du serveur:", response.status);
    }
  } catch (e) {
    console.log(e);
  }
};

// Appel de la ft pour récupérer le produit avec le nb et sa couleur

getProductByIdNbColor(C_serverGET);
