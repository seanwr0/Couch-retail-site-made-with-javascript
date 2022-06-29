


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

