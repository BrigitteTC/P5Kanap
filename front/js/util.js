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
    console.log(id);
    return id;
  }
}
