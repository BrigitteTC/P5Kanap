//-------------------------------------------------
// Fonctions et variables utiles pour java script
//---------------------------------------------------

//------------------------------------------------------
//Variables
//--------------------------------------------------------

//server avec la liste des produits
const C_serverGET = "http://localhost:3000/api/products";

// choix d'option: msg pour demander à l'uitlisateur de choisir la couleur
const C_choixOption = "--SVP, choisissez une couleur --";
const C_undefined = "undefined";

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
  // A compléter
  //On récupère l'id du bouton
  // let eltButton = document.getElementById(Id);
  //creation p
  //let newp = document.createElement("p");
  // eltButton.appendChild(newp);
  //newp.innerHTML = Message;

  console.log("Attention: " + Message);
}

//---------------------------------------------------
//fonction getId
// Retourne l'id du produit de la page
//params entrée: aucun
//retour: id
//------------------------------------------------

function getId() {
  var str = window.location.href;
  console.log(str);
  var url = new URL(str);
  var search_params = new URLSearchParams(url.search);
  if (search_params.has("id")) {
    var id = search_params.get("id");
    console.log("id extraite de l'URL=" + id);
    return id;
  }
}

//definir une class pour chaque parametre du panier
class paramPanier {
  constructor(id, nb, couleur, prix) {
    this.id = id;
    this.nb = nb;
    this.couleur = couleur;
    this.prix = prix;
  }
}

//---------------------------------------------------
//fonction OldgetInfoInURL
// Retourne l'id du produit de la page
//params entrée: infoURL: info à chercher dans l'URL
//          ex: id , nb, color
//retour: valueInfoURL: valeur correspondant au param d'entrée
//------------------------------------------------

function OldgetInfoInURL(infoURL) {
  var str = window.location.href; //URL passée en param
  console.log("URL=" + str);
  var url = new URL(str);
  var search_params = new URLSearchParams(url.search);
  if (search_params.has(infoURL)) {
    var valueInfoURL = search_params.get(infoURL);
    console.log("Valeur extraite de l'URL=" + valueInfoURL);
    return valueInfoURL;
  }
}

//---------------------------------------------------
//fonction getInfoInURL
// Retourne l'id du produit de la page
//params entrée: rien
//          ex: id , nb, color
//retour: newParamPanier: class params avec id, couleur et nb
//------------------------------------------------
const C_separator = "?";
const C_egal = "=";

function getInfoInURL() {
  //Récupère la chaine de caracteres après le ?
  let productId = getId();
  console.log("Valeur extraite de l'URL=" + productId);
  //Split la chaine extraite
  // format chaine = xxx?nb=1234?color=azert

  //split par &
  let parameters = productId.toString(1).split(C_separator);

  // Variable pour stocker les params recupéres de l'URL
  let newParamPanier = new paramPanier(0, "", 0, 0);

  //maj avec  le tableau récupéré
  newParamPanier.id = parameters[0];
  newParamPanier.couleur = parameters[1].split(C_egal)[1];
  newParamPanier.nb = parameters[2].split(C_egal)[1];

  return newParamPanier;
}
