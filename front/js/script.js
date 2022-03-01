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
  //
  let data; //données récupérées par la ft
  try {
    let response = await fetch(server);
    if (response.ok) {
      data = await response.json();
      console.log(data);

      //boucle sur les produits pour les aficher dans le html
      for (let product of data) {
        // creation des elts du html
        //on recupere le id items qui contiendra les articles des canapés
        let eltSection = document.getElementById("items");

        //creation du lien a
        let newa = document.createElement("a");

        //creation de l'elt article
        let newArticle = document.createElement("article");

        //creation des elts img, h3, p
        let newImg = document.createElement("img");
        let newh3 = document.createElement("h3");
        let newp = document.createElement("p");

        //article enfant de la section avec id=items

        eltSection.appendChild(newArticle);

        //rattachement du lien "a" qui est un enfant de la section
        eltSection.appendChild(newa);

        //article est un enfant du lien "a"
        newa.appendChild(newArticle);

        //Rattachement des 3 enfants de l'article (img, h3 et p)
        newArticle.appendChild(newImg);
        newArticle.appendChild(newh3);
        newArticle.appendChild(newp);

        //ma j contenu des elt crees
        // lien a
        newa.href = "./product.html" + C_separatorURL + "id=" + product._id;

        //h3
        newh3.classList.add("productName");
        newh3.innerHTML = product.name;

        //p
        newp.classList.add("productDescription");
        newp.innerHTML = product.description;
        //newp.innerText = "paragraphe p";

        //img
        newImg.src = product.imageUrl;
        newImg.alt = product.altTxt;

        //DEBUG: affichage des variables sur la console

        console.log(newImg);
        console.log(newp);
        console.log(newh3);
        console.log(newa);
      }
    } else {
      console.error("Retour du serveur:", response.status);
    }
  } catch (e) {
    console.log(e);
  }
};

//clear local storage
localStorage.clear();

// Appel de la ft pour récupérer les produits

getProducts(C_serverGET);
