/* script.js
date: 21/02/2022
auteur: BTC

Script pour afficher les produits de Kanap sur la page html
*/

/* Important: listen on port 3000
Lancer une invite de commande cmd dans le répertoire back 
et taper la commande >node server
 >node server
 listening on port 3000
 */

//server avec la liste des produits
var serverGET = "http://localhost:3000/api/products";

//--------------------------------------------------------------
// ft getProducts
// nom: getProduct
// Paramètres:
//  server: adresse duserveur avec les données à récupérer
// retour: data: données récupérées
//
// algo:
//  lit les données du serveur
//-------------------------------------------------------------
var getProducts = async function (server) {
  let data; //données récupérées par la ft
  try {
    let response = await fetch(server);
    if (response.ok) {
      data = await response.json();
      console.log(data);
    } else {
      console.error("Retour du serveur:", response.status);
    }
  } catch (e) {
    console.log(e);
  }
  return data;
};

// Appel de la ft pour mise à jour produits

var products = getProducts(serverGET);
console.log(products);

// Mise à jour du code HTML avec les produits
