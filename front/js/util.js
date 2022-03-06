//-------------------------------------------------
// Fonctions et variables utiles pour java script
//---------------------------------------------------

//------------------------------------------------------
//Constantes
//--------------------------------------------------------

//server avec la liste des produits
const C_serverGET = "http://localhost:3000/api/products";

// choix d'option: msg pour demander à l'uitlisateur de choisir la couleur
const C_choixOption = "--SVP, choisissez une couleur --";
const C_undefined = "undefined";

//Construction de l'URL
//  ex:
// file:///C:/Users/xxx/P5Kanap/front/html/cart.html?id=415b7cacb65d43b2b5c1ff70f3393ad1&color=Black/Yellow&nb=2
const C_separatorURLFirst = "?"; //separateur params de l'URL pour l'id
const C_separatorURL = "&"; //separateur params supplementaires de l'URL
const C_egal = "="; //egalité

//Construction de la clé du local storage
// cle= nom_couleur
const C_separatorKey = "_";

const C_totalElt = "totalElt"; // cle dans local storage pour nb elt total
const C_totalPrix = "totalPrix"; // cle dans local storage pour prix total
//

//Const utilisées dan sles classes css
const C_cart__itemsClass = "cart__items";
const C_cart__itemClass = "cart__item";
const C_itemQuantityClass = "itemQuantity";
const C_deleteItemClass = "deleteItem";
const C_quantityClass = "quantity";

//----------------------------------------------------------------
//Class
//----------------------------------------------------------------
//class pour chaque parametre du panier
class paramPanier {
  constructor(id, nom, nb, couleur, prix, imageUrl, description, altTxt) {
    this.id = id;
    this.nom = nom;
    this.nb = nb;
    this.couleur = couleur;
    this.prix = prix;
    this.imageUrl = imageUrl;
    this.description = description;
    this.altTxt = altTxt;
  }
}
//class pour chaque parametre du panier dans le local storage
class localStoragePanier {
  constructor(id, nb, couleur) {
    this.id = id;
    this.nb = nb;
    this.couleur = couleur;
  }
}
//----------------------------------------
// Fonctions
//----------------------------------------
//---------------------------------------------------------
// function: Alerte
// but: affiche une alerte en cas de mauvaise saisie
//  le message d'erreur sera affiché sous forme de popup
//
// Param d'entrée:
//                Message: message d'erreur
// Param de sortie: rien
//---------------------------------------------------------
function alerteMsg(Message) {
  try {
    console.log("Attention: " + Message); //Affiche l'erreur sur la console
    window.alert("Attention:   " + Message); // Affiche un popup à l'écran
  } catch (e) {
    console.log("alerteMsg " + e);
  }
}

//---------------------------------------------------
//fonction getId
// Retourne l'id du produit de la page
//params entrée: aucun
//retour: id
//------------------------------------------------

function getId() {
  var id = 0; //id à retourner
  try {
    let str = window.location.href;
    console.log(str);
    let url = new URL(str);
    let searchParams = new URLSearchParams(url.search);
    if (searchParams.has("id")) {
      id = searchParams.get("id");
      console.log("id extraite de l'URL=" + id);
    }
  } catch (e) {
    console.log("getId " + e);
  }
  return id;
}

//---------------------------------------------------
//fonction getInfoInURL
// Retourne les infos du produit passées dans l'URL
//params entrée: rien
//
//retour: newItemPanier: class params avec id, couleur et nb
//------------------------------------------------

function getInfoInURL() {
  // Variable pour stocker les params recupéres de l'URL
  var newItemPanier = new localStoragePanier(0, 0, "");

  try {
    //Récupère la chaine de caracteres après le ? dan sl'URL

    let str = window.location.href;
    console.log("URL passee en param " + str);
    let url = new URL(str);

    let searchParams = new URLSearchParams(url.search); //partie parametres de l'URL

    // format chaine extraite = id=xxx&nb=1234&color=azerty

    //récupération de chaque param
    if (searchParams.has("id")) {
      newItemPanier.id = searchParams.get("id");
    }

    if (searchParams.has("color")) {
      newItemPanier.couleur = searchParams.get("color");
    }

    if (searchParams.has("nb")) {
      newItemPanier.nb = searchParams.get("nb");
    }

    console.log("id=" + newItemPanier.id);
    console.log("couleur=" + newItemPanier.couleur);
    console.log("nb=" + newItemPanier.nb);
  } catch (e) {
    console.log("getInfoInURL " + e);
  }
  return newItemPanier;
}

//----------------------------------------------------------------------------
// function: verifNewQty(newEltNb)
// Objet:
//  Vérifie le nombre d'elt rentré par l'utilisateur.
//  Parametres:
//    Entrée:
//      nombre d'elt de l'article
//      nb total d'elt dans le local storage
//
//    Sortie: true si OK false sinon
//---------------------------------------------------------------------------

function verifNewQty(eltQty, TotalQty) {
  var returnBool = true; //valeur de retour initialisée à true
  try {
    //
    //teste valeur saisie est un nombre entier
    if (Number.isInteger(eltQty) === false) {
      alerteMsg("Nombre d'articles: rentrez un nombre entier");
      returnBool = false;
    }
    //teste qty>1
    else {
      if (eltQty < 1) {
        alerteMsg("Nombre d'articles: Il faut au moins 1 canapé");
        returnBool = false;
      }
      //teste qté rentrée <=100
      else {
        if (eltQty > 100) {
          alerteMsg("Nombre d'articles: pas plus de 100 canapés");
          returnBool = false;
        } else {
          //Teste qty totale <=100
          if (eltQty + TotalQty > 100) {
            alerteMsg("La combre d'articles de votre panier dépasse 100");
            returnBool = false;
          }
        }
      }
    }
  } catch (e) {
    console.log("verifNewQty" + e + "qty" + qty);
  }
  return returnBool;
}
