/* product.js
date: 21/02/2022
auteur: BTC

Script pour mettre à jour la page du canapé sur la page html correspondante
*******************************************************************/

//----------------------------------------------------------------
// getNbProduct();
// fonction: retourne le nombre de produits sélectionnés
// paramètre entrée: rien
// paramètre de sortie: nombre de produits
//
// algo: vérifie nb min et max selectionné
// retourne le nombre select
// message d'alerte si la quantité est <1 ou > 1000 ou nb decimal
//---------------------------------------------------------------
function getNbProduct() {
  // A completer: verifier que le nb rentré n'est pas decimal
  // Valeur rentrée
  let eltQty = document.getElementById("quantity");
  let qtyInteger = Number(eltQty.value); //valeur transformee en nombre
  // Valeur rentrée
  console.log(qtyInteger);

  // test valeur comprise entre min et max
  // On rentre les valeurs en dur 1 et 100 pour éviter qu'un utilisateur
  // ne modifie le code de min et max

  // et tester nombre entier (on ne veut pas de nombre décimal)

  if (Number.isInteger(qtyInteger) === false) {
    // on remet à 0
    eltQty.value = 0;
    alerteMsg("Nombre d'articles: rentrez un nombre entier");
  } else {
    if (qtyInteger < 1) {
      alerteMsg("Nombre d'articles: Il faut au moins 1 canapé");
      // on remet à 0
      eltQty.value = 0;
    } else {
      if (qtyInteger > 100) {
        alerteMsg("Nombre d'articles: pas plus de 100 canapés");
        // on remet à 0
        eltQty.value = 0;
      }
    }
  }
  return Number(eltQty.value);
}

//----------------------------------------------------
// getCouleur();
// fonction: retourne la couleur sélectionnée
// paramètre entrée: rien
// paramètre de sortie: couleur
//
// algo: Récupère l'option "checked" de l'ID colors
// Si  vide, affiche un message d'erreur
//  retourne la valeur sélectionnée.
//
//---------------------------------------------
function getCouleur() {
  // cherche la couleur sélectionnée
  // ajouter value
  // récuperer option.value
  let couleur = document.querySelector("#colors option:checked");

  console.log(couleur.value);
  //la chaine récupérée est du type:

  //test 1 valeur a été choisie
  if (couleur.value === "") {
    //alerte: choisissez une couleur
    alerteMsg("choisissez une couleur");
  }
  return couleur.value;
}

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
var getProductById = async function (server) {
  let data; //données récupérées par la ft
  try {
    //on récupère l'id du produit passé dans l'URL

    let productId = getId();
    console.log(productId);

    //Construction de la route du produit
    server = server + "/" + productId;
    console.log(server);

    // Recherche data du produit sur le serveur
    let response = await fetch(server);
    if (response.ok) {
      //le produit à afficher
      let product = await response.json();
      console.log(product);

      //Affichage du résultat dans le HTML

      //Maj titre  id='title'
      document.getElementById("title").innerHTML = product.name;

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
        console.log("on a cliqué sur ajouter au panier");
        // Verif nb de canapes choisis
        let nbProduct = getNbProduct(); //nb de canapés choisis
        if (nbProduct > 0) {
          //Verif option couleur choisie
          let couleur = getCouleur();

          // Verif couleur choisie est bien dans les options
          if (couleur !== "") {
            // go vers la page panier avec l'id et la couleur choisie
            window.location.href =
              "../html/cart.html" +
              C_separatorURL +
              "id" +
              C_egal +
              product._id +
              C_separatorURL +
              "color" +
              C_egal +
              couleur +
              C_separatorURL +
              "nb" +
              C_egal +
              nbProduct;
          }
        }
      });

      //DEBUG: affichage elts
      console.log("produit=" + product);
      console.log("nom du produit= " + product.name);
      console.log("URL image = " + product.imageUrl);
      console.log("alt = " + product.altTxt);
    } else {
      console.error("Retour du serveur:", response.status);
    }
  } catch (e) {
    console.log("getProductById " + e);
  }
};

// Appel de la ft pour récupérer les produits

getProductById(C_serverGET);
