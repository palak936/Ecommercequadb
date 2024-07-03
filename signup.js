let signuser = document.getElementById("signuser");
let signpass = document.getElementById("signpass");
let signemail = document.getElementById("signemail");
let signbtn = document.getElementById("signbtn");
let SignUsers = [];

signbtn.addEventListener("click", function() {

    if (signuser.value.trim() == '' || signpass.value.trim() == '' || signemail.value.trim() == '') {
        alert("input box is empty");
        return;
    }
    let id = chance.guid();
    let obj = {

        Name: signuser.value,
        Id: id,
        Password: signpass.value,
        Email: signemail.value,
        role: "user"

    }
    if (localStorage.getItem("myUsers") != null) {
        SignUsers = JSON.parse(localStorage.getItem("myUsers"));
        SignUsers.push(obj);
        addLocalStorage();
    } else {
        SignUsers.push(obj);
        addLocalStorage();
    }
    window.location.href = "login.html";


    signuser.value = '';
    signpass.value = '';
    signemail.value = '';



})


function addLocalStorage() {
    localStorage.setItem("myUsers", JSON.stringify(SignUsers));

}