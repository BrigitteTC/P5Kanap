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

//Construction de l'URL
const C_separatorURL = "?"; //separateur params de l'URL
const C_egal = "="; //egalité

//Construction de la clé du local storage
// cle= nom_couleur
const C_separatorKey = "_";

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

//---------------------------------------------------
//fonction getInfoInURL
// Retourne les infos du produit passéesdans l'URL
//params entrée: rien
//
//retour: newParamPanier: class params avec id, couleur et nb
//------------------------------------------------

function getInfoInURL() {
  //Récupère la chaine de caracteres après le ?
  let productId = getId();
  console.log("Valeur extraite de l'URL=" + productId);
  //Split la chaine extraite
  // format chaine = xxx?nb=1234?color=azerty

  //split par separateur
  //0: id
  //1: nb=1234
  //2: color=azerty
  let parameters = productId.toString(1).split(C_separatorURL);

  // Variable pour stocker les params recupéres de l'URL
  let newParamPanier = new paramPanier(0, "", 0, "", 0, "", "", "");

  //maj avec  le tableau récupéré
  newParamPanier.id = parameters[0];
  newParamPanier.couleur = parameters[1].split(C_egal)[1];
  newParamPanier.nb = Number(parameters[2].split(C_egal)[1]); //nombre forcé en entier

  return newParamPanier;
}
