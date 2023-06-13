import { Product } from './Product';

Product.filters.price.map(className => {
  document.querySelector(`.c-${className}`).checked = true;
});
Product.filters.color.map(className => {
  document.querySelector(`.${className}`).checked = true;
});
Product.filters.size.map(className=>{
  document.querySelector(`.${className}`).checked = true;
})

const priceFilters = document.querySelectorAll('.price-filter');
priceFilters.forEach(priceFilter => {
  priceFilter.addEventListener('change', e => {
    if (e.target.checked) {
      Product.filters.price.push(e.target.classList[e.target.classList.length - 1].slice(2));
    } else {
      Product.filters.price.splice(
        Product.filters.price.indexOf(e.target.classList[e.target.classList.length - 1].slice(2)),
        1
      );
    }
    Product.filters.page = 1;
    window.location.href = `/shop.html${Product.getPginationQuery()}`;
  });
});

const colorFilters = document.querySelectorAll('.color-filter');
colorFilters.forEach(colorFilter => {
  colorFilter.addEventListener('change', e => {
    if (e.target.checked) {
      Product.filters.color.push(e.target.classList[e.target.classList.length - 1]);
    } else {
      Product.filters.color.splice(
        Product.filters.color.indexOf(e.target.classList[e.target.classList.length - 1]),
        1
      );
    }
    Product.filters.page = 1;
    window.location.href = `/shop.html${Product.getPginationQuery()}`;
  });
});

const sizeFilters = document.querySelectorAll('.size-filter');
sizeFilters.forEach(sizeFilter => {
  sizeFilter.addEventListener('change', e => {
    if (e.target.checked) {
      Product.filters.size.push(e.target.classList[e.target.classList.length - 1]);
    } else {
      Product.filters.size.splice(
        Product.filters.size.indexOf(e.target.classList[e.target.classList.length - 1]),
        1
      );
    }
    Product.filters.page = 1;
    window.location.href = `/shop.html${Product.getPginationQuery()}`;
  });
});