let productImageDiv = document.getElementsByClassName('item__img');
let title = document.getElementById('title');
let price = document.getElementById('price');
let description = document.getElementById('description');
let colors = document.getElementById('colors');


let image = [];
let imageAlt = [];
let newImg = [];




const QueryString = window.location.search;
const urlParams = new URLSearchParams(QueryString);

let id = urlParams.get('id');


console.log(id);



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
            image[i] = productDetails[i].imageUrl;
            imageAlt[i] = productDetails[i].altTxt;
            newImg[i] = document.createElement('img');

            newImg[i].src = image[i];
            newImg[i].alt = imageAlt[i];

            productImageDiv[0].appendChild(newImg[i]);

            title.textContent = productDetails[i].name;
            price.textContent = productDetails[i].price;
            description.textContent = productDetails[i].description;

            // loop that adds the color options to the product

            for (let j = 0; j < productDetails[i].colors.length; j++) {

                let newOption = document.createElement('option');
                let optionText = document.createTextNode(productDetails[i].colors[j]);

                newOption.appendChild(optionText);

                newOption.setAttribute('value', productDetails[i].colors[j]);
                colors.appendChild(newOption);


            }
            console.log(id);
            break;
        }
    }



})