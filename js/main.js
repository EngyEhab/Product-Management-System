var productNameInput = document.getElementById('productNameInput');
var productPriceInput = document.getElementById('productPriceInput');
var productCategoryInput = document.getElementById('productCategoryInput');
var productDescriptionInput = document.getElementById('productDescriptionInput');
var productsContainer;
var addBtn = document.getElementById('addBtn'); 
var updateBtn = document.getElementById('updateBtn'); 
var indexForUpdate;

if(localStorage.getItem('myProducts') != null)
{
    productsContainer = JSON.parse(localStorage.getItem('myProducts'));
    displayProducts(productsContainer);
}
else
{
    var productsContainer = [];
}


function addProduct()
{
    var product = {
        name : productNameInput.value , 
        price : productPriceInput.value ,
        category : productCategoryInput.value , 
        desc : productDescriptionInput.value
    };

    productsContainer.push(product);
    localStorage.setItem('myProducts' , JSON.stringify(productsContainer));
    clearForm();
    displayProducts(productsContainer);
}

function clearForm()
{
    productNameInput.value = "";
    productPriceInput.value = "";
    productCategoryInput.value = "";
    productDescriptionInput.value = "";
}

function displayProducts(productList)
{
    var cartoona = ``;
    for(var i = 0 ; i < productList.length ; i++)
    {
        cartoona += `<tr>
        <td>${i}</td>
        <td>${productList[i].name}</td>
        <td>${productList[i].price}</td>
        <td>${productList[i].category}</td>
        <td>${productList[i].desc}</td>
        <td><button onclick="setFromForUpdate(${i})" class="btn btn-outline-warning btn-sm">Update</button></td>
        <td><button onclick="deleteProducts(${i})" class="btn btn-outline-danger btn-sm">Delete</button></td>
    </tr>`
    }
    document.getElementById('tableBody').innerHTML = cartoona;
}

function searchProducts(searchTerm)
{
    var searchResult = [];
    for (var i = 0 ; i < productsContainer.length ; i++)
    {
        if(productsContainer[i].name.toLowerCase().includes(searchTerm.toLowerCase()) == true)
        {
            searchResult.push(productsContainer[i]);
        }
    }
    displayProducts(searchResult);
}

function deleteProducts(deletedIndex)
{
    productsContainer.splice(deletedIndex,1);
    localStorage.setItem('myProducts' , JSON.stringify(productsContainer));
    displayProducts(productsContainer);
}

function setFromForUpdate(updatedIndex)
{
    indexForUpdate = updatedIndex;
    productNameInput.value =productsContainer[updatedIndex].name;
    productPriceInput.value = productsContainer[updatedIndex].price;
    productCategoryInput.value = productsContainer[updatedIndex].category;
    productDescriptionInput.value = productsContainer[updatedIndex].desc;
    addBtn.classList.add('d-none');
    updateBtn.classList.replace('d-none','d-inline-block');
}

function updateProducts()
{
    productsContainer[indexForUpdate].name = productNameInput.value;
    productsContainer[indexForUpdate].price = productPriceInput.value;
    productsContainer[indexForUpdate].category = productCategoryInput.value;
    productsContainer[indexForUpdate].desc = productDescriptionInput.value;

    localStorage.setItem('myProducts' , JSON.stringify(productsContainer));
    displayProducts(productsContainer);
    clearForm();
    indexForUpdate = "";
}

function validateProductName()
{
    var regex = /^[A-Z][a-z]{3,9}$/;
    if(regex.test(productNameInput.value) == true)
    {
        productNameInput.classList.replace('is-invalid','is-valid');
        return true;
    }
    else
    {
        productNameInput.classList.add('is-invalid');
        return false;
    }
}