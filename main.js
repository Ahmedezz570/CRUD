// get total .
// create product 
// save data in local storage
// clear inputs 
// read data 
// create many products with one click 
// delete 
// update 
// search
// clean data 

let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

console.log(title, price, taxes, ads, discount, total, count, category, submit);


let arr = localStorage.products ? JSON.parse(localStorage.products) : [];

showData();


function getTotal() {
    if (price.value != "") {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.color = 'green';
    } else {
        total.innerHTML = 0;
        total.style.color = 'red';
    }
}


function createProduct() {
    submit.onclick = function () {
        if (title.value !== "" && price.value !== "" && category.value !== "") {
            let newProduct = {
                title: title.value,
                price: price.value,
                taxes: taxes.value || 0,
                ads: ads.value || 0,
                discount: discount.value || 0,
                total: total.innerHTML,
                count: count.value || 1,
                category: category.value,
            };

            
            for (let i = 0; i < newProduct.count; i++) {
                arr.push(newProduct);
            }

           
            localStorage.setItem('products', JSON.stringify(arr));

           
            showData();

            
            clearInputs();
        } else {
            alert("Please fill in all required fields!");
        }
    };
}


function clearInputs() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    count.value = "";
    category.value = "";
    total.innerHTML = "Total: 0";
    total.style.color = "red";
}

// Display a Product
function showData() {
    let table = '';
    for (let i = 0; i < arr.length; i++) {
        table += `
            <tr>
                <td>${i + 1}</td>
                <td>${arr[i].title}</td>
                <td>${arr[i].price}</td>
                <td>${arr[i].taxes}</td>
                <td>${arr[i].ads}</td>
                <td>${arr[i].discount}</td>
                <td>${arr[i].total}</td>
                <td>${arr[i].category}</td>
                <td><button onclick="updateProduct(${i})">Update</button></td>
                <td><button onclick="deleteProduct(${i})">Delete</button></td>
            </tr>
        `;
    }

    document.getElementById('tbody').innerHTML = table;
}

// Delete a product .
function deleteProduct(index) {
    arr.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(arr));
    showData();
}
function updateProduct(index) {
   
    let product = arr[index];

    title.value = product.title;
    price.value = product.price;
    taxes.value = product.taxes;
    ads.value = product.ads;
    discount.value = product.discount;
    count.value = 1; 
    category.value = product.category;

    
    getTotal();

   
    submit.innerHTML = "Update";

    
    submit.onclick = function () {
        
        arr[index] = {
            title: title.value,
            price: price.value,
            taxes: taxes.value || 0,
            ads: ads.value || 0,
            discount: discount.value || 0,
            total: total.innerHTML,
            count: 1,
            category: category.value,
        };

       
        localStorage.setItem("products", JSON.stringify(arr));

        
        submit.innerHTML = "Create";

        showData();

    
        clearInputs();

        createProduct();
    };
}

function searchTitle (){

    let searchInput = document.getElementById('search').value.toLowerCase();
    let filteredProducts = arr.filter(item => item.title.toLowerCase().includes(searchInput));
    document.getElementById('tbody').innerHTML = '';
}


createProduct();


