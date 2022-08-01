// get elements from the dom
let cart = JSON.parse(window.localStorage.getItem('cartItem'));
let cartSection = document.getElementById('cart__items');
let totalQuantity = document.getElementById('totalQuantity');
let totalPrice = document.getElementById('totalPrice');
let firstNameInput = document.getElementById('firstName');
let firstNameError = document.getElementById('firstNameErrorMsg');
let lastNameInput = document.getElementById('lastName');
let lastNameError = document.getElementById('lastNameErrorMsg');
let addressInput = document.getElementById('address');
let addressError = document.getElementById('addressErrorMsg');
addressError.textContent = 'Street, town, state, zip';
let cityInput = document.getElementById('city');
let cityError = document.getElementById('cityErrorMsg');
let emailInput = document.getElementById('email');
let emailError = document.getElementById('emailErrorMsg');
let orderButton = document.getElementById('order');

// create bolean variables 
let firstNameInputValid = false;
let lastNameInputValid = false;
let addressInputValid = false;
let cityInputValid = false;
let emailInputValid = false;
let allFormsValid = false;

// create arrays
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
let contactForm = [];
let products = [];
let productId = [];
let productInfo = [];

// create Int variables
let price = 0;
let quantity = 0;


const createProductsAndAddToPage = (product) => {
    productInfo = product;
    addPriceAndQuantityToPage();
    for (let i = 0; i < cart.length; i++) {
        let cartItem = JSON.parse(cart[i]);
        const index = productInfo.findIndex((element) => element._id === cartItem[0]);
        createDomElement(i, index);
        addClassesToDomElements(i, cartItem);
        addTextContentToDom(i, index, cartItem);
        appendElementsToDom(i);
        deleteProduct(i);
        changeQuantityOnChange(i, cartItem);
    }

};

// calls the getProductWithPromise function then use that to create the products 
// and add them to the page
getProductWithPromise().then(createProductsAndAddToPage)

// when clicked add information from forms to an array, 
// validate the info and send to the backend when order button is pressed
orderButton.addEventListener('click', ($event) => {
    productId = [];
    $event.preventDefault();
    checkFormValid();
    if (allFormsValid == true) {
        addIdTooProductIdArray();
        let contactAndProductInfo = createContactProductInfo();
        contactAndProductInfo = JSON.stringify(contactAndProductInfo);
        fetch("http://localhost:3000/api/products/order", {
                method: 'post',
                body: contactAndProductInfo,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(response => response.json())
            .then(data => window.location = "./confirmation.html?" + "id=" + data.orderId)
            .catch((error) => {
                console.log(error)
            })
    }
})


// create elements to be added to the dom
function createDomElement(i, index) {
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
}

// add text content to DOM elements
function addTextContentToDom(i, index, cartItem) {
    newNameH2[i].textContent = productInfo[index].name;
    newColorP[i].textContent = cartItem[1];
    newPriceP[i].textContent = "$" + productInfo[index].price;
    newQuantityP[i].textContent = "Quantity";
    newDeleteP[i].textContent = "Delete";
}

// add classes and data to elements
function addClassesToDomElements(i, cartItem) {
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
}

 // appand new elements to the DOM
function appendElementsToDom(i) {
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
    newSettingsQuantityDiv[i].appendChild(newQuantityP[i]);
    newSettingsQuantityDiv[i].appendChild(newQuantityInput[i]);
    newContentDiv[i].appendChild(newSettingsDeleteDiv[i]);
    newSettingsDeleteDiv[i].appendChild(newDeleteP[i]);
}

// adds the ability to delete products from the cart
function deleteProduct(i) {
    newDeleteP[i].addEventListener('click', function () {
        cart.splice(i, 1);
        newArticle[i].remove();
        window.localStorage.setItem('cartItem', JSON.stringify(cart));
        addPriceAndQuantityToPage();
    });
}

// adds the ability to change quantity of product 
function changeQuantityOnChange(i, cartItem) {
    newQuantityInput[i].addEventListener('change', function () {
        cartItem[2] = newQuantityInput[i].value;
        if (cartItem[2] > 100) {
            cartItem[2] = 100;
        }
        if (cartItem[2] < 0) {
            cartItem[2] = 0;
        }
        cart[i] = JSON.stringify(cartItem);
        window.localStorage.setItem('cartItem', JSON.stringify(cart));
        addPriceAndQuantityToPage();
    });
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

// validate the costumer contactForm info from the firstName form
firstNameInput.addEventListener('change', function () {
    function onlyLettersAndSpaces(str) {
        return /^[A-Za-z\s]*$/.test(str);
    }
    if (onlyLettersAndSpaces(firstNameInput.value)) {
        firstNameError.textContent = ' ';
        firstNameInputValid = true;
    } else {
        firstNameError.textContent = 'ERROR';
        firstNameInputValid = false;
    }
})

// validate the costumer contactForm info from the lastName form
lastNameInput.addEventListener('change', function () {
    function onlyLettersAndSpaces(str) {
        return /^[A-Za-z\s]*$/.test(str);
    }
    if (onlyLettersAndSpaces(lastNameInput.value)) {
        lastNameError.textContent = ' ';
        lastNameInputValid = true;
    } else {
        lastNameError.textContent = 'ERROR';
        lastNameInputValid = false;
    }
})

// validate the costumer contactForm info from the address form
addressInput.addEventListener('change', function () {
    function onlyLettersAndSpaces(str) {
        return /^[(\d{1,}) [a-zA-Z0-9\s]+(\.)? [a-zA-Z]+(\,)? [A-Z]{2} [0-9]{5,6}]*$/.test(str);
    }
    if (onlyLettersAndSpaces(addressInput.value)) {
        addressError.textContent = 'Street, town, state, zip';
        addressInputValid = true;
    } else {
        addressInputValid = false;
        addressError.textContent = 'ERROR: Street, town, state, zip';
    }
})

// validate the costumer contactForm info from the city form
cityInput.addEventListener('change', function () {
    function onlyLettersAndSpaces(str) {
        return /^[a-zA-Z',.\s-]{1,25}$/.test(str);
    }
    if (onlyLettersAndSpaces(cityInput.value)) {
        cityError.textContent = ' ';
        cityInputValid = true;
    } else {
        cityError.textContent = 'ERROR';
        cityInputValid = false;
    }
})

// validate the costumer contactForm info from the email form
emailInput.addEventListener('change', function () {
    function onlyLettersAndSpaces(str) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(str);
    }
    if (onlyLettersAndSpaces(emailInput.value)) {
        emailError.textContent = ' ';
        emailInputValid = true;
    } else {
        emailError.textContent = 'ERROR';
        emailInputValid = false;
    }
})


//updates the total quantity and price information 
function addPriceAndQuantityToPage() {
    parseInt(price = 0);
    parseInt(quantity = 0);
    for (let i = 0; i < cart.length; i++) {
        let cartItem = JSON.parse(cart[i]);
        let index = productInfo.findIndex((element) => element._id === cartItem[0]);
        quantity += parseInt(cartItem[2]);
        price += parseInt(productInfo[index].price * cartItem[2]);
    }
    totalPrice.textContent = price;
    totalQuantity.textContent = quantity;
}

// adds the information from the forms, and all the IDs from the products in the cart, and adds them to an array
function createContactProductInfo() {
    return {
        "contact": {
            "firstName": contactForm[0],
            "lastName": contactForm[1],
            "address": contactForm[2],
            "city": contactForm[3],
            "email": contactForm[4],
        },
        "products": productId
    };
}

// adds product IDs from the products in the cart, and adds them to an array
function addIdTooProductIdArray() {
    for (let i = 0; i < cart.length; i++) {
        let cartItem = JSON.parse(cart[i]);
        productId[i] = cartItem[0];
    }
}

// checks if info entered by customer is valid
function checkFormValid() {
    if (firstNameInputValid == true) {
        contactForm[0] = firstNameInput.value;
        allFormsValid = true;
    } else {
        allFormsValid = false;
    }
    if (lastNameInputValid == true) {
        contactForm[1] = lastNameInput.value;
        allFormsValid = true;
    } else {
        allFormsValid = false;
    }
    if (addressInputValid == true) {
        contactForm[2] = addressInput.value;
        allFormsValid = true;
    } else {
        allFormsValid = false;
    }
    if (cityInputValid == true) {
        contactForm[3] = cityInput.value;
        allFormsValid = true;
    } else {
        allFormsValid = false;
    }
    if (emailInputValid == true) {
        contactForm[4] = emailInput.value;
        allFormsValid = true;
    } else {
        allFormsValid = false;
    }
}