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

// Appel de la ft pour récupérer les produits

var products = getProducts(serverGET);
console.log(products);

console.log(products[0]);

// Mise à jour du code HTML avec les produits

//essai avec 1ier produit

let newArticle = document.createElement("article");
let eltSection = document.getElementById("items");

let newImg = document.createElement("img");
let newh3 = document.createElement("h3");
let newp = document.createElement("p");
let newa = document.createElement("a");

eltSection.appendChild(newa);
newa.appendChild(newArticle);

newArticle.appendChild(newImg);
newArticle.appendChild(newh3);
newArticle.appendChild(newp);

//ma j contenu des elt crees
//newa.innerHTML = products[0]._id;
newh3.classList.add("productName");
//newh3.innerText = products[0].name;
newh3.innerText = "titre h3";

newp.classList.add("productDescription");
//newp.innerText = products[0].description;
newp.innerText = "paragraphe p";

//newImg.innerHTML="src=" + products[0].imageUrl + "alt=" + products[0].altTxt"
newImg.innerHTML = "src='http://localhost:3000/images/kanap01.jpeg'";
