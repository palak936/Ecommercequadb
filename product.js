let product = document.getElementById("product");
let description = document.getElementById("description");
let price = document.getElementById("price");
let image = document.getElementById("image");
let btn = document.getElementById("btn");

let outdiv = document.getElementById("outdiv");

let tasks = [];
let userchecked = [];
userchecked = localStorage.getItem("loggeduser");
if (userchecked != null) {
    let logoutbtn = document.createElement("button");
    logoutbtn.setAttribute("id", "logout");
    logoutbtn.textContent += 'Logout';
    document.body.appendChild(logoutbtn);

    logoutbtn.addEventListener("click", function() {
        localStorage.removeItem("loggeduser");
        logoutbtn.style.display = "none";
        userchecked = null;
        window.location.href = "login.html";
    })
}

btn.addEventListener("click", function() {
    if (product.value.trim() == '' || description.value.trim() == '' || price.value.trim() == '' || image.value.trim() == '') {
        alert("input box is empty");
        return;
    }
    let count = chance.guid();
    let obj = {
        id: count,
        product: product.value,
        description: description.value,
        price: price.value,
        image: image.value
    };
    tasks.push(obj);
    storeLocalStorage();


    product.value = '';
    description.value = '';
    price.value = '';
    image.value = '';
    addToUI(obj);

})

function addToUI(obj) {

    let div = document.createElement("div");
    div.setAttribute("id", "divStyle");
    let productspan = document.createElement("span");
    productspan.setAttribute("id", "productspan");
    productspan.innerHTML = obj.product;
    let descriptionspan = document.createElement("span");
    descriptionspan.setAttribute("id", "descriptionspan");
    descriptionspan.innerHTML = obj.description;
    let pricespan = document.createElement("span");
    pricespan.setAttribute("id", "pricespan");
    pricespan.innerHTML = obj.price;
    let imagediv = document.createElement("img");
    imagediv.setAttribute("id", "img");
    imagediv.setAttribute("src", obj.image)


    let delbtn = document.createElement("button");
    delbtn.setAttribute("id", "delbtn");
    delbtn.innerHTML = "DELETE";
    delbtn.addEventListener("click", function() {
        tasks = tasks.filter(function(item) {
            return item.id != obj.id;
        });
        div.remove();
        storeLocalStorage();
    })

    let updbtn = document.createElement("button");
    updbtn.setAttribute("id", "updbtn");
    updbtn.innerHTML = "UPDATE";
    updbtn.addEventListener("click", function() {
        let upddiv = document.createElement("div");
        let updproduct = document.createElement("input");
        updproduct.setAttribute("type", "text");
        updproduct.value = obj.product;
        upddiv.appendChild(updproduct);
        outdiv.appendChild(upddiv);

        let upddescription = document.createElement("input");
        upddescription.setAttribute("type", "text");
        upddescription.value = obj.description;
        upddiv.appendChild(upddescription);
        outdiv.appendChild(upddiv);

        let updprice = document.createElement("input");
        updprice.setAttribute("type", "number");
        updprice.value = obj.price;
        upddiv.appendChild(updprice);
        outdiv.appendChild(upddiv);

        let updimage = document.createElement("input");
        updimage.setAttribute("type", "text");
        updimage.setAttribute("id", "img");
        updimage.value = obj.image;
        upddiv.appendChild(updimage);
        outdiv.appendChild(upddiv);



        let newupdbtn = document.createElement("button");
        newupdbtn.setAttribute("id", "newupdbtn");
        newupdbtn.textContent = "UPDATE";
        upddiv.appendChild(newupdbtn);
        newupdbtn.addEventListener("click", function() {
            obj.price = updprice.value;
            obj.product = updproduct.value;
            obj.description = upddescription.value;
            obj.image = updimage.value;
            upddiv.remove();
            div.remove();

            storeLocalStorage();
            addToUI(obj);



        })


    })



    outdiv.appendChild(div);
    div.appendChild(productspan);
    div.appendChild(descriptionspan);
    div.appendChild(pricespan);
    div.appendChild(imagediv);
    div.appendChild(delbtn);
    div.appendChild(updbtn);


}


function storeLocalStorage() {
    localStorage.setItem("mytasks", JSON.stringify(tasks));
}

function getLocalStorage() {
    if (localStorage.getItem("mytasks")) {
        tasks = JSON.parse(localStorage.getItem("mytasks"));
    }
    tasks.forEach(function(item) {
        addToUI(item);
    });
}
getLocalStorage();