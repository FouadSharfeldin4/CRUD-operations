var productName = document.getElementById("ProductName");
var ProductPrice = document.getElementById("ProductPrice");
var ProductCategory = document.getElementById("ProductCategory");
var ProductDescription = document.getElementById("ProductDescription");
var ProductImage = document.getElementById("ProductImage");
var searchInput = document.getElementById("searchInput");
var addBtn = document.getElementById("addBtn");
var updateProductBtn = document.getElementById("updateProduct");
var productContainer;
var updatedIndex = null; 

if (localStorage.getItem("product") == null) {
    productContainer = [];
} else {
    productContainer = JSON.parse(localStorage.getItem("product"));
    displayProduct();
}

function addproduct() {
    var product = {
        code: productName.value,
        price: ProductPrice.value,
        category: ProductCategory.value,
        decs: ProductDescription.value,
        image: ProductImage.files.length > 0 ? `imgs/imgs/${ProductImage.files[0].name}` : "imgs/default.jpg",
    };
    
    productContainer.push(product);
    clearForm();
    displayProduct();
    localStorage.setItem('product', JSON.stringify(productContainer));
}

function clearForm() {
    productName.value = "";
    ProductPrice.value = "";
    ProductCategory.value = "";
    ProductDescription.value = "";
    ProductImage.value = "";
}

function displayProduct() {
    var cartona = '';
    for (var i = 0; i < productContainer.length; i++) {
        cartona += `
        <div class="col-md-2 col-sm-6">
            <div class="product">
                <img src=${productContainer[i].image} class="w-100 rounded-2" alt="product name">
                <h2 class="h6 text-secondary">${productContainer[i].code}</h2>
                <p class="text-secondary mb-2 ">${productContainer[i].decs}</p>
                <h3 class="h6 text-secondary">${productContainer[i].price}</h3>
                <h3 class="h6 text-secondary">${productContainer[i].category}</h3>
                <button onclick="deletProduct(${i})" class="btn btn-outline-danger btn-sm w-100 my-2">Delete <i class="fas fa-trash"></i></button>
                <button onclick="setFormForUpdate(${i})" class="btn btn-outline-warning btn-sm w-100 my-2">Update <i class="fas fa-pen"></i></button>
            </div>
        </div>`;
    }
    document.getElementById("productRow").innerHTML = cartona;
}

function deletProduct(deletedIndx) {
    productContainer.splice(deletedIndx, 1);
    displayProduct();
    localStorage.setItem('product', JSON.stringify(productContainer));
}

function searchProduct() {
    var term = searchInput.value.toLowerCase();
    var cartona = '';
    for (var i = 0; i < productContainer.length; i++) {
        if (productContainer[i].code.toLowerCase().includes(term)) {
            cartona += `
            <div class="col-md-2 col-sm-6">
                <div class="product">
                    <img src=${productContainer[i].image} class="w-100 rounded-2" alt="product name">
                    <h2 class="h6 text-secondary">${productContainer[i].code}</h2>
                    <p class="text-secondary mb-2 ">${productContainer[i].decs}</p>
                    <h3 class="h6 text-secondary">${productContainer[i].price}</h3>
                    <h3 class="h6 text-secondary">${productContainer[i].category}</h3>
                    <button onclick="deletProduct(${i})" class="btn btn-outline-danger btn-sm w-100 my-2">Delete <i class="fas fa-trash"></i></button>
                    <button onclick="setFormForUpdate(${i})" class="btn btn-outline-warning btn-sm w-100 my-2">Update <i class="fas fa-pen"></i></button>
                </div>
            </div>`;
        }
    }
    document.getElementById("productRow").innerHTML = cartona;
}

function setFormForUpdate(i) {
    updatedIndex = i; 
    productName.value = productContainer[i].code;
    ProductDescription.value = productContainer[i].decs;
    ProductPrice.value = productContainer[i].price;
    ProductCategory.value = productContainer[i].category;

    addBtn.classList.add("d-none");
    updateProductBtn.classList.remove("d-none"); 
}

function updateProduct() {
    if (updatedIndex !== null) { 
        productContainer[updatedIndex].code = productName.value;
        productContainer[updatedIndex].decs = ProductDescription.value;
        productContainer[updatedIndex].price = ProductPrice.value;
        productContainer[updatedIndex].category = ProductCategory.value;

        localStorage.setItem('product', JSON.stringify(productContainer)); 
        displayProduct(); 
        clearForm(); 

        addBtn.classList.remove("d-none"); 
        updateProductBtn.classList.add("d-none"); 

        updatedIndex = null; 
    }
}

function validateProductInput(element) {
    var regex = {
        ProductName: /^[A-Z][a-z]{2,8}$/,  
        ProductPrice: /^[1-9][0-9]*$/, 
        ProductDescription: /^.{6,}$/,     
        ProductCategory: /^(Tv|Mobile|Laptop|Screens|Technology)$/ 
    };

    var fieldName = element.id; 
    var errorElement = element.nextElementSibling; 

    if (regex[fieldName]) { 
        if (regex[fieldName].test(element.value)) {
            element.classList.remove("is-invalid");
            element.classList.add("is-valid");

            if (errorElement && errorElement.classList.contains("alert")) {
                errorElement.classList.add("d-none"); 
            }
        } else {
            element.classList.remove("is-valid");
            element.classList.add("is-invalid");

            if (errorElement && errorElement.classList.contains("alert")) {
                errorElement.classList.remove("d-none"); 
            }
        }
    }
}

