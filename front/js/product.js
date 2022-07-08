let productImageDiv = document.getElementsByClassName('item__img');
let title = document.getElementById('title');
let price = document.getElementById('price');
let description = document.getElementById('description');
let colors = document.getElementById('colors');
let addToCart = document.getElementById('addToCart');
let productQuantity = document.getElementById('quantity');
let itemsForCart =  JSON.parse(window.localStorage.getItem('cartItem'));

let newTitle = " ";
let newPrice;
let newDescription;

let image = [];
let imageAlt = [];
let newImg = [];

const QueryString = window.location.search;
const urlParams = new URLSearchParams(QueryString);

let id = urlParams.get('id');

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

// calls the getProductWithPromise function then uses that to create the product's information,
// and adds it to the page
getProductWithPromise().then((productInfo) => {
    let productDetails = productInfo;

    for (let i = 0; i < productDetails.length; i++) {

        if (id == productDetails[i]._id) {

            newTitle = productDetails[i].name;
            newPrice = productDetails[i].price;
            newDescription = productDetails[i].description;

            image[i] = productDetails[i].imageUrl;
            imageAlt[i] = productDetails[i].altTxt;
            newImg[i] = document.createElement('img');

            newImg[i].src = image[i];
            newImg[i].alt = imageAlt[i];

            productImageDiv[0].appendChild(newImg[i]);

            title.textContent = newTitle;
            price.textContent = newPrice;
            description.textContent = newDescription;

            // loop that adds the color options to the product

            for (let j = 0; j < productDetails[i].colors.length; j++) {

                let newOption = document.createElement('option');
                let optionText = document.createTextNode(productDetails[i].colors[j]);

                newOption.appendChild(optionText);

                newOption.setAttribute('value', productDetails[i].colors[j]);
                colors.appendChild(newOption);
            }
            break;
        }
    }



})




addToCart.addEventListener('click', () => {
    let quantityChange = [];
    let quantity = productQuantity.value;
    let itemColor = colors.value;
    let quantityChange2 = 0;
    let infoForCart = [id, itemColor, quantity];
    let infoForCartFind = [id, itemColor];

    quantity = parseInt(quantity, 10)
    infoForCartFind = JSON.stringify(infoForCartFind);

    if (itemColor < 1 || quantity < 1){
        
    }
    else{

    if (itemsForCart.length < 1) {
        itemsForCart.push(JSON.stringify(infoForCart));
        console.log(itemsForCart);

    } else {
        let substring = infoForCartFind.replace(/\[|\]/g, '');

        let index = itemsForCart.findIndex(element => {
            if (element.includes(substring)) {
                return true;
            }
        });

        if (index >= 0) {
            quantityChange = JSON.parse(itemsForCart[index]);

            quantityChange2 = quantityChange[2]
            quantityChange2 = parseInt(quantityChange2, 10);
            quantityChange2 += quantity;

            quantityChange[2] = quantityChange2;

            itemsForCart[index] = JSON.stringify(quantityChange);


        } else {
            itemsForCart.push(JSON.stringify(infoForCart));
        }


        // console.log(itemsForCart);
        // console.log(substring);
        console.log(index);
        console.log(quantityChange2);
    }


    window.localStorage.setItem('cartItem', JSON.stringify(itemsForCart));

   
}
    

})

