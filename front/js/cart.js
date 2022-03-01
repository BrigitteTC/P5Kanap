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
    let cleElt = productId.nom + C_separatorKey + productId.couleur;
    console.log("cle= " + cleElt);

    //teste clé existe déja ds le local storage
    if (cleElt in localStorage) {
      //Récupere le produit dans le local storage pour la cle donnée
      let currentPanierJson = localStorage.getItem(cleElt);
      let currentPanier = JSON.parse(currentPanierJson);

      //complete avec le nouveau produit
      productId.nb += Number(currentPanier.nb);
      //Verif nb <100
      if (productId.nb > 100) {
        alerteMsg(
          "Vous ne pouvez pas acheter plus de 100 canapés de même type"
        );
        productId.nb = Number(currentPanier.nb); //nb remis a valeur initiale
      }
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
function displayLocalStorageInHtml() {
  try {
    //init prix et auantité total à 0
    let prixTotal = 0;
    let qtyTotal = 0;

    //Parcours de toutes les clés du local storage
    for (let i = 0; i < localStorage.length; i++) {
      console.log("cle " + i + " " + localStorage.key(i));
      let itemPanierJSON = localStorage.getItem(localStorage.key(i));
      let itemPanier = JSON.parse(itemPanierJSON);
      //Affiche l'item
      displayItemInHtml(itemPanier);

      //calcule prix total
      prixTotal += Number(itemPanier.nb) * Number(itemPanier.prix);

      //calcule quantité totale:
      qtyTotal += Number(itemPanier.nb);
    }

    //Affiche le prix dans l'ecran
    displayPrixTotal(prixTotal, qtyTotal);
  } catch (e) {
    console.log("displayLocalStorageInHtml " + e);
  }
}

//-------------------------------------------
// ft displayItemInHtml(itemPanier);
// Objet: construit la structure html pour l'affichage du produit
//  mets à jour les balises avec le param
//parametres:
//  Entrée: itemPanier: article à ajouter dans le html
//  Sortie: rien
//
// Algo:
//  Cree tous les elts du html
//  Ajoute les enfants en ft de la structure demandée
//  Mets à jour le contenu HTML
//---------------------------------------------
function displayItemInHtml(itemPanier) {
  try {
    //structure html
    //on recupere le id items qui contiendra les articles des canapés
    let eltSection = document.getElementById("cart__items");
    //creation de l'elt article
    let newArticle = document.createElement("article");

    //Creation des div et leurs enfants
    let newDiv1 = document.createElement("div");
    let newDiv1Img = document.createElement("img");

    let newDiv2 = document.createElement("div");
    let newDiv21 = document.createElement("div");

    let newDiv21h2 = document.createElement("h2");
    let newDiv21p1 = document.createElement("p");
    let newDiv21p2 = document.createElement("p");

    let newDiv3 = document.createElement("div");
    let newDiv31 = document.createElement("div");
    let newDiv31p = document.createElement("p");
    let newDiv31Input = document.createElement("input");

    let newDiv32 = document.createElement("div");
    let newDiv32p = document.createElement("p");

    //article =enfant de section
    eltSection.appendChild(newArticle);

    //Div1 avec l'image
    newArticle.appendChild(newDiv1);
    newDiv1.appendChild(newDiv1Img);

    //nouvelle div div2 avec nom couleur et prix
    newArticle.appendChild(newDiv2);
    newDiv2.appendChild(newDiv21);
    newDiv21.appendChild(newDiv21h2);
    newDiv21.appendChild(newDiv21p1);
    newDiv21.appendChild(newDiv21p2);

    //nouvelle div div3
    newArticle.appendChild(newDiv3);

    //div31 enfant de div3 avec quantité et input
    newDiv3.appendChild(newDiv31);
    newDiv31.appendChild(newDiv31p);
    newDiv31.appendChild(newDiv31Input);

    //div32 enfant de div3 avec bouton supprimer
    newDiv3.appendChild(newDiv32);
    newDiv32.appendChild(newDiv32p);

    //Maj classes des balises
    newArticle.classList.add("cart__item");
    newDiv1.classList.add("cart__item__img");
    newDiv2.classList.add("cart__item__content");
    newDiv21.classList.add("cart__item__content__description");
    newDiv3.classList.add("cart__item__content__settings");
    newDiv31.classList.add("cart__item__content__settings__quantity");
    newDiv31Input.classList.add("itemQuantity");
    newDiv32.classList.add("cart__item__content__settings__delete");
    newDiv32p.classList.add("deleteItem");

    //maj contenu elts:
    newArticle.setAttribute("data-id", itemPanier.nom);
    newArticle.setAttribute("data-color", itemPanier.couleur);

    newDiv1Img.src = itemPanier.imageUrl;
    newDiv1Img.altTxt = itemPanier.altTxt;

    newDiv21h2.innerHTML = itemPanier.nom;
    newDiv21p1.innerHTML = itemPanier.couleur;
    newDiv21p2.innerHTML = itemPanier.prix + "€";

    newDiv31p.innerHTML = "Qté";
    newDiv31Input.type = "number";
    newDiv31Input.name = itemPanier.nb;
    newDiv31Input.min = "1";
    newDiv31Input.max = "100";
    newDiv31Input.value = itemPanier.nb;

    newDiv32p.innerHTML = "Supprimer";
  } catch (e) {
    console.log("displayItemInHtml" + e);
  }
}

//----------------------------------------------------------------
//displayPrixTotal(prixTotal);
//Objet: affiche le prix total sur l'ecran
//
// Parametres:
//  Entree: prixTotal: prix à afficher
//          qtyTotal: quantité totale d'articles
//  Sortie: rien
//
// Algo:
//  maj "span" avec le prix passé en param
//    + maj quantité
//------------------------------------------------------------
function displayPrixTotal(prixTotal, qtyTotal) {
  try {
    // affichage quantité:
    let eltSpanQty = document.getElementById("totalQuantity");
    eltSpanQty.innerHTML = qtyTotal;
    //Affiche prix total
    let eltSpanPrix = document.getElementById("totalPrice");
    //creation de l'elt article
    eltSpanPrix.innerHTML = prixTotal;
  } catch (e) {
    console.log("displayPrixTotal" + e);
  }
}
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
      productId.description = product.description;

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
