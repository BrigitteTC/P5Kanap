/*--------------------------
 cart.js
date: 26/02/2022
auteur: BTC

Script pour mettre à jour la page panier

Les donnees sont stockees dan sle local storage.
*******************************************************************/
//----------------------------------------------------------------
//Definition local storage
//
//  "totaItems", nombre total d'items
//  ""prixTotal", Prix total
// tous les articles de même modele et même couleur
//  "cle", elt
//avec:
// clé:nom du canapé_couleur
//      exemple:Kanap Autonoé_Pink
//  elt: elt de classe paramPanier avec tous les parametres du canapé
//----------------------------------------------------------------

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
  //init nb total d'elt à 0
  var totalElt = 0;

  //init prix total à 0
  var totalPrix = 0;

  var currentPanier; //panier du local storage pour le produit passé en param
  try {
    //cle correspondant au nouveau produit
    //nom+couleur
    let cleElt = productId.nom + C_separatorKey + productId.couleur;
    console.log("cle= " + cleElt);

    //teste clé existe déja ds le local storage
    if (cleElt in localStorage) {
      //Récupere le produit dans le local storage pour la cle donnée
      let currentPanierJson = localStorage.getItem(cleElt);
      currentPanier = JSON.parse(currentPanierJson);

      //complete avec le nouveau produit
      productId.nb = Number(productId.nb) + Number(currentPanier.nb);
    }
    //Verif nb <=100
    if (productId.nb > 100) {
      alerteMsg(
        "Vous ne pouvez pas acheter plus de 100 canapés de même type"

        // ATTENTION il faut faire ici la verif nb total <=100 pour ne pas ajouter le prosuit
      );
      //productId.nb = Number(currentPanier.nb); //nb remis a valeur initiale
    } else {
      //Mets à jour nb elt total et prix total dans le local storage
      if (C_totalElt in localStorage) {
        //la cle total elt existe on récupère la valeur
        let totalEltJson = localStorage.getItem(C_totalElt);
        totalElt = Number(JSON.parse(totalEltJson));
      }

      //nouveau total d'elt
      totalElt = Number(productId.nb) + Number(totalElt);

      //Teste total elt <100
      if (Number(totalElt > 100)) {
        alerteMsg("Vous ne pouvez pas acheter plus de 100 canapés ");
      } else {
        //Ajoute le nouveau produit
        // mets le  nouveau produit en string et le range dans le local storage
        let productIdString = JSON.stringify(productId);
        localStorage.setItem(cleElt, productIdString);

        // range elt total dans local storage
        localStorage.setItem(C_totalElt, JSON.stringify(Number(totalElt)));

        //maj prix total

        if (C_totalPrix in localStorage) {
          //la cle prix total existe on récupère la valeur
          let totalPrixJson = localStorage.getItem(C_totalPrix);
          totalPrix = Number(JSON.parse(totalPrixJson));
        }
        let prixNouveauPd = Number(
          Number(productId.nb) * Number(productId.prix)
        );
        totalPrix = Number(totalPrix) + Number(prixNouveauPd);

        localStorage.setItem(C_totalPrix, JSON.stringify(totalPrix));
      }
    }
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
//  calcule le nombre total d'elts
//  calcule le prix total
//  Affiche le prix total et nb d'elt total dans la page html
//
//--------------------------------------------------------------
function displayLocalStorageInHtml() {
  try {
    //init prix et quantité total à 0
    let prixTotal = 0;
    let qtyTotal = 0;

    //Parcours de toutes les clés du local storage
    // on commence la boucle à 0
    // Attention ne pas afficher les cles "nb elt" et "prix total"

    for (let i = 0; i < localStorage.length; i++) {
      console.log("cle " + i + " " + localStorage.key(i));

      if (
        localStorage.key(i) != C_totalElt &&
        localStorage.key(i) != C_totalPrix
      ) {
        //affichage de tous les articles
        let itemPanierJSON = localStorage.getItem(localStorage.key(i));
        let itemPanier = JSON.parse(itemPanierJSON);
        //Affiche l'item
        displayItemInHtml(itemPanier);

        //calcule prix total
        prixTotal =
          Number(prixTotal) +
          Number(Number(itemPanier.nb) * Number(itemPanier.prix));

        //calcule quantité totale:
        qtyTotal = Number(qtyTotal) + Number(itemPanier.nb);
      }
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
    let eltSection = document.getElementById(C_cart__itemsClass);
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
    newArticle.classList.add(C_cart__itemClass);
    newDiv1.classList.add("cart__item__img");
    newDiv2.classList.add("cart__item__content");
    newDiv21.classList.add("cart__item__content__description");
    newDiv3.classList.add("cart__item__content__settings");
    newDiv31.classList.add("cart__item__content__settings__quantity");
    newDiv31Input.classList.add(C_itemQuantityClass);
    newDiv32.classList.add("cart__item__content__settings__delete");
    newDiv32p.classList.add(C_deleteItemClass);

    //maj contenu elts:
    newArticle.setAttribute("data-id", itemPanier.nom);
    newArticle.setAttribute("data-color", itemPanier.couleur);

    newArticle.setAttribute(
      "id",
      itemPanier.nom + C_separatorKey + itemPanier.couleur
    ); //ajout d'un id avec la cle du local storage

    newDiv1Img.src = itemPanier.imageUrl;
    newDiv1Img.altTxt = itemPanier.altTxt;

    newDiv21h2.innerHTML = itemPanier.nom;
    newDiv21p1.innerHTML = itemPanier.couleur;
    newDiv21p2.innerHTML = itemPanier.prix + "€";

    newDiv31p.innerHTML = "Qté";
    newDiv31Input.type = "number";
    newDiv31Input.name = itemPanier.nb; //A confirmer il faut mettre le nombre ??????//
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

//-----------------------------------------------------------
//Fonction: waitClickOnSupprimer();
// Objet: Attend le click sur le bouton "supprimer" d'un elt
//
// Parametres:
//  entrée: rien
//  sortie: rien
//
//  Algo
//    REcherche ts les elts avec la classe "supprimer"
//    Ecoute sur tous les elts de cette class
//    Si click sur un elt
//       REcherche l'id de l'Article parent
//        Supprime cet elt dans le local stortage
//        Supprime l'article de la page html
//        Affiche la nouvelle page html
//----------------------------------------------------------------
function waitClickOnSupprimer() {
  try {
    //recherche de ts les elts qui ont la classe deleteItem
    //à l'intérieur d'un elt ayant l'ID "cart__items"
    let eltSection = document.getElementById(C_cart__itemsClass);
    let eltsSupprimer = eltSection.getElementsByClassName(C_deleteItemClass); //tableau avec tous les elts de la class

    for (let i = 0; i < eltsSupprimer.length; i++) {
      //Element html "supprimer" correspondant à la clé

      eltsSupprimer[i].addEventListener("click", function () {
        //on a cliqué sur l'elt supprimer
        // on remonte la filiere poru avoir l'article correspondant
        //Article est 3 niveaux au dessous du bouton supprimer
        let eltArticle = eltsSupprimer[i].parentNode.parentNode.parentNode;
        console.log("waitClickOnSupprimer: clic bouton supprimer =");

        //HTML: supprime le noeud avec l'article supprimé
        eltSection.removeChild(eltArticle);

        //recupere les infos du local storage avant de supprimer l'elt

        let cle = eltArticle.id; //cle du local storage

        let itemSupprime = JSON.parse(localStorage.getItem(cle)); //elt supprimé

        let prixTotal = JSON.parse(localStorage.getItem(C_totalPrix)); //prix total ds localstorage
        let qtyTotal = JSON.parse(localStorage.getItem(C_totalElt)); //qty total ds localstorage

        //maj prix et nb total
        prixTotal =
          Number(prixTotal) -
          Number(itemSupprime.prix) * Number(itemSupprime.nb);
        qtyTotal = Number(qtyTotal) - Number(itemSupprime.nb);

        //supprime la cle dans le local storage
        localStorage.removeItem(cle);

        //maj prix et nb elt total
        localStorage.setItem(C_totalElt, JSON.stringify(qtyTotal));
        localStorage.setItem(C_totalPrix, JSON.stringify(prixTotal));

        //Affiche nouveau prix dans l'ecran
        displayPrixTotal(prixTotal, qtyTotal);

        //maj longueur lilste des boutons supprimer
        eltsSupprimer.length--;
      });
    }
  } catch (e) {
    console.log("waitClickOnSupprimer  " + e);
  }
}

//------------------------------------------------------------------
// fonction: waitClickOnNbElt()
//
//
// Objet: Attend le click sur le nb d'elt d'un elt du panier
//
// Parametres:
//  entrée: rien
//  sortie: rien
//
//  Algo
//    REcherche ts les elts avec la classe "supprimer"
//    Ecoute sur tous les elts de cette class
//    Si click sur un elt
//       REcherche l'id de l'Article parent
//        Supprime cet elt dans le local stortage
//        Supprime l'article de la page html
//        Affiche la nouvelle page html
//----------------------------------------------------------------
function waitClickOnNbElt() {
  try {
    //recherche de ts les elts qui ont la classe deleteItem
    //à l'intérieur d'un elt ayant l'ID "cart__items"
    let eltSection = document.getElementById(C_cart__itemsClass);
    let eltsClass = eltSection.getElementsByClassName(C_itemQuantityClass); //tableau avec tous les elts de la class

    for (let i = 0; i < eltsClass.length; i++) {
      //Element html  correspondant à la clé

      eltsClass[i].addEventListener("click", function () {
        //on a cliqué sur l'elt input de l'article
        // on remonte la filiere pour avoir l'article correspondant
        //Article est 3 niveaux au dessus du bouton input
        let eltArticle = eltsClass[i].parentNode.parentNode.parentNode;
        console.log("waitClickOnNbElt: clic nb elt" + eltArticle.id);

        //recupere les infos du local storage de l elt

        let cle = eltArticle.id; //cle du local storage

        let ProductSelected = JSON.parse(localStorage.getItem(cle)); //elt selectionné
        let oldEltNb = Number(ProductSelected.nb); //nb d'elt actuel dans le local storage
        let eltPrix = Number(ProductSelected.prix); //prix du produit selectionné
        //nouveau nombre
        let newEltNb = eltsClass[i].value;

        //Teste le nouveau nombre rentré par l'utilisateur
        if (verifNewQty(Number(newEltNb))) {
          let prixTotal = JSON.parse(localStorage.getItem(C_totalPrix)); //prix total ds localstorage
          let qtyTotal = JSON.parse(localStorage.getItem(C_totalElt)); //qty total ds localstorage

          //maj prix et nb total
          prixTotal =
            Number(prixTotal) +
            Number(eltPrix) * (Number(newEltNb) - Number(oldEltNb));

          qtyTotal = Number(qtyTotal) - Number(oldEltNb) + Number(newEltNb);

          //maj prix et nb elt total dans local storage
          localStorage.setItem(C_totalElt, JSON.stringify(qtyTotal));
          localStorage.setItem(C_totalPrix, JSON.stringify(prixTotal));

          //maj produit dans local storage
          ProductSelected.nb = Number(newEltNb);
          localStorage.setItem(cle, JSON.stringify(ProductSelected));
          //Affiche nouveau prix dans l'ecran
          displayPrixTotal(prixTotal, qtyTotal);
        }
      });
    }
  } catch (e) {
    console.log("waitClickOnNbElt  " + e);
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

    // DEBUG: affichage pd dans la console
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

      //Attente click sur les boutons <supprimer> des elts du panier
      waitClickOnSupprimer();

      //Attente click sur le nombre d'item des elts du panier
      waitClickOnNbElt();

      //Attente changement nombre d'elts
      // A completer

      // Traitement du click sur le bouton
      let eltButton = document.getElementById("order");
      eltButton.addEventListener("click", function () {
        console.log("on a cliqué sur le bouton commander");
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
