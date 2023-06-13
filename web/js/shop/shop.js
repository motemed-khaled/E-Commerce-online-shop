import { fetchData } from '../fetch/fetch';
import { endpoints } from '../fetch/endpoints';
import { Product } from './Product';
import {isLogged, userContext} from '../user/userContext'

console.log(Product.filters.page)

const handleProductsHTMLElements = products => {
  const productsContainer = document.querySelector('.products-container');
  productsContainer.innerHTML =
    products.map(product => new Product(product).getCardHTMLElement()).join('') +
    Product.getHTMLPagination();
};

try {
  Product.generateFilters();
  const res = await fetchData(
    endpoints.getProducts.url + Product.getPginationQuery(),
    endpoints.getProducts.method
  );
  Product.filters.count = res.data.length
  const data = Product.addFilterAndPagination(res.data)
  handleProductsHTMLElements(data);
} catch (error) {
  console.log(error);
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