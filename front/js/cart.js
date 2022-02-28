/*--------------------------
 cart.js
date: 26/02/2022
auteur: BTC

Script pour mettre à jour la page panier
*******************************************************************/
//----------------------------------------------------------------
//Definition local storage
//
// clé:nom du canapé_couleur
//      exemple:

//----------------------------------------------------------------
// function: addItemInLocalStorage(productId);
//Objet:
//Parametres:
//  Entrée: ProductId: produit à ajouter
//  Sortie
// Algo
//  construit la clé = nom+couleur
//  lit le local storage pour cette cle
//    si la cle existe, on va recuperer une valeur poru le couple canape couleur
//    il faudra mettre à jour la quantité avec la nouvelle qte achetee
//    verifier qu'on ne depasse pas 100
//---------------------------------------------------------------
function addItemInLocalStorage(productId) {
  try {
    //cle correspondant au nouveau produit
    //nom+couleur
    let cleElt = productId.nom + productId.couleur;
    console.log("cle= " + cleElt);

    //teste clé existe déja ds le local storage
    if (cleElt in localStorage) {
      //Récupere le produit dans le local storage pour la cle donnée
      let currentPanierJson = localStorage.getItem(cleElt);
      let currentPanier = JSON.parse(currentPanierJson);

      //complete avec le nouveau produit
      productId.nb += currentPanier.nb;
      //Verif nb <100
    }

    //Ajoute le nouveau produit
    // mets le  nouveau produit en JSON
    let productIdJson = JSON.stringify(productId);
    localStorage.setItem(cleElt, productIdJson);
  } catch (e) {
    console.log("addItemInLocalStorage:" + e);
  }
}

//--------------------------------------------------------------
// ft: displayLocalStorageInHtml();
// nom: displayLocalStorageInHtml(productId);
// Objet: maj de la page html avec les infos de ProductId
//
// Parametres:
//  Entrée: rien
//  Sortie: rien
//
// algo:
//  Parcours toutes les clés du local storage pour insérer les objets
//  correspondants dansla page html
//
//--------------------------------------------------------------
function displayLocalStorageInHtml() {}

//----------------------------------------------------------------
// ft getProductByIdNbColor
// nom: getProductByIdNbColor
// Objet: Récupère les infos du produit passées dans l'URL
//    les affiche dans le panier
//    et appelle la page confirmation si click sur le bouton.
// Paramètres:
//  entrée:
//    server: adresse du serveur avec les données à récupérer
//  retour: rien
//
// algo:
// Récupère l'id , le nb et la couleur passés dans l'URL
// récupère le prix dans le serveur pour cet ID
//  Maj du local storage
//  Si click sur le bouton: envoie le panier à la page confirmation.
//
// await: attend le retour de la promese
//-------------------------------------------------------------
var getProductByIdNbColor = async function (server) {
  let data; //données récupérées par la ft
  try {
    //on récupère les infos du produit passé dans l'URL

    let productId = getInfoInURL();
    console.log("id produit= " + productId.id);

    console.log("nb produits=" + productId.nb);

    console.log("couleur produit = " + productId.couleur);

    //Construction de la route du produit
    server = server + "/" + productId.id;
    console.log("route produit=" + server);

    // Recherche data du produit sur le serveur
    let response = await fetch(server);
    if (response.ok) {
      //le produit à afficher
      let product = await response.json();
      //On complète avec les infos du server

      productId.prix = product.price; //prix
      productId.nom = product.name; //nom
      productId.imageUrl = product.imageUrl;
      productId.altTxt = product.altTxt;

      console.log("prix produit= " + productId.prix);
      console.log("nom du canape= " + productId.nom);

      // stockage dans le local storage
      addItemInLocalStorage(productId);

      //Affichage du résultat dans le HTML
      displayLocalStorageInHtml();

      // Traitement du click sur le bouton
      let eltButton = document.getElementById("order");
      eltButton.addEventListener("click", function () {
        console.log("on a cliqué sur le bouton order");
        // Envoi des infos vers page confirmation
      });
    } else {
      console.error("Retour du serveur:", response.status);
    }
  } catch (e) {
    console.log("getProductByIdNbColor: " + e);
  }
};

// Appel de la ft pour récupérer le produit avec le nb et sa couleur

getProductByIdNbColor(C_serverGET);
