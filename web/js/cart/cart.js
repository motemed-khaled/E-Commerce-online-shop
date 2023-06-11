import { fetchData } from '../fetch/fetch';
import { endpoints } from '../fetch/endpoints';
import { Product } from './../shop/Product';
import { isLogged, userContext } from '../user/userContext';

let heartSpan = document.querySelector(".heartspan");
let cartSpan = document.querySelector(".cartspan");

if (isLogged()) {
    if (localStorage.getItem(userContext.user_id)) {
        cartSpan.innerText = (JSON.parse(localStorage.getItem(userContext.user_id))).length
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
                        let allProduct = res.data;
                        let targetProductId = e.target.getAttribute("data-id");
                        let mainProductData = allProduct.filter(product=> product._id == targetProductId)
                        let productData = {
                            _id: mainProductData[0]._id,
                            name: mainProductData[0].name,
                            price: mainProductData[0].price,
                            image: mainProductData[0].image,
                            quantity: 1,
                        };
                        let userData = JSON.parse(localStorage.getItem(userContext.user_id));
                        userData.push(productData);
                        cartSpan.innerText = userData.length
                        localStorage.setItem(userContext.user_id, JSON.stringify(userData));
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







