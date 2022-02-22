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

//Creation de la ft getProducts
const getProducts = async function () {
  try {
    let response = await fetch(serverGET);
    if (response.ok) {
      let data = await response.json();
      console.log(data);
    } else {
      console.error("Retour du serveur:", response.status);
    }
  } catch (e) {
    console.log(e);
  }
};

// Appel de la ft pour mise à jour produits

getProducts();

// Mise à jour du code HTML avec les produits
