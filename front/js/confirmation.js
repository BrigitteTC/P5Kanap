/*--------------------------
confirmation.js
date: 07/03/2022
auteur: BTC

Script pour mettre à jour la page confirmation


*******************************************************************/
//----------------------------------------------------------------
// ft afficheConfirmation
// nom: afficheConfirmation
// Objet: Récupère le numéro de la commande passée dans l'URL
//    et l'affiche dans la page
//
// Paramètres:
//  entrée: les params sont passés par l'URL
//
//  retour: rien
//
// algo:
// Récupère le numéro de cmde dans l'URL
//  et l'ajoute dans la balise html correspondante.
//-------------------------------------------------------------
function afficheConfirmation() {
  try {
    //on récupère les infos du produit passé dans l'URL

    let paramURL = getOneParamInURL(C_orderId);

    console.log("orderId= " + paramURL);

    //verif param dans l'URL existe
    if (paramURL.orderId != 0) {
      // affiche le numéro ds la page
      //recupere l'elt correspondant dans le DOM

      let eltId = document.getElementById(C_orderId);
      // eltId.span.value = paramURL;

      //cree new p et affiche le num commande
      let newp = document.createElement("p");
      eltId.appendChild(newp);
      newp.innerHTML = paramURL;
    }
  } catch (e) {
    console.log("afficheConfirmation: " + e);
  }
}

// Appel de la ft pour afficher la page confirmation

afficheConfirmation();
