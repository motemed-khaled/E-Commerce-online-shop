export class Product {
  // count:number, page:number, limit:number, price: [{gte:number, lte:number}], color:[string]
  static filters = { price: [], color: [], size: [] };
  constructor(product) {
    this.product = product;
  }

  getCardHTMLElement = () => {
    return `
    <div class="col-lg-4 col-md-6 col-sm-6 pb-1">
      <div class="product-item bg-light mb-4">
        <div class="product-img position-relative overflow-hidden">
          <img class="img-fluid w-100" src="${this.product.image}" alt="" />
          <div class="product-action">
            <a class="btn btn-outline-dark btn-square" >
            <i data-id="${this.product._id}" class="fa fa-shopping-cart cart"></i></a>
            <a class="btn btn-outline-dark btn-square" ><i data-id="${this.product._id}" class="far fa-heart heart"></i></a>
            <a class="btn btn-outline-dark btn-square" ><i class="fa fa-sync-alt"></i></a>
            <a class="btn btn-outline-dark btn-square" ><i class="fa fa-search"></i></a>
          </div>
        </div>
        <div class="text-center py-4">
          <a class="h6 text-decoration-none text-truncate" href="">${this.product.name}</a>
          <div class="d-flex align-items-center justify-content-center mt-2">
            <h5>$${this.calcPriceAfterDiscount()}</h5>
            <h6 class="text-muted ml-2"><del>$${this.product.price}</del></h6>
          </div>
          ${this.getStartHTMLElement()}
        </div>
      </div>
    </div>
  `;
  };

  calcPriceAfterDiscount = () => {
    return (this.product.price - this.product.price * this.product.discount).toFixed(2);
  };

  getStartHTMLElement = () => {
    return `<div class="d-flex align-items-center justify-content-center mb-1">
      ${`<small class="fa fa-star text-primary mr-1"></small>`.repeat(
        Math.floor(this.product.rating)
      )}
      ${
        this.product.rating % 1 != 0
          ? `<small class="fa fa-star-half-alt text-primary mr-1"></small>`
          : ''
      }
      ${`<small class="far fa-star text-primary mr-1"></small>`.repeat(
        5 - Math.ceil(this.product.rating)
      )}
      <small>(${this.product.rating_count})</small>
    </div>`;
  };

  static getPginationQuery = (toPage = Product.filters.page) => {
    return `?page=${toPage}${Product.filters.price ? `&price=${Product.filters.price}` : ''}${
      Product.filters.color ? `&color=${Product.filters.color}` : ''
    }${Product.filters.size ? `&size=${Product.filters.size}` : ''}${
      Product.filters.limit ? `&limit=${Product.filters.limit}` : ''
    }`;
  };

  static getQueries() {
    return {
      page: Product.filters.page,
      price: Product.filters.price,
      color: Product.filters.color,
      size: Product.filters.size,
      limit: Product.filters.limit,
    };
  }

  static addFilterAndPagination(data) {
    const filterOptions = Product.getQueries();
    filterOptions.price.sort();
    const res = data.filter(product => {
      if (filterOptions.color.length > 0)
        if (!filterOptions.color.includes(product.color)) return false;
      if (filterOptions.size.length > 0) {
        if (!filterOptions.size.includes(product.size)) return false;
      }
      if (filterOptions.price.length > 0)
        if (
          !(
            product.price <= filterOptions.price[filterOptions.price.length - 1] &&
            product.price >= filterOptions.price[0] - 100
          )
        )
          return false;
      return true;
    });

    let limit = filterOptions.limit ? +filterOptions.limit : 9;
    let page = filterOptions.page ? +filterOptions.page : 1;
    let skip = (page - 1) * limit;
    return res.slice(skip, skip+limit);
  }

  static getHTMLPagination = () => {
    const currentPage = +Product.filters.page;
    const lastPage = Math.ceil(Product.filters.count / Product.filters.limit);
    return `<div class="col-12">
    <nav>
      <ul class="pagination justify-content-center">
      ${
        currentPage > 1
          ? `<li class="page-item"><a class="page-link" href="${Product.getPginationQuery(
              currentPage - 1
            )}">Previous</a></li>`
          : ''
      }
      ${
        currentPage > 1
          ? `<li class="page-item"><a class="page-link" href="?page=1">1</a></li>`
          : ''
      }
      ${
        currentPage > 2
          ? `<li class="page-item"><a class="page-link" href="${Product.getPginationQuery(
              currentPage - 1
            )}">${currentPage - 1}</a></li>`
          : ''
      }
        <li class="page-item"><a class="page-link active" href="${Product.getPginationQuery(
          currentPage
        )}">${currentPage}</a></li>
      ${
        currentPage < lastPage
          ? `<li class="page-item"><a class="page-link" href="${Product.getPginationQuery(
              currentPage + 1
            )}">${currentPage + 1}</a></li>`
          : ''
      }
      ${
        currentPage + 1 < lastPage
          ? `<li class="page-item"><a class="page-link" href="${Product.getPginationQuery(
              lastPage
            )}">${lastPage}</a></li>`
          : ''
      }
      ${
        currentPage < lastPage
          ? `<li class="page-item"><a class="page-link" href="${Product.getPginationQuery(
              currentPage + 1
            )}">Next</a></li>`
          : ''
      }
      </ul>
    </nav>
</div>`;
  };

  static generateFilters = () => {
    const url = new URL(window.location.href);
    const page = url.searchParams.get('page');
    const limit = url.searchParams.get('limit');
    const price = url.searchParams.get('price');
    const color = url.searchParams.get('color');
    const size = url.searchParams.get('size');
    Product.filters.page = page ? page : 1;
    Product.filters.limit = limit ? limit : 9;
    Product.filters.price = price ? price.split(',') : [];
    Product.filters.color = color ? color.split(',') : [];
    Product.filters.size = size ? size.split(',') : [];
  };
}
