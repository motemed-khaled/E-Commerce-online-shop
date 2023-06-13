import { Checkout } from './check';
import { isLogged, userContext } from '../user/userContext'
import {countCartLength} from '../cart/cart'

let checkedRadio = document.querySelectorAll("input[type='radio'][name='payment']");
let sendButton = document.getElementById("sendRequest");
let submitForm = document.getElementById("formSubmit");
let firstName = document.getElementById("firstName");
let lastName = document.getElementById("LastName");
let userMail = document.getElementById("emai")  ;
let userMobile = document.getElementById("mobile");
let userAddress1 = document.getElementById("address1");
let userAddress2 = document.getElementById("addressTwo");
let userCountry = document.getElementById("country");
let userCity = document.getElementById("city");
let userState = document.getElementById("state");
let userCode = document.getElementById("code");
let myform = document.getElementById("my-form");
let checkRadio = document.querySelector("input[type='radio'][name='payment']:checked");
let heartSpan = document.querySelector(".heartspan");
let cartSpan = document.querySelector(".cartspan");



if (isLogged()) {

    let uniqueData = JSON.parse(localStorage.getItem(userContext.user_id)) || [];
    let favNum = JSON.parse(localStorage.getItem(`${userContext.user_id}heart`)) || [];

    // upfate navIcon
    heartSpan.innerText = favNum.length;
    cartSpan.innerText = countCartLength(uniqueData);

    uniqueData.forEach(order => new Checkout(order).renderHtmlContent());

    Checkout.updateOrderSubTotal(uniqueData);

    //default tax
    Checkout.countOrderTax(checkRadio.getAttribute("data-tax"), uniqueData);

    checkedRadio.forEach(radio => {
        radio.addEventListener("click", (e) => {
            Checkout.countOrderTax(e.target.getAttribute("data-tax"), uniqueData);
        })
    });

    sendButton.addEventListener("click", (e) => {
        if (firstName.value == "" || lastName.value == "" || userMail.value == "") {
            submitForm.click();
        } else if (uniqueData.length != 0) {
            let userValue = {
                first_name: firstName.value,
                last_name: lastName.value,
                email: userMail.value,
                mobile_number: userMobile.value,
                address1: userAddress1.value,
                address2: userAddress2.value,
                country: userCountry.value,
                city: userCity.value,
                state: userState.value,
                zip_code: userCode.value,
            }
            Checkout.sendRequest(userValue, uniqueData, userContext.user_id);
        }
        
    });

} else {
    window.location.href = '/signin.html';
}

// handle user state
const userIcon = document.querySelector('.user-icon')
userIcon.addEventListener('click', () => {
    const nestedList = document.querySelector('.nested-user-list');
    nestedList.classList.toggle('d-none');
    if (isLogged()) {
        nestedList.innerHTML = `<h6>${userContext.email}</h6> <button class="logout">LogOut</button>`;
    }
});
// start logout action 
document.addEventListener("click", e => {
    if (e.target.classList.contains("logout")) {
        sessionStorage.removeItem("token");
        window.location.href = '/index.html';
    }
})










