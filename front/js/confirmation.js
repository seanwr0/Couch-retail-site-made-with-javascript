let orderIdNumber= document.getElementById('orderId');

const QueryString = window.location.search;
const urlParams = new URLSearchParams(QueryString);

let id = urlParams.get('id');

orderIdNumber.textContent = id;