import { fetchData } from '../fetch/fetch';
import { endpoints } from '../fetch/endpoints';
import { Product } from './../shop/Product';
import { isLogged, userContext } from '../user/userContext';

let heartSpan = document.querySelector(".heartspan");
let cartSpan = document.querySelector(".cartspan");
export let countCartLength = (data) => {
    let cartLength = 0;
    data.forEach(order => {
        cartLength += order.quantity
    });
    return cartLength;
}

if (isLogged()) {
    if (localStorage.getItem(userContext.user_id)) {
        cartSpan.innerText = countCartLength(JSON.parse(localStorage.getItem(userContext.user_id)))
    } else {
        localStorage.setItem(userContext.user_id, "[]");
    }
    if (localStorage.getItem(`${userContext.user_id}heart`)) {
        heartSpan.innerText = (JSON.parse(localStorage.getItem(`${userContext.user_id}heart`))).length
    } else {
        localStorage.setItem(`${userContext.user_id}heart`, "[]");
    }
    
    (async () => {
        try {
            const res = await fetchData(
                endpoints.getProducts.url,
                endpoints.getProducts.method
            );
            document.addEventListener("click", (e) => {
                if (e.target.classList.contains("cart")) {
                    let cartLength = 0;
                    let allProduct = res.data;
                    let targetProductId = e.target.getAttribute("data-id");
                    let mainProductData = allProduct.filter(product=> product._id == targetProductId)
                    let productData = {
                        _id: mainProductData[0]._id,
                        name: mainProductData[0].name,
                        price: mainProductData[0].price,
                        image: mainProductData[0].image,
                        quantity: 1,
                        subTotal :0
                    };
                    let userData = JSON.parse(localStorage.getItem(userContext.user_id));
                    if (userData.length != 0) {
                        let recentOrder = userData.filter(order => order._id == productData._id);
                        if (recentOrder.length != 0) {
                            userData.forEach(order => {
                                if (order._id == recentOrder[0]._id) {
                                    order.quantity += 1;
                                }
                            });
                            cartSpan.innerText = countCartLength(userData);
                            localStorage.setItem(userContext.user_id, JSON.stringify(userData));
                        } else {
                            userData.push(productData)
                            cartSpan.innerText = countCartLength(userData);
                            localStorage.setItem(userContext.user_id, JSON.stringify(userData));
                        }
                    } else {
                        userData.push(productData);
                        cartSpan.innerText = userData.length
                        localStorage.setItem(userContext.user_id, JSON.stringify(userData));
                    }
                    // fav icon implementation
                } else if (e.target.classList.contains("heart")) {
                    let productId = e.target.getAttribute("data-id");
                    let oldData = JSON.parse(localStorage.getItem(`${userContext.user_id}heart`));
                    console.log(oldData)
                    if (!oldData.includes(productId)) {
                        oldData.push(productId);
                        heartSpan.innerText = oldData.length;
                        localStorage.setItem(`${userContext.user_id}heart`, JSON.stringify(oldData));
                    } else {
                        let filterData =oldData.filter(product => product != productId);
                        console.log(filterData)
                        heartSpan.innerText = filterData.length;
                        localStorage.setItem(`${userContext.user_id}heart`, JSON.stringify(filterData));
                    }
                }
            })
    
        } catch (error) {
            console.log(error);
        }
    })();
}







