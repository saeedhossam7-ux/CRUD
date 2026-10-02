var productNameInput = document.getElementById('productName');
var productCategoryInput = document.getElementById('productCategory');
var productPriceInput = document.getElementById('productPrice');
var productDescriptionInput = document.getElementById('productDescription');
var productsContainerInput = document.getElementById('productsContainer');
var productImageInput = document.getElementById('productImage');
var searchProductsInput = document.getElementById('searchProductsInput')
var addbtn = document.getElementById('addbtn')
var updatebtn = document.getElementById('updatebtn')

var productList = JSON.parse(localStorage.getItem('productList')) || []
var proIndex;

var nameRegex = /^[A-Z][A-Za-z0-9 ]{3,10}$/;
var categoryRegex = /^(Mobile|Laptop|Camera|Clothes|Medicine)$/;
var priceRegex = /^([1-9]|[1-9][0-9]|[1-9][0-9][0-9]|[1-9][0-9][0-9][0-9]|10000)$/;
var descriptionRegex = /^[A-Za-z0-9 ]{10,}$/;

displayAllProduct()

function addProduct() {
  var isValid = validation(nameRegex, productNameInput) &&
    validation(categoryRegex, productCategoryInput) &&
    validation(priceRegex, productPriceInput) &&
    validation(descriptionRegex, productDescriptionInput)


  if (isValid) {
    var prodcuts = {
      name: productNameInput.value,
      category: productCategoryInput.value,
      price: productPriceInput.value,
      description: productDescriptionInput.value,
      image: productImageInput.files[0].name

    }

    productList.push(prodcuts);
    localStorage.setItem('productList', JSON.stringify(productList));
    displayAllProduct()
    clearForm()

    Swal.fire({
      title: "الله ينور يمعلم",
      icon: "success",
      draggable: true
    });


  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "راجع بيناتك تاني كويس",
    });
  }
}
function displayProduct(index) {
  var prodcutCart = `
 <div class="col-md-6 col-lg-3">
              <div class="product-card rounded-3 overflow-hidden">
                <img src="./images/${productList[index].image}" class="w-100  object-fit-contain bg-white p-3" alt="" />
                <div class="product-info p-3">
                  <div
                    class="d-flex align-items-center justify-content-between"
                  >
                    <h3 class="h5">${productList[index].name}</h3>
                  </div>
                  <div class="d-flex justify-content-between align-items-center mt-1 mb-3">
                    <h4 class="h6">
                      <span>${productList[index].category}</span>
                    </h4>
                    <span>${productList[index].price} L.E</span>
                  </div>
                  <p class="text-body-secondary">
               ${productList[index].description}
                  </p>
                  <div class="d-flex gap-2">
                    <button class="w-100 btn btn-outline-warning" onclick= 'productInfo(${index})'>
                      Update
                    </button>
                    <button class="w-100 btn btn-outline-danger" onclick= 'deleteProduct(${index})'>Delete</button>
                  </div>
                </div>
              </div>
            </div>
`
  productsContainerInput.innerHTML += prodcutCart

}

function displayAllProduct() {
  productsContainerInput.innerHTML = ''
  for (var i = 0; i < productList.length; i++) {
    displayProduct(i)
  }
}

function deleteProduct(index) {
  productsContainerInput.innerHTML = ''
  productList.splice(index, 1)
  localStorage.setItem('productList', JSON.stringify(productList))
  displayAllProduct()
}

function validation(name, input) {
  if (name.test(input.value)) {
    input.nextElementSibling.classList.add('d-none')
    input.classList.add('is-valid')
    input.classList.remove('is-invalid')
    return true
  } else {
    input.nextElementSibling.classList.remove('d-none')
    input.classList.remove('is-valid')
    input.classList.add('is-invalid')
    return false
  }
}
function search() {
  var hasResults = false;
  productsContainerInput.innerHTML = '';
  var productSearch = searchProductsInput.value;
  for (var i = 0; i < productList.length; i++) {
    if (productList[i].name.toLowerCase().includes(productSearch.toLowerCase())) {
      displayProduct(i)
      hasResults = true;
    }
    if (!hasResults) {
      productsContainerInput.innerHTML = '<p class="text-danger text-center mt-3">لا توجد منتجات تطابق بحثك.</p>';
    }
  }
};

function productInfo(index) {
  proIndex = index;
  productNameInput.value = productList[index].name
  productCategoryInput.value = productList[index].category
  productPriceInput.value = productList[index].price
  productDescriptionInput.value = productList[index].description
  productImageInput.files[0] ? productImageInput.files[0].name : productList[index].image

  addbtn.classList.add('d-none')
  updatebtn.classList.remove('d-none')

}

function updateProduct() {
  var isValid = validation(nameRegex, productNameInput) &&
    validation(categoryRegex, productCategoryInput) &&
    validation(priceRegex, productPriceInput) &&
    validation(descriptionRegex, productDescriptionInput)


  if (isValid) {
productList[proIndex].name = productNameInput.value
productList[proIndex].category = productCategoryInput.value
productList[proIndex].price = productPriceInput.value
productList[proIndex].description = productDescriptionInput.value
productList[proIndex].image = productImageInput.files[0]?.name || productList[proIndex].image;
updatebtn.classList.add('d-none')
  addbtn.classList.remove('d-none')
    
    localStorage.setItem('productList', JSON.stringify(productList));
    displayAllProduct()
    clearForm()


  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "راجع بيناتك تاني كويس",
    });
  }
}
function clearForm() {
  productNameInput.value = '';
  productCategoryInput.value = '';
  productPriceInput.value = '';
  productDescriptionInput.value = '';
  productImageInput.value = '';
}