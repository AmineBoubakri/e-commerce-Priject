// Customer signup function to adduser into local storage : users with "admin"
function customerSignup() {
    var firstName = document.getElementById('fName').value;
    var lastName = document.getElementById('lName').value;
    var email = document.getElementById('emailId').value;
    var passWord = document.getElementById('pwdId').value;
    var confPassWord = document.getElementById('confPwdId').value;
    var telePhone = document.getElementById('phoneNumId').value;
    var userId = JSON.parse(localStorage.getItem('userIdKey') || '1');
    // create user object
    var user = {
        id: userId,
        fname: firstName,
        lname: lastName,
        email: email,
        passWord: passWord,
        confPassWord: confPassWord,
        telePhone: telePhone,
        role: 'user'
    }
    // get all users from LS kye = users
    var usersTab = JSON.parse(localStorage.getItem('users') || '[]');
    usersTab.push(user);
    // set user array into users array
    localStorage.setItem('users', JSON.stringify(usersTab));
    localStorage.setItem('userIdKey', userId + 1);
    location.replace('login.html');
}
// login function that allows to connect by email and pwd
function login() {
    var email = document.getElementById('loginEmailId').value;
    var pwd = document.getElementById('loginPwdId').value;
    var findedUser = searchUser(email, pwd);
    console.log('findedUser', findedUser);
    // user is correct
    if (findedUser) {
        if (findedUser.role == "admin") {
            localStorage.setItem('connectedUserId', findedUser.id);
            // go to index.html
            location.replace('index.html');
        } else {
            localStorage.setItem('connectedUserId', findedUser.id);
            // go to index.html
            location.replace('shop.html');

        }

    } else {
        document.getElementById('loginMsgError').innerHTML = 'Please chek Email/Pwd';
        document.getElementById('loginMsgError').style.color = 'red';
    }
}
// search user by email and pwd fromusers (getted from LS)
function searchUser(emailParam, pwdParam) {
    users = JSON.parse(localStorage.getItem('users') || '[]');
    var findedUser;
    for (let i = 0; i < users.length; i++) {
        if (users[i].email == emailParam && users[i].passWord == pwdParam) {
            findedUser = users[i];
            break;

        }

    }
    return findedUser;
}
// admin signup function to add admin into LS :users with "admin"
function storeSignup() {
    var firstName = document.getElementById('fNameStoreId').value;
    var lastName = document.getElementById('lNameStoreId').value;
    var email = document.getElementById('emailStoreId').value;
    var passWord = document.getElementById('pwdStoreId').value;
    var confPassWord = document.getElementById('confPwdStoreId').value;
    var telephone = document.getElementById('phoneStoreNumId').value;
    var fax = document.getElementById('faxStoreId').value;
    var address = document.getElementById('addressStoreId').value;
    var patent = document.getElementById('pattenteId').value;
    var companyName = document.getElementById('companyId').value;
    var userId = JSON.parse(localStorage.getItem('userIdKey') || '1');

    var emailUnique = emailExists(email);
    var pattenteUnique = pattenteExists(patent);
    var companyNameExists = socialReasonExists(companyName);
    if (!emailUnique && !pattenteUnique && !companyNameExists) {
        var user = {
            id: userId,
            fname: firstName,
            lname: lastName,
            email: email,
            passWord: passWord,
            confPassWord: confPassWord,
            telePhone: telephone,
            fax: fax,
            adress: address,
            patent: patent,
            companyName: companyName,
            role: 'admin'
        };
        // get all users from LS kye = users
        var usersTab = JSON.parse(localStorage.getItem('users') || '[]');
        usersTab.push(user);
        // set user array into users array
        localStorage.setItem('users', JSON.stringify(usersTab));
        localStorage.setItem('userIdKey', userId + 1);
    } else {

    }


}
// function that checks if email exist
function emailExists(email) {
    // get all users from LS
    var users = JSON.parse(localStorage.getItem('users') || '[]');
    // users = [{email}, {email}, {email}]
    var userExists = false;
    for (let i = 0; i < users.length; i++) {
        if (users[i].email == email) {
            userExists = true;
            break;
        }
    }
    return userExists;
}
// function that checks if pattente exists
function pattenteExists(pattente) {
    // get all users from LS
    var users = JSON.parse(localStorage.getItem('users') || '[]');
    // users = [{email}, {email}, {email}]
    var pattenteExists = false;
    for (let i = 0; i < users.length; i++) {
        if (users[i].pattente == pattente) {
            userExists = true;
            break;
        }
        return pattenteExists;
    }

}// function that checks if companyNameExists  exist
function socialReasonExists(companyName) {
    // get all users from LS
    var users = JSON.parse(localStorage.getItem('users') || '[]');
    // users = [{email}, {email}, {email}]
    var companyNameExists = false;
    for (let i = 0; i < users.length; i++) {
        if (users[i].companyName == companyName) {
            companyNameExists = true;
            break;
        }
    }
    return companyNameExists;
}
// function that checks the length 
function verifLength(ch, nbr) {
    return (ch.length >= nbr);
}
// function that checks stock  > 10
function checkStock(nbr) {
    return (nbr > 10)
}
// function that checks the price is a number  
function checkPrice(nbr) {
    return (nbr > 0)
}
// addCategory function that allows to save category into LS:categories
function addCategory() {
    var name = document.getElementById('categoryNamId').value;
    var connectedUserId = localStorage.getItem('connectedUserId');
    var categoryId = JSON.parse(localStorage.getItem('categoryIdKey') || '1');
    var category = {
        id: categoryId,
        name: name,
        userId: connectedUserId
    };
    var categories = JSON.parse(localStorage.getItem('categories') || '[]');
    categories.push(category);
    localStorage.setItem('categories', JSON.stringify(categories));
    localStorage.setItem('categoryIdKey', categoryId + 1)
}
// to add product function that allows to save product into LS :products
function addProduct() {
    var name = document.getElementById('nameProdId').value;
    var price = document.getElementById('priceProdId').value;
    var stock = document.getElementById('stockProdId').value;
    var category = document.getElementById('categoryProdId').value;
    var connectedUserId = localStorage.getItem('connectedUserId');

    var productId = JSON.parse(localStorage.getItem('productIdKey') || '1');
    var product = {
        id: productId,
        name: name,
        price: price,
        stock: stock,
        category: category,
        userId: connectedUserId,
        isConfirmed: false
    };
    var isNameValid = verifLength(name, 2);
    var isPriceValid = checkPrice(price);
    var isStockValid = checkStock(stock)
    if (isNameValid) {

        document.getElementById("errorNameId").innerHTML = "";

    } else {
        document.getElementById("errorNameId").innerHTML = "please check  the name of the product";
        document.getElementById("errorNameId").style.color = "red";

    }
    if (isPriceValid) {

        document.getElementById("errorPriceId").innerHTML = "";
    } else {
        document.getElementById("errorPriceId").innerHTML = "please check the price of the product";

        document.getElementById("errorPriceId").style.color = "red";
    }
    if (isStockValid) {

        document.getElementById("errorStockId").innerHTML = "";
    } else {
        document.getElementById("errorStockId").innerHTML = "please check the stock of the product";
        document.getElementById("errorStockId").style.color = "red";
    }
    if (isNameValid && isPriceValid && isStockValid) {


        var productsTab = JSON.parse(localStorage.getItem('products') || '[]');
        productsTab.push(product);
        // set productTab array into products array
        localStorage.setItem('products', JSON.stringify(productsTab));
        localStorage.setItem('productIdKey', productId + 1);
    }


}
// generate categories options
function generateOptions() {
    var categories = getObjectFromLS('categories');
    var connectedUserId = localStorage.getItem('connectedUserId');
    var categoriesSelect = ``;
    for (let i = 0; i < categories.length; i++) {
        if (connectedUserId == categories[i].userId) {
            categoriesSelect = categoriesSelect + `
            <option value="${categories[i].name}">${categories[i].name}</option>`

        }
    }
    document.getElementById('categoryProdId').innerHTML = categoriesSelect;
}
// function getObjectFromLS that return all objects from LS by params = key 
function getObjectFromLS(key) {
    return JSON.parse(localStorage.getItem(key) || '[]');

}
// function getConnectedUser that return connected user from LS 
function getConnectedUser() {
    return localStorage.getItem('connectedUserId');

}
// displayUserProducts function that allows to display all connected user products
function displayUserProducts() {
    var products = JSON.parse(localStorage.getItem('products') || '[]');
    var connectedUserId = localStorage.getItem('connectedUserId');
    var myProducts = getUserProducts(connectedUserId, products);
    var productsDiv = ``;
    for (let i = 0; i < myProducts.length; i++) {
        productsDiv = productsDiv + ` <div class="col-lg-3 col-md-6">
        <div class="single-product">
            <img class="img-fluid" src="img/product/p1.jpg" alt="">
            <div class="product-details">
                <h6>${myProducts[i].name}</h6>
                <div class="price">
                    <h6>${myProducts[i].price}</h6>
                    <h6 class="l-through">$210.00</h6>
                </div>
                <h6>${myProducts[i].category}</h6>
                <div class="prd-bottom">
                <h6>${myProducts[i].stock}</h6>
                    <div  class="social-info">
                        <span class="ti-bag"></span>
                        <button onclick="goToDiplayProduct(${myProducts[i].id})"  class="btn hover-text">Display Product</button>
                    </div>
                    <div href="" class="social-info">
                    <span class="ti-bag"></span>
                        <button onclick="deleteobject(${getObjectPositionById(myProducts[i].id, products)},'products')"  class="btn hover-text">Delete Product</button>
                      
                    </div>
                   
                   
                </div>
            </div>
        </div>
    </div>`

    }
    document.getElementById('products').innerHTML = productsDiv;
}
// function that returns user products by id(2 params : connectedUserId ,products array)
function getUserProducts(userId, productsTab) {
    var myProducts = [];
    for (let i = 0; i < productsTab.length; i++) {
        if (productsTab[i].userId == userId && productsTab[i].isConfirmed == true) {
            myProducts.push(productsTab[i]);
        }

    }
    return myProducts;
}
// function goToDiplayProduct that change location and save id into LS 
function goToDiplayProduct(productId) {
    localStorage.setItem('selectedProductId', productId);
    location.replace('single-product.html');
}
// function searchProductById that returns object (product) from LS
function searchProductById(id) {
    var products = JSON.parse(localStorage.getItem('products') || '[]');
    var findedProduct;
    for (let i = 0; i < products.length; i++) {
        if (products[i].id == id) {
            findedProduct = products[i];
            break
        }

    }
    return findedProduct;
}
// function displayEditForm  that displays edit form after btn click
function displayEditForm() {
    var idProduct = localStorage.getItem('selectedProductId');
    var findedProduct = searchProductById(idProduct);

    var editForm = `
    
    <div class="row">
        <div class="col-lg-12">
            <div class="login_form_inner" style="margin-top=50px">
                <h3>Edit Product</h3>
                <div class="row ">
                    <label>Price</label>
                    <div class="col-md-12 form-group">
                        <input type="text" class="form-control" id="newPriceId"  value=${findedProduct.price}>
                    </div>
                    <label>Stock</label>
                    <div class="col-md-12 form-group">
                        <input type="text" class="form-control" id="newStockId"  value=${findedProduct.stock}>
                    </div>

                    <div class="col-md-12 form-group">
                        <button type="submit" value="submit" onclick="validatEdit()" class="primary-btn">Validate Edit
                        </button>

                    </div>
                </div>
            </div>
        </div>
    </div> `
    document.getElementById('editFormDiv').innerHTML = editForm;


}
// finction validatEdit : updateproduct price and stock bye new values (getted from edit form)
function validatEdit() {
    var newPrice = document.getElementById('newPriceId').value;
    var newStock = document.getElementById('newStockId').value;
    var products = getObjectFromLS('products');
    var selectedProductId = localStorage.getItem('selectedProductId');
    for (let i = 0; i < products.length; i++) {
        if (products[i].id == selectedProductId) {
            products[i].price = newPrice;
            products[i].stock = newStock;
            break
        }
    }
    localStorage.setItem('products', JSON.stringify(products));
    location.replace('products.html');
}
// function deleteProduct
function deleteProduct(pos) {
    var products = getObjectFromLS('products');
    products.splice(pos, 1);
    localStorage.setItem('products', JSON.stringify(products));
    location.reload();
}
// function generateProductsTable that displays all products into table (from LS : products)
function generateProductsTable() {
    var products = getObjectFromLS('products');
    var productsTab = `<table class="table table-striped">
    <tr>
      <th>Name</th>
      <th>Price</th>
      <th>Stock</th>
      <th>Category</th>
      <th>Actions</th>
     </tr>`;
    for (let i = 0; i < products.length; i++) {
        var product = products[i];
        productsTab += `

        <tr>
         <td>${product.name}</td>
         <td>${product.price}</td>
         <td>${product.stock}</td>
         <td>${product.category}</td>
         <td>
          <button class="btn btn-danger" onclick="deleteProduct(${i})">Delete</button>
          <button class="btn btn-success" onclick="confirmProduct(${product.id})">Confirme</button>
         </td>

    </tr>  `;


    }
    productsTab += `</table>`
    document.getElementById('productsTabDiv').innerHTML = productsTab;
}
// function generateUsersTable that displays all users into table (from LS : users)
function generateUsersTable() {
    var users = getObjectFromLS('users');
    var usersTab = ``;
    for (let i = 0; i < users.length; i++) {
        var user = users[i];
        usersTab = usersTab + `
     <table class="table table-striped">
        <tr>
           <th>First Name</th>
           <th>Last Name</th>
           <th>Email</th>
           <th>Tel</th>
           <th>Role</th>
           <th>Action</th>
       </tr>
     <tr>
        <td>${user.fname}</td>
        <td>${user.lname}</td>
        <td>${user.email}</td>
        <td>${user.telePhone}</td>
        <td>${user.role}</td>
        
        <td> <button class="btn btn-danger" onclick="">Delete </button>
        </td>
    </tr>   ` ;

    }
    usersTab += `</table>`
    document.getElementById('usersTabDiv').innerHTML = usersTab;
}
// function confirmProduct that changes isconfimed attribut bye true
function confirmProduct(id) {
    var products = JSON.parse(localStorage.getItem('products') || '[]');
    for (let i = 0; i < products.length; i++) {
        if (products[i].id == id) {
            products[i].isConfirmed = true;
            break

        }
    }
    localStorage.setItem('products', JSON.stringify(products));

}
// function deleteProduct
function deleteProduct(pos) {
    var products = getObjectFromLS('products');
    products.splice(pos, 1);
    localStorage.setItem('products', JSON.stringify(products));
    location.reload;
}
// Generic function deleteObject
function deleteObject(pos, key) {
    var objects = getObjectFromLS(key);
    objects.splice(pos, 1);
    localStorage.setItem(key, JSON.stringify(objects));
    location.reload();
}
// function deleteOrderAndUpdateStock  that allows to delete order by id and update product stock
function deleteOrderAndUpdateStock(pos, key, productId, qty) {
    var objects = getObjectFromLS(key);
    objects.splice(pos, 1);
    localStorage.setItem(key, JSON.stringify(objects));
    var products = getObjectFromLS('products');
    for (let i = 0; i < products.length; i++) {
        if (products[i].id == productId) {
            products[i].stock += Number(qty);
            break;
        }
    }
    localStorage.setItem('products', JSON.stringify(products));
    location.reload();

}
// function shopProduct that displays all confirmed products to simple user
function shopProducts() {
    var products = getObjectFromLS('products');
    var confirmProduct = [];
    for (let i = 0; i < products.length; i++) {
        if (products[i].isConfirmed = true) {
            confirmProduct.push(products[i]);

        }

    }
    var productsDiv = ``;
    for (let i = 0; i < confirmProduct.length; i++) {
        var product = confirmProduct[i];
        productsDiv += `	<div class="col-lg-4 col-md-6">
        <div class="single-product">
            <img class="img-fluid" src="img/product/p1.jpg" alt="">
            <div class="product-details">
                <h6>${product.name}</h6>
                <div class="price">
                    <h6>$${product.price}</h6>
                   
                    <h6 class="l-through">$${product.price}</h6><br> 
                    <h6>${product.category}</h6>
                </div>
                <div class="prd-bottom">

                    <div class="social-info">
                        <span class="ti-bag"></span>
                        <button class="hover-text btn" onclick="goToDiplayProduct(${product.id})" style="background-color:#fff">Display</button>
                    </div>
                    <div class="social-info">
                        <span class="lnr lnr-heart"></span>
                        <button class="hover-text btn" onclick="addToWishList(${product.id})" style="background-color:#fff">Add to Wishlist</button>
                    </div>
                    <a href="" class="social-info">
                        <span class="lnr lnr-move"></span>
                        <p class="hover-text">view more</p>
                    </a>
                </div>
            </div>
        </div>
    </div>`

    }
    document.getElementById('productsDiv').innerHTML = productsDiv;
}
// function addToWishList create wishlist object and save it to LS (key:wishlist)
function addToWishList(id) {
    var connectedUserId = getConnectedUser();
    var wishListId = JSON.parse(localStorage.getItem('wishListIdKey') || '1');
    var wishlistTab = JSON.parse(localStorage.getItem('wishList') || '[]');

    var wishListObj = {
        id: wishListId,
        productId: id,
        userId: connectedUserId
    };
    wishlistTab.push(wishListObj);
    localStorage.setItem('wishList', JSON.stringify(wishlistTab));
    localStorage.setItem('wishListIdKey', wishListId + 1);
    location.replace('wishlist.html');


}
// function searchUserById that returns object (product) from LS
function searchUserById(id) {
    var users = JSON.parse(localStorage.getItem('users') || '[]');
    var findedUser;
    for (let i = 0; i < users.length; i++) {
        if (users[i].id == id) {
            findedUser = users[i];
            break
        }

    }
    return findedUser;
}
// function displayProductByUserRol that displays products informations bye role 
function displayProductByUserRol() {
    var connectedUserId = getConnectedUser();

    var productInfoBloc = ``;
    if (connectedUserId) {
        var findedUser = searchUserById(connectedUserId);
        if (findedUser.role == "admin") {
            var productInfoBloc = `<div class="s_product_text">
        <h3 id="prNameId"></h3>
        <h2 id="prPriceId"></h2>
        <ul class="list">
            <li><a class="active" href="#"><span>Category</span> : <span id="prCategoryId"></span> </a>
            </li>
            <li><a href="#"><span>Availibility</span> : In Stock</a></li>
        </ul>
        <div>
            <h3>Stock Quantity</h3>
            <h4 id="prSotckId"></h4>
        </div>
        <button class="btn btn-warning" onclick="displayEditForm()">Edit Product </button>
        <div id="editFormDiv"></div>
    </div> `
        } else {
            var productInfoBloc = `<div class="s_product_text">
        <h3 id="prNameId"></h3>
        <h2 id="prPriceId"></h2>
        <ul class="list">
            <li><a class="active" href="#"><span>Category</span> : <span id="prCategoryId"></span> </a>
            </li>
            <li><a href="#"><span>Availibility</span> : In Stock</a></li>
        </ul>
        <div>
            <h3>Stock Quantity</h3>
            <h4 id="prSotckId"></h4>
        </div>
        <input class="form-control" placeholder="Insert Qantity" id="reservedQty" type="number"> <br>
        <span id='qtyErrorMsg'></span> <br>
        <div><button type="submit" onclick="reserve()" class="btn btn-warning">Reserve Product</button></div>
        
    </div> `
        }

    } else {
        var productInfoBloc =
            `<div class="s_product_text">
         <h3 id="prNameId"></h3>
        <h2 id="prPriceId"></h2>
        <ul class="list">
            <li><a class="active" href="#"><span>Category</span> : <span id="prCategoryId"></span> </a>
            </li>
            <li><a href="#"><span>Availibility</span> : In Stock</a></li>
        </ul>
        <div>
            <h3>Stock Quantity</h3> <h4 id="prSotckId"></h4>
           
        </div>
              <div><button type="submit" onclick="goToLogin()" class="btn btn-warning">Login</button></div>
          </div> `
    }

    document.getElementById('productInfo').innerHTML = productInfoBloc;
}
// function goToLogin
function goToLogin() {
    location.replace('login.html');
}
// function  reserve that create order object into Ls and update stock
function reserve() {
    var connectedUserId = getConnectedUser();
    var productId = localStorage.getItem('selectedProductId');
    var qty = document.getElementById('reservedQty').value;
    var product = searchProductById(productId);
    if (Number(product.stock) >= Number(qty)) {
        var orderId = JSON.parse(localStorage.getItem('orderIdKey') || '1');
        var orders = getObjectFromLS('orders');
        // ceate order object
        var order = {
            id: orderId,
            qty: qty,
            userId: connectedUserId,
            productId: productId,
            status: false
        };
        orders.push(order);
        localStorage.setItem('orders', JSON.stringify(orders));
        localStorage.setItem('orderIdKey', orderId + 1);
        // update product stock
        updateProductStock(productId, qty);
        location.replace('basket.html');

    } else {
        document.getElementById('qtyErrorMsg').innerHTML = 'Unvailable Qty';
        document.getElementById('qtyErrorMsg').style.color = 'red';
    }

}
// function updateProductStock that updates product stock bye new qty
function updateProductStock(id, qty) {
    var products = getObjectFromLS('products');
    for (let i = 0; i < products.length; i++) {
        if (products[i].id == id) {
            // products[i].stock= products[i].stock-qty
            products[i].stock -= qty;
            break;

        }

    }
    localStorage.setItem('products', JSON.stringify(products));
}
// function basket that displays all user orders into basket page
function basket() {
    var orders = getObjectFromLS('orders');
    var connectedUserId = localStorage.getItem('connectedUserId');
    var myOrders = userOrders(orders, connectedUserId);
    var userBasket = ``;
    if (myOrders.length == 0) {
        //  No reserved products
        userBasket = `<div class="text-center"><h2>No Reserved Products</h2></div>`
    } else {
        userBasket = `<table class="table">
 <thead>
     <tr>
         <th scope="col">Product</th>
         <th scope="col">Price</th>
         <th scope="col">Quantity</th>
         <th scope="col">Total</th>
         <th scope="col">Actions</th>
     </tr>
 </thead>
 <tbody>`;
        var total = 0;
        for (let i = 0; i < myOrders.length; i++) {
            var order = myOrders[i];
            var product = searchProductById(order.productId);
            var total = total + (product.price * order.qty);
            userBasket += `<tr>
         <td>
             <div class="media">
                 <div class="d-flex">
                     <img src="img/cart.jpg" alt="">
                 </div>
                 <div class="media-body">
                     <p>${product.name}</p>
                 </div>
             </div>
         </td>
         <td>
             <h5>$${product.price}</h5>
         </td>
         <td>
         ${order.qty}
         </td>
         <td>
             <h5>${searchProductById(order.productId).price * order.qty}</h5>
         </td>`;
            if (!(order.status)) {
                userBasket += `<td>
            <button class="btn btn-danger" onclick="deleteOrderAndUpdateStock(${getObjectPositionById(order.id, orders)},'orders',${product.id},${order.qty})">Delete</button>
        </td>
          </tr>`;
            } else {
                userBasket += `<td> Your order is confirmed by store
            
        </td>
          </tr>`;
            }

        }
        userBasket += `<tr>
         <td>
 
         </td>
         <td>
 
         </td>
         <td>
             <h5>Subtotal</h5>
         </td>
         <td>
             <h5>$${total}</h5>
         </td>
     </tr>
     <tr class="shipping_area">
         <td>
 
         </td>
         <td>
 
         </td>
         <td>
             <h5>Shipping</h5>
         </td>
         <td>
             
                     ${shippingPrice(total)}
                     
            
         </td>
     </tr>
     <tr class="out_buttoFn_area">
         <td>
 
         </td>
         <td>
 
         </td>
         <td>
 
         </td>
         <td>
             <div class="checkout_btn_inner d-flex align-items-center">
                 
                 <a class="primary-btn" href="#">Proceed to checkout</a>
             </div>
         </td>
     </tr>
 </tbody>
 </table>`;

    }
    document.getElementById('userBasket').innerHTML = userBasket;
}
// function that returns position of order into orders by ID
function getObjectPositionById(id, tab) {
    var pos;
    for (let i = 0; i < tab.length; i++) {
        if (tab[i].id == id) {
            pos = i;
            break;
        }

    }
    return pos;
}
// function userOrders that returns all users orders by ID  
function userOrders(orders, userIdParam) {
    var myOrders = [];
    for (let i = 0; i < orders.length; i++) {
        if (orders[i].userId == userIdParam) {
            myOrders.push(orders[i]);
        }
    }
    return myOrders;
}
// function shippingPrice  that returns free if totalPrice >= 300 else 7$
function shippingPrice(price) {
    // if(price>=300){
    //     return 'Free';

    // }else{
    //     return '7$'
    // }
    // Ternary Operator
    return (price >= 300) ? 'Free' : '7$';
}
// function that remove items connectedUserId from LS
function logout() {
    localStorage.removeItem('connectedUserId');
    location.replace('index.html');
}
// function  userInformations that displays user informations 
function userInformations() {
    var connectedUserId = localStorage.getItem('connectedUserId');
    console.log('connectedUserId', connectedUserId);
    var user = searchUserById(connectedUserId)
    var userInfo = `<div class="s_product_text container">
    <h2>User Informations</h2>
    <h3>First Name : ${user.fname}</h3>
    <h3>Last Name : ${user.lname}</h3>
    <h3>Email : ${user.email}</h3>
    <h3>Tel : ${user.telePhone}</h3>
    <button class="btn btn-warning" onclick="displayUserEditForm(${user.id})">Edite Profile</button>
    <div id="editUserForm"></div>
</div>`

    document.getElementById('userInfo').innerHTML = userInfo;
}
// function displayUserEditForm that displays form to edit user email and tel
function displayUserEditForm(userId) {
    var user = searchUserById(userId);
    var editForm = `
    <div class="row">
        <div class="col-lg-12">
            <div class="login_form_inner" style="margin-top=50px">
                <h3>Edit Profile</h3>
                <div class="row ">
                <label>Email</label>
                    <div class="col-md-12 form-group">
                    <input type="text" class="form-control" id="newEmailId"  value=${user.email}>
                </div>
                <label>Tel</label>
                <div class="col-md-12 form-group">
                <input type="text" class="form-control" id="newTelId"  value=${user.telePhone}>
            </div>

                    <div class="col-md-12 form-group">
                        <button type="submit" value="submit" onclick="validatUserEdit()" class="primary-btn">Validate Edit
                        </button>

                    </div>
                </div>
            </div>
        </div>
    </div> `
    document.getElementById('editUserForm').innerHTML = editForm;
}
// function validatUserEdit that updates new email and tel into LS
function validatUserEdit() {
    var users = getObjectFromLS('users');
    var connectedUserId = localStorage.getItem('connectedUserId');
    var newEmail = document.getElementById('newEmailId').value;
    var newTel = document.getElementById('newTelId').value;
    for (let i = 0; i < users.length; i++) {
        if (users[i].id == connectedUserId) {
            users[i].email = newEmail;
            users[i].telePhone = newTel;
            break
        }
    }
    localStorage.setItem('users', JSON.stringify(users));
    location.reload();
}
// function setHeader
function setHeader() {
    var connectedUserId = getConnectedUser();
    var headerContent = ``;
    if (connectedUserId) {
        var connectedUser = searchUserById(connectedUserId);
        if (connectedUser.role == 'admin') {
            headerContent = `<ul class="nav navbar-nav menu_nav ml-auto">
            <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
            <li class="nav-item submenu dropdown">
                <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" role="button"
                    aria-haspopup="true" aria-expanded="false">Products</a>
                <ul class="dropdown-menu">
                    <li class="nav-item"><a class="nav-link" href="products.html">Products List</a>
                    <li class="nav-item"><a class="nav-link" href="add-product.html">Add Product</a></li>
                    <li class="nav-item"><a class="nav-link" href="add-category.html">Add category</a>
                    
                    </li>
                </ul>
            </li>
            <li class="nav-item"><a class="nav-link" href="manage-orders.html">Orders</a></li>
            <li class="nav-item"><a class="nav-link" href="profile.html">Welcome ${connectedUser.fname} ${connectedUser.lname}</a></li>
            <li class="nav-item"><a class="nav-link" href="search.html">Search</a></li>
            <li class="nav-item"><a class="nav-link" onclick="logout()" href="#">Logout</a></li>
        </ul>`;

        } else {
            var orders = getObjectFromLS('orders')
            var myOrders = userOrders(orders, connectedUserId);
            var wishlistTab = getObjectFromLS('wishList');
            var connectedUserId = getConnectedUser();
            var myWishList = userWishlist(wishlistTab, connectedUserId);

            headerContent = ` <ul class="nav navbar-nav menu_nav ml-auto">
            <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
            <li class="nav-item"><a class="nav-link" href="shop.html">Shop</a></li>
            <li class="nav-item"><a class="nav-link" href="basket.html">Basket (${myOrders.length})</a></li>
            <li class="nav-item"><a class="nav-link" href="wishlist.html">Wishlist (${myWishList.length})</a></li>
            <li class="nav-item"><a class="nav-link" href="profile.html">Welcome ${connectedUser.fname} ${connectedUser.lname}</a></li>
            <li class="nav-item"><a class="nav-link" href="search.html">Search</a></li>
            <li class="nav-item"><a class="nav-link" onclick="logout()" href="#">Logout</a></li>
        </ul>
            `
        }

    } else {
        headerContent = ` <ul class="nav navbar-nav menu_nav ml-auto">
        <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
        <li class="nav-item"><a class="nav-link" href="shop.html">Shop</a></li>
        <li class="nav-item"><a class="nav-link" href="blog.html">Blog</a></li>
        <li class="nav-item"><a class="nav-link" href="contact.html">Contact</a></li>
        <li class="nav-item"><a class="nav-link" href="search.html">Search</a></li>
        <li class="nav-item"><a class="nav-link" href="login.html">Login</a></li>                          
        <li class="nav-item submenu dropdown">
            <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" role="button"
                aria-haspopup="true" aria-expanded="false">Signup</a>
            <ul class="dropdown-menu">
                <li class="nav-item"><a class="nav-link" href="customer-signup.html">Simple User</a></li>
                <li class="nav-item"><a class="nav-link" href="store-signup.html">Admin</a>
                </li>
            </ul>
        </li>
    </ul>
        `

    }
    document.getElementById('navbarSupportedContent').innerHTML = headerContent;

}
// function displayUserWishlist
function displayUserWishlist() {
    var connectedUserId = getConnectedUser();
    var wishlistTab = getObjectFromLS('wishList');
    var myWishList = [];
    var wishListTable = ``;
    for (let i = 0; i < wishlistTab.length; i++) {
        if (wishlistTab[i].userId == connectedUserId) {
            myWishList.push(wishlistTab[i]);
        }

    }
    if (myWishList.length == 0) {
        wishListTable = `
        <div class="text-center"> <h2>No wishlist Products</h2></div>`
    } else {
        wishListTable = `<table class="table table-striped">
    <tr>
      <th>Product Name</th>
      <th>Product Price</th>
      <th>Category</th>
      <th>Actions</th>
     </tr>`;
        for (let i = 0; i < myWishList.length; i++) {
            var wishList = myWishList[i];
            var product = searchProductById(wishList.productId)
            wishListTable += `  <tr>
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td>${product.category}</td>
        <td> <button class="btn btn-success" onclick="goToDiplayProduct(${product.id})">Reserve</button>
         <button class="btn btn-danger" onclick="deleteObject(${getObjectPositionById(wishList.id, wishlistTab)},'wishList')">Delete</button></td>
       </tr>`;

        }
        wishListTable += `</table>`;
    }
    document.getElementById('wishListTable').innerHTML = wishListTable;
}
// function to display admin orders
function displayAdminOrders() {
    var connectedUserId = getConnectedUser();
    var allProducts = getObjectFromLS('products');
    var adminProducts = getUserProducts(connectedUserId, allProducts);
    var allOrders = getObjectFromLS('orders');
    var adminOrders = getAdminOrders(adminProducts, allOrders);
    generateAdminOrdersTable(adminOrders);

}
// function getAdminOrders that returns all admin orders
function getAdminOrders(myProducts, orders) {
    var adminOrders = [];
    for (let i = 0; i < orders.length; i++) {
        for (let j = 0; j < myProducts.length; j++) {
            if (orders[i].productId == myProducts[j].id) {
                adminOrders.push(orders[i]);
            }

        }

    }
    console.log('adminOrders', adminOrders);
    return adminOrders;

}
// function generateAdminOrdersTable that generate orders rows and inner inti HTML
function generateAdminOrdersTable(adminOrders) {
    var ordersTable = ``;
    if (adminOrders.length == 0) {
        ordersTable = `<div class="text-center">
        <h2>No orders</h2></div>`
    } else {
        ordersTable = `
        <div class="text-center">
        <h2>All Orders</h2></div>
        <table class="table table-striped">
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Tel</th>
          <th>Product Name</th>
          <th>Product Unit Price</th>
          <th>Quantity</th>
          <th>Total HT</th>
          <th>Total TTC</th>
          <th>Actions</th>
         </tr>`;
        for (let i = 0; i < adminOrders.length; i++) {
            var order = adminOrders[i];
            var user = searchUserById(order.userId);
            var product = searchProductById(order.productId)
            ordersTable += `<tr>
            <td>${user.fname}</td>
            <td>${user.lname}</td>
            <td>${user.telePhone}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${order.qty}</td>
            <td>${order.qty * product.price}</td>
            <td>${Number(order.qty * product.price) * 1.19}</td>`;
            if ((!order.status)) {
                ordersTable += `<td><button class="btn btn-info" onclick="confirmClick(${order.id})">Confirm</<button></td>
            </tr>`;

            } else {
                ordersTable += `<td> Order is Validated</td>
            </tr>`;
            }
        };

        ordersTable += `</table>`;
        document.getElementById('adminOrders').innerHTML = ordersTable;
    }
}
// function confirmOrder to update order status to true
function confirmClick(id) {
    var orders = getObjectFromLS('orders');
    for (let i = 0; i < orders.length; i++) {
        if (orders[i].id == id) {
            orders[i].status = true;
            break;

        }
    }
    localStorage.setItem('orders', JSON.stringify(orders));
    location.reload();

}
// function userWishlist
function userWishlist(wishlist, connectedUserId) {
    var connectedUserId = getConnectedUser();
    var wishlist = getObjectFromLS('wishList');
    var myWishList = [];
    for (let i = 0; i < wishlist.length; i++) {
        if (wishlist[i].userId == connectedUserId) {
            myWishList.push(wishlist[i]);
        }
    }
    return myWishList;
}
// function searchProducts that returns all products by name
function searchProducts() {
    var products = getObjectFromLS('products');
    var productName = document.getElementById('searchedValue').value;
    var productsDiv = ``;
    var s=0;
    for (let i = 0; i < products.length; i++) {
        if ((products[i].name).toLowerCase() == productName.toLowerCase() && products[i].isConfirmed) {
            s+=1;
            productsDiv = productsDiv + ` <div class="col-lg-3 col-md-6">
            <div class="single-product">
                <img class="img-fluid" src="img/product/p1.jpg" alt="">
                <div class="product-details">
                    <h6>${products[i].name}</h6>
                    <div class="price">
                        <h6>${products[i].price}</h6>
                        <h6 class="l-through">$210.00</h6>
                    </div>
                    <h6>${products[i].category}</h6>
                    <div class="prd-bottom">
                    <h6>${products[i].stock}</h6>
                        <div  class="social-info">
                            <span class="ti-bag"></span>
                            <button onclick="goToDiplayProduct(${products[i].id})"  class="btn hover-text">Display Product</button>
                        </div>
                        <div href="" class="social-info">
                        <span class="ti-bag"></span>
                            <button onclick="deleteobject(${getObjectPositionById(products[i].id, products)},'products')"  class="btn hover-text">Delete Product</button>
                          
                        </div>
                       
                       
                    </div>
                </div>
            </div>
        </div>`
        }

    }
    if (s==0) {
        document.getElementById('findedProductsDiv').innerHTML = `<div class="text-center"><h2>No founded products</h2></div>`;

    } else {
        document.getElementById('findedProductsDiv').innerHTML = productsDiv;

    }
}
// function generateAdminProducts
function generateAdminProducts() {
    var products = getObjectFromLS('products');
    var productsTab = `<h2>All Products</h2><table class="table table-striped">
    <tr>
      <th>Name</th>
      <th>Price</th>
      <th>Stock</th>
      <th>Category</th>
      <th>Actions</th>
     </tr>`;
    for (let i = 0; i < products.length; i++) {
        var product = products[i];
        productsTab += `

        <tr>
         <td>${product.name}</td>
         <td>${product.price}</td>
         <td>${product.stock}</td>
         <td>${product.category}</td>
         <td>
    <input type="checkbox" name="" id="${i}" onclick="addToArray(this)">
         
         </td>

    </tr>  `;


    }
    productsTab += `</table> 
    <div class="text-center"><button class="btn btn-danger" onclick="deleteAllChkedProducts()">Delete</button></div>`;
    
    document.getElementById('productsTab').innerHTML = productsTab;
}
// function addToArray 
var chekedRows=[];
function addToArray(element) {
    chekedRows.push(element.id)
}
// function deleteAllCheked that delete product 
function deleteAllChkedProducts() {
    var products=getObjectFromLS('products');
    for (let i = 0; i < chekedRows.length; i++) {
        products.splice(getObjectPositionById(chekedRows[i],products),1);
        
    }
localStorage.setItem('products',JSON.stringify(products));
location.reload();
}
