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
    // A compléter
    //On récupère l'id du bouton
    // let eltButton = document.getElementById(Id);
    //creation p
    //let newp = document.createElement("p");
    // eltButton.appendChild(newp);
    //newp.innerHTML = Message;

    console.log("Attention: " + Message);
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
// Retourne les infos du produit passéesdans l'URL
//params entrée: rien
//
//retour: newParamPanier: class params avec id, couleur et nb
//------------------------------------------------

function getInfoInURL() {
  // Variable pour stocker les params recupéres de l'URL
  var newParamPanier = new paramPanier(0, "", 0, "", 0, "", "", "");

  try {
    //Récupère la chaine de caracteres après le ?

    let str = window.location.href;
    console.log("URL passee en param " + str);
    let url = new URL(str);

    let searchParams = new URLSearchParams(url.search); //partie parametres de l'URL

    // format chaine extraite = id=xxx&nb=1234&color=azerty

    //récupération de chaque param

    newParamPanier.id = searchParams.get("id");
    newParamPanier.couleur = searchParams.get("color");
    newParamPanier.nb = searchParams.get("nb");

    console.log("id=" + newParamPanier.id);
    console.log("couleur=" + newParamPanier.couleur);
    console.log("nb=" + newParamPanier.nb);
  } catch (e) {
    console.log("getInfoInURL " + e);
  }
  return newParamPanier;
}

//---------------------------------------------------------------------------
// Fonction: getEltNb(cle);
//---------------------------------------------------------------------------
function getEltQty(cle) {
  let eltQty = 0; //nombre de produits
  try {
    //
    // Valeur rentrée
    eltQty = document.getElementById("quantity");
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
  } catch (e) {
    console.log("getNbProduct" + e);
    eltQty.value = 0; // on remet à 0
  }
  return Number(eltQty.value);
}

//----------------------------------------------------------------------------
// function: verifNewQty(newEltNb)
// Objet:
//  Vérifie le nombre d'elt rentré par l'utilisateur.
//  Parametres:
//    Entrée: nombre d'elt
//    Sortie: true si OK false sinon
//---------------------------------------------------------------------------
function verifNewQty(newEltNb) {
  return true;
}
