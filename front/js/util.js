//-------------------------------------------------
// Fonctions et variables utiles pour java script
//---------------------------------------------------

//------------------------------------------------------
//Constantes
//--------------------------------------------------------

//server avec la liste des produits
const C_serverGET = "http://localhost:3000/api/products";
const C_serverPOST = C_serverGET + "/order";

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

//Const utilisées dans les classes css
const C_cart__itemsClass = "cart__items";
const C_cart__itemClass = "cart__item";
const C_itemQuantityClass = "itemQuantity";
const C_deleteItemClass = "deleteItem";
const C_quantityClass = "quantity";

//Messages d'erreur à afficher dans les messages d'alerte
const C_msgAlert_Max100 =
  "Nombre d'articles: Vous ne pouvez pas acheter plus de 100 canapés de même type";
const C_msgAlert_MaxCart100 =
  "Nombre d'articles: Le nombre d'articles de votre panier dépasse 100";
const C_msgAlert_Min1 =
  "Nombre d'articles: Vous devez acheter au moins 1 produit";
const C_msgAlert_Entier =
  "Nombre d'articles: Vous devez rentrer un nombre entier";

//Messagesd'erreur du formulaire
const C_msgForm_vide = "Valeur obligatoire requise";
const C_msgForm_invalid = "Entrée invalide";

//Formulaire: les id des champs
const C_formfirstName = "firstName";
const C_formlastName = "lastName";
const C_formaddress = "address";
const C_formcity = "city";
const C_formemail = "email";
const C_formorder = "order";
const C_formErrorMsg = "ErrorMsg";

//Id de la commande
const C_orderId = "orderId";

//Regex pour verif champs des formulaires

const expressionRegName = /^[A-Za-zé'ïöëè -]+$/; // nom lettres pas de chiffres
const expressionRegAdress = /^[A-Za-z0-9é'ïöëè -]+$/; // adresse + ville lettres + chiffres
const expressionRegCity = /^[A-Za-z0-9é'ïöëè -]+$/; // adresse + ville lettres + chiffres

// regex pour le mail
const expressionEmailName = RegExp(
  "^([a-zA-Z0-9_-])+([.]?[a-zA-Z0-9_-]{1,})*@([a-zA-Z0-9-_]{2,}[.])+[a-zA-Z]{2,3}$"
);

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

//class pour les coordonnées de l'utilisateur
class userCoord {
  constructor(firstName, lastName, address, city, email) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
    this.city = city;
    this.email = email;
  }
}

//class pour vérifier les valeurs du formulaire
//tous les champs sont des booleens
class userCoordCheck {
  constructor(firstName, lastName, address, city, email) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
    this.city = city;
    this.email = email;
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
//fonction getOneParamInURL
// objet: retourne un param de l'URL donné par son identifiant
//
//  Parametres:
//  Entrée: identifiant du parametre
//  Sortie: parametre correspondant
//
// Algo:
//  cherche l'identifiant dans l'URL avec URLSearchParams
//  REtourne le parametre correspondant si il existe.
//------------------------------------------------

function getOneParamInURL(paramId) {
  var param; //param à retournerparamId
  try {
    let str = window.location.href;
    console.log(str);
    let url = new URL(str);
    let searchParams = new URLSearchParams(url.search);
    if (searchParams.has(paramId)) {
      param = searchParams.get(paramId);
      console.log("param extrait de l'URL pour = " + paramId + " = " + param);
    }
  } catch (e) {
    console.log("getOneParamInURL " + e);
  }
  return param;
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
//    et que ce nombre est un nombre entier
//  Parametres:
//    Entrée:
//      nombre d'elt de l'article
//      nb total d'elt dans le local storage
//
//    Sortie: true si OK false sinon
//---------------------------------------------------------------------------

function verifNewQty(eltQty) {
  var returnBool = true; //valeur de retour initialisée à true
  try {
    //
    //teste valeur saisie est un nombre entier
    if (Number.isInteger(eltQty) === false) {
      alerteMsg(C_msgAlert_Entier);
      returnBool = false;
    }
    //teste qty>1
    else {
      if (eltQty < 1) {
        alerteMsg(C_msgAlert_Min1);
        returnBool = false;
      }
      //teste qté rentrée <=100
      else {
        if (eltQty > 100) {
          alerteMsg(C_msgAlert_Max100);
          returnBool = false;
        }
      }
    }
  } catch (e) {
    console.log("verifNewQty" + e + "qty" + qty);
  }
  return returnBool;
}
