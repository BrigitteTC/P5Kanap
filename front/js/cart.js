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
      //prix:

      productId.prix = product.price;
      console.log("prix produit=" + productId.prix);

      // stockage dans le local storage

      //Affichage du résultat dans le HTML

      // Traitement du click sur le bouton
      let eltButton = document.getElementById("order");
      eltButton.addEventListener("click", function () {
        console.log("on a cliqué sur le bouton order");
        // Verif nb de canapes choisis
      });
    } else {
      console.error("Retour du serveur:", response.status);
    }
  } catch (e) {
    console.log(e);
  }
};

// Appel de la ft pour récupérer le produit avec le nb et sa couleur

getProductByIdNbColor(C_serverGET);
