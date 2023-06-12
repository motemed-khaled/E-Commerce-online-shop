import { fetchData } from '../fetch/fetch';
import { endpoints } from '../fetch/endpoints';

let orderInfoHtml = document.getElementById("orderInfo");
let orderSubtotal = document.getElementById("Subtotal");
let orderTax = document.getElementById("Tax");
let orderTotal = document.getElementById("Total");

export class Checkout {
    constructor(product) {
        this.product = product;
    }

    renderHtmlContent = () => {
        orderInfoHtml.innerHTML += `
        <div  class="d-flex justify-content-between">
            <p>${this.product.name}   x (${this.product.quantity})</p>
            <p class="orderPrice">$${(this.product.price * this.product.quantity)}</p>
            </div>
            `
    }

    static updateOrderSubTotal = (orderData) => {
        let SubtotalPrice = 0
        orderData.forEach(order => {
            SubtotalPrice += (order.price * order.quantity)
        });
        orderSubtotal.innerHTML = `$${SubtotalPrice}`;
        return SubtotalPrice;
    }

    static countOrderTax = (value , orderData) => {
        let tax = { Paypal: 0.1, Direct_Check: 0.15, Bank_Transfer: 0.05 };
        orderTax.innerHTML = `%${tax[`${value}`]*100}`;
        let total = this.updateOrderSubTotal(orderData) + (tax[`${value}`] * this.updateOrderSubTotal(orderData));
        orderTotal.innerHTML = `$${total}`;
    }

    static sendRequest = async(userValue , orderData , user_id) => {
        let body = {
            shipping_info: userValue,
            sub_total_price: Number((orderSubtotal.innerHTML).slice(1)),
            total_price: Number((orderTotal.innerHTML).slice(1)),
            order_details: orderData,
            token:sessionStorage.getItem("token")
        }
        try {
            const res = await fetchData(endpoints.createOrder.url, endpoints.createOrder.method, body);
            console.log(res)
            localStorage.setItem(user_id, "[]");
            window.location.href = "checkout.html";
        }catch (error) {
            console.log(error);
          }
        
    }
}


