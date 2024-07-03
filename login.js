let logbtn = document.getElementById("logbtn");
let loginemail = document.getElementById("loginemail");
let loginpass = document.getElementById("loginpass");
logbtn.addEventListener("click", () => {

    let obj = [];
    obj = JSON.parse(localStorage.getItem("myUsers"));

    let user = obj.filter((item) => {

        if (item.Email === loginemail.value && item.Password == loginpass.value) {
            return true;
        }
    });

    if (user.length > 0) {
        if (user[0].role == 'admin') {
            window.location.href = "product.html";

        } else {
            window.location.href = "index.html";
        }
        localStorage.setItem("loggeduser", JSON.stringify(user[0].Email));
    } else {
        window.location.href = "signup.html";
    }


})
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