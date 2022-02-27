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
//---------------------------------------------------------------
function addItemInLocalStorage(productId) {
  //cle correspondant au nouveau produit
  //nom+couleur
  let cleElt = productId.nom + productId.couleur;
  console.log("cle= " + cleElt);

  //lit le local storage pour cette cle
  let currentPanier = localStorage.getItem(cleElt);

  //Ajoute le nouveau produit
  //boucle sur toutes les clés du local storage
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    //verif key existe deja
    if (key === cleElt) {
      //Ajout du produit
    } else {
      //Cree la nouvelle cle avec le nouveau produit
    }
  }

  //Mise à jour du local Storage avec la clé mise à jour
}

//--------------------------------------------------------------
// ft getProductByIdNbColor
// nom: getProductByIdNbColor
// Paramètres:
//  server: adresse du serveur avec les données à récupérer
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
      //prix:

      productId.prix = product.price;
      productId.nom = product.name;

      console.log("prix produit= " + productId.prix);
      console.log("nom du canape= " + productId.nom);

      // stockage dans le local storage
      addItemInLocalStorage(productId);

      //Affichage du résultat dans le HTML
      // displayLocalStorageInHtml();

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
    console.log(e);
  }
};

// Appel de la ft pour récupérer le produit avec le nb et sa couleur

getProductByIdNbColor(C_serverGET);
