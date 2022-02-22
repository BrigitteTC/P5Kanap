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
// await: attend le retour de la promese
//-------------------------------------------------------------
var getProducts = async function (server) {
  let data; //données récupérées par la ft
  try {
    let response = await fetch(server);
    if (response.ok) {
      data = await response.json();
      console.log(data);
      console.log(data[0].name);
      console.log(data[0].imageUrl);
      console.log(data[0]._id);

      //boucle sur les produits pour les aficher dans le html
      for (let product of data) {
        let newArticle = document.createElement("article");
        let eltSection = document.getElementById("items");

        let newImg = document.createElement("img");
        let newh3 = document.createElement("h3");
        let newp = document.createElement("p");
        let newa = document.createElement("a");

        eltSection.appendChild(newArticle);
        //newa.appendChild(newArticle);

        newArticle.appendChild(newImg);
        newArticle.appendChild(newh3);
        newArticle.appendChild(newp);

        //ma j contenu des elt crees
        newa.innerHTML = product._id;

        //h3
        newh3.classList.add("productName");
        newh3.innerHTML = product.name;
        //newh3.innerText = "titre h3";
        //p
        newp.classList.add("productDescription");
        newp.innerHTML = product.description;
        //newp.innerText = "paragraphe p";

        //img
        //newImg.innerHTML="src=" + products[0].imageUrl + "alt=" + products[0].altTxt"
        //newImg.innerHTML = `src ="${product.imageUrl}" alt="${product.altTxt}"`;
        newImg.src = product.imageUrl;
        newImg.alt = product.altTxt;

        //DEBUG: affichage des variables sur la console

        console.log(newImg);
        console.log(newp);
        console.log(newh3);
      }
      return data;
    } else {
      console.error("Retour du serveur:", response.status);
    }
  } catch (e) {
    console.log(e);
  }
};

// Appel de la ft pour récupérer les produits

var products = getProducts(serverGET);
