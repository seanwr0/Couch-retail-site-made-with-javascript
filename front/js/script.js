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

// calls the getProductWithPromise function then use that to create the products and add them to the page
getProductWithPromise().then((productInfo) => {
    productDetails = productInfo;
    for (let i = 0; i < productInfo.length; i++) {
        createNewElements(i);
        newId[i] = productDetails[i]._id;
        image[i] = productDetails[i].imageUrl;
        imageAlt[i] = productDetails[i].altTxt;
        newLink[i].href = "./product.html?" + "id=" + newId[i];
        newImg[i].src = image[i];
        newImg[i].alt = imageAlt[i];
        newName[i].textContent = productDetails[i].name;
        newDescription[i].textContent = productDetails[i].description;
        appendElements(i);
        addClassesToElements(i);
    }
})

// creates new elements to be added to the dom
function createNewElements(i) {
    newLink[i] = document.createElement('a');
    newProduct[i] = document.createElement('article');
    newImg[i] = document.createElement('img');
    newName[i] = document.createElement('h3');
    newDescription[i] = document.createElement('p');
}

// adds the name description and image elements to the product element, the product element to a link element, 
// and that to the product section
function appendElements(i) {
    newProduct[i].appendChild(newImg[i]);
    newProduct[i].appendChild(newName[i]);
    newProduct[i].appendChild(newDescription[i]);
    newLink[i].appendChild(newProduct[i]);
    productSection.appendChild(newLink[i]);
}

// adds classes to the name and description element
function addClassesToElements(i) {
    newName[i].classList.add('productName');
    newDescription[i].classList.add('productDescription');
} 

// fuction that gets the product info from the server and 
// returns a promise
function getProductWithPromise() {
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
