const productSection = document.getElementById('items');


let productDetails = [];
let image = [];
let imageAlt = [];
let newProduct = [];
let newImg = [];
let newName = [];
let newDescription = [];
let newLink = [];
let newId = [];



// fuction that gets the product info from the server and 
// returns a promise

async function getProductWithPromise() {
    let apiRequest = new XMLHttpRequest();

    return new Promise(function (resolve, reject) {

        apiRequest.onreadystatechange = function () {
            if (apiRequest.readyState == 4) {
                if (apiRequest.status >= 300) {
                    reject("Error, status code = " + apiRequest.status)
                } else {
                    let response = JSON.parse(apiRequest.response);
                    resolve(response);

                }
            }
        }
        apiRequest.open('GET', 'http://localhost:3000/api/products', true);
        apiRequest.send();
    });
}



// calls the getProductWithPromise function then use that to create the products and add them to the page
getProductWithPromise().then((productInfo) => {

    productDetails = productInfo;

    for (let i = 0; i < productInfo.length; i++) {

        newId[i] = productDetails[i]._id;
        image[i] = productDetails[i].imageUrl;
        imageAlt[i] = productDetails[i].altTxt;

        newLink[i] = document.createElement('a');
        newProduct[i] = document.createElement('article');
        newImg[i] = document.createElement('img');
        newName[i] = document.createElement('h3');
        newDescription[i] = document.createElement('p');

        newLink[i].href = "./product.html?" + "id=" + newId[i];
        newImg[i].src = image[i];
        newImg[i].alt = imageAlt[i];

        newName[i].textContent = productDetails[i].name;
        newDescription[i].textContent = productDetails[i].description;

        newProduct[i].appendChild(newImg[i]);
        newProduct[i].appendChild(newName[i]);
        newProduct[i].appendChild(newDescription[i]);

        newLink[i].appendChild(newProduct[i])

        productSection.appendChild(newLink[i]);

        newName[i].classList.add('productName');
        newDescription[i].classList.add('productDescription');
    }
})




