import { fetchData } from '../fetch/fetch';
import { endpoints } from '../fetch/endpoints';
import { Categories } from './category';
import { Products } from './f-Products';
import { RecentProducts } from './r-Products';



try {
    const res = await fetchData(endpoints.getCategories.url, endpoints.getCategories.method) ;
    ////////////  Main categories
    let data="";
    for(let i=0;i<res.data.length;i++)
    {
    let Category=new Categories(res.data[i]);
    if(Category.category.name!==undefined){
      data = data + Category.getHtmlMainCactegories();
    Category.writeHtmlMainCactegories(data);
    }
    }

    // Section Categories..
     data="";
    let count=0;
    let sortedCategory=new Categories(res.data);
    sortedCategory.sortSectionCategories(res.data);
    sortedCategory.category.map(function(e){
    count++;
    if(count<=4)
    {
    let sectionCategory=new Categories(e);
    data=data+sectionCategory.getHtmlSectionCactegories()
    sectionCategory.writeHtmlSectionCactegories(data);
    }
    })
    
  } catch (error) {
    console.log(error);
  }
  //featured products//
  try {
    const res = await fetchData(endpoints.getFeaturedProducts.url, endpoints.getFeaturedProducts.method) ;
   
    let data="";
    let count=0;
    res.data.map(function(e){
    count++;
    if(count<=8){
    let product=new Products(e);
    data=data+product.getHtmlFeaturedProducts();
    product.writeHtmlFeaturedProducts(data);
    }
    })
  } catch (error) {
    console.log(error);
  }
 //recent products//
  try {
    const res = await fetchData(endpoints.getRecentProducts.url, endpoints.getRecentProducts.method) ;
    console.log(res.data);
    let data="";
    let count = 0;
    console.log(res.data)
    res.data.map(function(e){
    count++;
    if(count<=8){
    let product=new RecentProducts(e);
      data = data + product.getHtmlRecentProducts();
    product.writeHtmlRecentProducts(data);
    }
    })
  } catch (error) {
    console.log(error);
  }