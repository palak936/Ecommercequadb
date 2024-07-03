let count = 5;
let tasks = [];
let start = 0;
let productDiv = document.getElementById("pro");
let loadbtn = document.getElementById("loadbtn");
let userchecked = [];
userchecked = JSON.parse(localStorage.getItem("loggeduser"));
if (userchecked != null) {
    let logoutbtn = document.createElement("button");
    logoutbtn.setAttribute("id", "logout");
    logoutbtn.textContent += 'Logout';
    document.body.appendChild(logoutbtn);

    logoutbtn.addEventListener("click", function() {
        localStorage.removeItem("loggeduser");
        logoutbtn.style.display = "none";
        userchecked = null;

    })
}

function showdata() {
    let objArray = [];
    if (localStorage.getItem("mytasks") != null) {
        objArray = JSON.parse(localStorage.getItem("mytasks"));

    }

    for (let i = start; i < count; i++) {
        if (i < objArray.length) {
            let obj = objArray[i];
            let div = document.createElement("div");
            div.setAttribute("class", "maindiv");
            let image = document.createElement("img");
            image.setAttribute("src", obj.image);
            image.setAttribute("id", "img");
            div.appendChild(image)
            let product = document.createElement("h3");
            product.setAttribute("class", "heading");
            product.innerHTML += `Name ` + obj.product;
            div.appendChild(product);
            let description = document.createElement("h3");
            description.setAttribute("class", "heading");
            description.innerHTML += `Description ` + obj.description;
            div.appendChild(description);
            let price = document.createElement("h3");
            price.setAttribute("class", "heading");
            price.innerHTML += `Price ` + obj.price;
            div.appendChild(price);
            productDiv.appendChild(div);
            document.body.appendChild(productDiv);

            let addtocart = document.createElement("button");
            addtocart.setAttribute("id", "addtocart");
            addtocart.textContent = "Add to cart";

            div.appendChild(addtocart);
            productDiv.appendChild(div);
            document.body.appendChild(productDiv);
            addtocart.addEventListener("click", function() {
                if (userchecked != null) {
                    let cartproduct = [];
                    let flag = false;
                    if (localStorage.getItem("cart") != null) {
                        cartproduct = JSON.parse(localStorage.getItem("cart"));
                        for (let i = 0; i < cartproduct.length; i++) {
                            if (obj.id == cartproduct[i].id && obj.email === userchecked) {
                                alert("Item already added");
                                flag = true;
                                break;
                            }

                        }
                    }
                    if (flag == false) {
                        obj.email = userchecked;
                        cartproduct.push(obj);
                        localStorage.setItem("cart", JSON.stringify(cartproduct));
                    }
                    window.location.href = "cart.html"
                } else {
                    window.location.href = "login.html";
                }
            });

        }
    }

    start = count;
    count = count + 5;
    if (start >= objArray.length) {
        loadbtn.style.display = "none";
    }
}
showdata();
loadbtn.addEventListener("click", function() {
    showdata();

})