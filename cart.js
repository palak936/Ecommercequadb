let selectOrder = [];
selectOrder = JSON.parse(localStorage.getItem("cart"));
let container = document.getElementById("container");
let totalPriceDiv = document.createElement("div");
totalPriceDiv.setAttribute("id", "totalprice");
container.append(totalPriceDiv);

let rupees = 0;
let totalprice = 0;
let UserEmail = [];
UserEmail = JSON.parse(localStorage.getItem("loggeduser"));
selectOrder = selectOrder.filter((item) => {
    return item.email == UserEmail;
});
console.log(selectOrder.length);
if (selectOrder.length === 0) {
    document.body.innerHTML = "";
    let homeButton = document.createElement("button");
    homeButton.setAttribute("id", "home");
    homeButton.textContent = "home";
    homeButton.addEventListener("click", function() {
        window.location.href = "index.html";
    });
    document.body.appendChild(homeButton);
    let message = document.createElement("h2");
    message.setAttribute("id", "message");
    message.innerHTML = "YOUR CART IS EMPTY";
    message.style.textAlign = "center";
    document.body.appendChild(message);
} else {
    selectOrder.forEach((item) => {
        let div = document.createElement("div");
        div.setAttribute("class", "cart-item");

        let h2 = document.createElement("h2");
        h2.innerHTML = item.product;
        div.appendChild(h2);

        let image = document.createElement("img");
        image.setAttribute("height", "200px");
        image.setAttribute("src", item.image);

        let div1 = document.createElement("div");
        div1.setAttribute("class", "set");
        div1.appendChild(image);
        div.appendChild(div1);

        let price = document.createElement("h2");
        price.setAttribute("id", "price");
        price.innerHTML = item.price + "₹";
        rupees = item.price;
        div.appendChild(price);
        totalprice = totalprice + parseInt(rupees);

        let divQuantity = document.createElement("div");
        divQuantity.setAttribute("class", "quantity");

        let decrementBtn = document.createElement("button");
        decrementBtn.textContent = "-";
        divQuantity.appendChild(decrementBtn);

        let textQuantity = document.createElement("span");
        textQuantity.setAttribute("id", "span");
        textQuantity.textContent = "1";
        divQuantity.appendChild(textQuantity);


        let incrementBtn = document.createElement("button");
        incrementBtn.textContent = "+";
        divQuantity.appendChild(incrementBtn);

        div.appendChild(divQuantity);

        let removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.setAttribute("class", "remove-btn");

        removeBtn.addEventListener("click", function() {
            selectOrder = selectOrder.filter((ele) => {
                return ele.id != item.id;
            });
            div.remove();
            localStorage.setItem("cart", JSON.stringify(selectOrder));
            updateTotalPrice();

            if (selectOrder.length == 0) {
                document.body.innerHTML = "";
                let homeBtn = document.createElement("button");
                homeBtn.textContent = "Home";
                homeBtn.setAttribute("id", "home");
                homeBtn.addEventListener("click", function() {
                    window.location.href = "index.html";
                });
                document.body.appendChild(homeBtn);
                let message = document.createElement("h2");
                message.setAttribute("id", "message");
                message.innerHTML = "YOUR CART IS EMPTY";
                message.style.textAlign = "center";
                document.body.appendChild(message);
            }
        });
        div.appendChild(removeBtn);
        container.appendChild(div);

        decrementBtn.addEventListener("click", function() {
            let currQuantity = parseInt(textQuantity.textContent);
            if (currQuantity > 1) {
                currQuantity--;
                textQuantity.textContent = currQuantity;
                updateTotalPrice();
            }
        });

        incrementBtn.addEventListener("click", function() {
            let currQuantity = parseInt(textQuantity.textContent);
            currQuantity++;
            textQuantity.textContent = currQuantity;
            updateTotalPrice();
        })

    });
}
totalPriceDiv.textContent = "Total Price: " + totalprice + "₹";



function updateTotalPrice() {
    let total = 0;
    totalPriceDiv.textContent = "";
    let cartItems = document.querySelectorAll(".cart-item");
    cartItems.forEach((item) => {
        let priceString = item.querySelector("#price").textContent;
        let price = parseInt(priceString.replace("₹", ""));

        let quantity = parseInt(item.querySelector("#span").textContent);
        total = total + price * quantity;
    });
    totalPriceDiv.textContent = "Total Price: " + total + "₹";
    container.appendChild(totalPriceDiv);
}