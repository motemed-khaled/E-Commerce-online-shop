
export class Categories
{
constructor(category)
{
  this.category=category;
}

getHtmlMainCactegories()
{
  let htmlMainCateg=""; 
  return htmlMainCateg= `<a href="" class="nav-item nav-link">${this.category.name}</a>`;
}
writeHtmlMainCactegories(data)
{
document.querySelector('.navbar-nav').innerHTML=data;
}

sortSectionCategories(categories)
{
   
     categories.sort(function(a,b){
     return b.productCount - a.productCount;
     })  
}

getHtmlSectionCactegories()
{
      let htmlSectionCateg="";
    
      return  htmlSectionCateg= 
     `<div class="col-lg-3 col-md-4 col-sm-6 pb-1">
        <a class="text-decoration-none" href="">
          <div class="cat-item d-flex align-items-center mb-4">
            <div class="overflow-hidden" style="width: 100px; height: 100px">
              <img class="img-fluid" src="${this.category.image}" alt="" />
            </div>
            <div class="flex-fill pl-3">
              <h6>${this.category.name}</h6>
              <small class="text-body">${this.category.productCount} Product</small>
            </div>
          </div>
        </a>
      </div>`
}

writeHtmlSectionCactegories(data)
{
  document.querySelector('#section_categories').innerHTML=data;
}

}










