let cart = JSON.parse(window.localStorage.getItem('cartItem'));
let cartSection = document.getElementById('cart__items');

let newArticle = [];
let newImageDiv = [];
let newImg = [];
let newContentDiv = [];
let newDescriptionDiv = [];
let newNameH2 = [];
let newColorP = [];
let newPriceP = [];
let newSettingsDiv = [];
let newSettingsQuantityDiv = [];
let newQuantityP = [];
let newQuantityInput = [];
let newSettingsDeleteDiv = [];
let newDeleteP = [];



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









// calls the getProductWithPromise function then use that to create the products 
// and add them to the page
getProductWithPromise().then((product) => {

    for (let i = 0; i < cart.length; i++) {

        let cartItem = JSON.parse(cart[i]);
        let productInfo = product;

        const index = productInfo.findIndex((element) => element._id === cartItem[0]);

        // create DOM elements 
        newArticle[i] = document.createElement('article');

        newImageDiv[i] = document.createElement('div');
        newImg[i] = document.createElement('img');
        newImg[i].src = productInfo[index].imageUrl;
        newImg[i].alt = productInfo[index].altTxt;

        newContentDiv[i] = document.createElement('div');

        newDescriptionDiv[i] = document.createElement('div');
        newNameH2[i] = document.createElement('h2');
        newColorP[i] = document.createElement('p');
        newPriceP[i] = document.createElement('p');

        newSettingsDiv[i] = document.createElement('div');
        newSettingsQuantityDiv[i] = document.createElement('div');
        newQuantityP[i] = document.createElement('p');
        newQuantityInput[i] = document.createElement('input');

        newSettingsDeleteDiv[i] = document.createElement('div');
        newDeleteP[i] = document.createElement('p');

        // add classes to DOM elements
        newArticle[i].classList.add('cart__item');
        newArticle[i].dataset.id = cartItem[0];
        newArticle[i].dataset.color = cartItem[1];

        newImageDiv[i].classList.add('cart__item__img');
        newContentDiv[i].classList.add('cart__item__content');
        newDescriptionDiv[i].classList.add('cart__item__content__description');
        newSettingsDiv[i].classList.add('cart__item__content__settings');
        newSettingsQuantityDiv[i].classList.add('cart__item__content__settings__quantity');
        newQuantityInput[i].classList.add('itemQuantity');
        newSettingsDeleteDiv[i].classList.add('cart__item__content__settings__delete');
        newDeleteP[i].classList.add('deleteItem');

        newQuantityInput[i].type = "number";
        newQuantityInput[i].name = "itemQuantity";
        newQuantityInput[i].min = "0";
        newQuantityInput[i].max = "100";
        newQuantityInput[i].value = cartItem[2];

        // add text content to DOM elements


        newNameH2[i].textContent = productInfo[index].name;
        newColorP[i].textContent = cartItem[1];
        newPriceP[i].textContent = "$" + productInfo[index].price;
        console.log(cartItem)

        newQuantityP[i].textContent = "Quantity";

        newDeleteP[i].textContent = "Delete";

        // appand new elements to the DOM

        cartSection.appendChild(newArticle[i]);

        newArticle[i].appendChild(newImageDiv[i]);
        newImageDiv[i].appendChild(newImg[i]);


        newArticle[i].appendChild(newContentDiv[i]);

        newContentDiv[i].appendChild(newDescriptionDiv[i]);
        newDescriptionDiv[i].appendChild(newNameH2[i]);
        newDescriptionDiv[i].appendChild(newColorP[i]);
        newDescriptionDiv[i].appendChild(newPriceP[i]);

        newContentDiv[i].appendChild(newSettingsDiv[i]);
        newSettingsDiv[i].appendChild(newSettingsQuantityDiv[i]);
        newSettingsQuantityDiv[i].appendChild(newQuantityP[i])
        newSettingsQuantityDiv[i].appendChild(newQuantityInput[i]);

        newContentDiv[i].appendChild(newSettingsDeleteDiv[i]);
        newSettingsDeleteDiv[i].appendChild(newDeleteP[i]);





    }

})