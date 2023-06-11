const Category = require("./models/Category");
const Order = require('./models/Order');
const OrderDetail = require('./models/OrderDetail');
const Product = require('./models/Product');
const User = require('./models/User');
const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();

const color = ['black', 'white', 'red', 'blue', 'green'];
const size = ['xs', 's', 'm', 'l', 'xl']

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb+srv://admin:123123123@cluster0.qbflnrn.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log(err);
      process.exit(-1)
    } else {
      console.log("Connected to MongoDB");
    }
  }
);

(async()=>{
  // create categories
  await Category.deleteMany();
  const cat1 = await Category.create({name:"mobile", image:"img/cat-1.jpg", productCount:150})
  const cat2 = await Category.create({name:"accessories", image:"img/cat-2.jpg", productCount:100})
  const cat3 = await Category.create({name:"computers", image:"img/cat-3.jpg", productCount:80})
  const cat4 = await Category.create({name:"office supplies", image:"img/cat-4.jpg", productCount:30})
  const cat5 = await Category.create({name:"TVs", image:"img/cat-2.jpg", productCount:15})
  const cat6 = await Category.create({name:"electronics", image:"img/cat-3.jpg", productCount:222})
  const cat7 = await Category.create({name:"women's fashion", image:"img/cat-4.jpg", productCount:121})
  const cat8 = await Category.create({name:"men's fashion", image:"img/cat-1.jpg", productCount:444})
  const cat9 = await Category.create({name:"kid's fashion", image:"img/cat-3.jpg", productCount:154})
  const cat10 = await Category.create({name:"supermarket", image:"img/cat-4.jpg", productCount:123})
  const cat11 = await Category.create({name:"kitchen", image:"img/cat-1.jpg", productCount:321})
  const cat12 = await Category.create({name:"garden", image:"img/cat-2.jpg", productCount:101})
  // create products
  await Product.deleteMany();
  await Product.create({
    name: "New Balance Sportswear New Arrivals",
    image: "img/product-1.jpg",
    category_id: cat1.id,
    price: 100,
    discount: .1,
    rating: 4.5,
    rating_count: 120,
    is_featured: true,
    is_recent: false,
    color: color[Math.floor(Math.random()*color.length)],
    size: size[Math.floor(Math.random()*size.length)],
    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae nostrum ipsam quisquam molestiae expedita laudantium necessitatibus! Necessitatibus accusantium aspernatur aliquam.",
  })
  await Product.create({
    name: "Mintra Shoes",
    image: "img/product-2.jpg",
    category_id: cat2.id,
    price: 250,
    discount: .15,
    rating: 4,
    rating_count: 99,
    is_featured: true,
    is_recent: false,
    color: color[Math.floor(Math.random()*color.length)],
    size: size[Math.floor(Math.random()*size.length)],
    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae nostrum ipsam quisquam molestiae expedita laudantium necessitatibus! Necessitatibus accusantium aspernatur aliquam.",
  })
  await Product.create({
    name: "Appliances",
    image: "img/product-3.jpg",
    category_id: cat3.id,
    price: 48.5,
    discount: .1,
    rating: 3.5,
    rating_count: 45,
    is_featured: true,
    is_recent: false,
    color: color[Math.floor(Math.random()*color.length)],
    size: size[Math.floor(Math.random()*size.length)],
    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae nostrum ipsam quisquam molestiae expedita laudantium necessitatibus! Necessitatibus accusantium aspernatur aliquam.",
  })
  await Product.create({
    name: "Kitchen small Appliances",
    image: "img/product-4.jpg",
    category_id: cat4.id,
    price: 280,
    discount: .15,
    rating: 4.5,
    rating_count: 70,
    is_featured: true,
    is_recent: false,
    color: color[Math.floor(Math.random()*color.length)],
    size: size[Math.floor(Math.random()*size.length)],
    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae nostrum ipsam quisquam molestiae expedita laudantium necessitatibus! Necessitatibus accusantium aspernatur aliquam.",
  })
  await Product.create({
    name: "LG TV's",
    image: "img/product-5.jpg",
    category_id: cat5.id,
    price: 999,
    discount: .05,
    rating: 4.5,
    rating_count: 34,
    is_featured: true,
    is_recent: true,
    color: color[Math.floor(Math.random()*color.length)],
    size: size[Math.floor(Math.random()*size.length)],
    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae nostrum ipsam quisquam molestiae expedita laudantium necessitatibus! Necessitatibus accusantium aspernatur aliquam.",
  })
  await Product.create({
    name: "Nikon Cameras & Accessores",
    image: "img/product-6.jpg",
    category_id: cat6.id,
    price: 3200,
    discount: .1,
    rating: 4.5,
    rating_count: 15,
    is_featured: true,
    is_recent: true,
    color: color[Math.floor(Math.random()*color.length)],
    size: size[Math.floor(Math.random()*size.length)],
    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae nostrum ipsam quisquam molestiae expedita laudantium necessitatibus! Necessitatibus accusantium aspernatur aliquam.",
  })
  await Product.create({
    name: "Power Bank",
    image: "img/product-7.jpg",
    category_id: cat7.id,
    price: 300,
    discount: .05,
    rating: 4.5,
    rating_count: 190,
    is_featured: true,
    is_recent: true,
    color: color[Math.floor(Math.random()*color.length)],
    size: size[Math.floor(Math.random()*size.length)],
    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae nostrum ipsam quisquam molestiae expedita laudantium necessitatibus! Necessitatibus accusantium aspernatur aliquam.",
  })
  await Product.create({
    name: "Kitchen Collection",
    image: "img/product-8.jpg",
    category_id: cat8.id,
    price: 999,
    discount: .1,
    rating: 4,
    rating_count: 55,
    is_featured: true,
    is_recent: true,
    color: color[Math.floor(Math.random()*color.length)],
    size: size[Math.floor(Math.random()*size.length)],
    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae nostrum ipsam quisquam molestiae expedita laudantium necessitatibus! Necessitatibus accusantium aspernatur aliquam.",
  })
  await Product.create({
    name: "Penguin",
    image: "img/product-9.jpg",
    category_id: cat9.id,
    price: 245,
    discount: .1,
    rating: 4,
    rating_count: 12,
    is_featured: false,
    is_recent: true,
    color: color[Math.floor(Math.random()*color.length)],
    size: size[Math.floor(Math.random()*size.length)],
    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae nostrum ipsam quisquam molestiae expedita laudantium necessitatibus! Necessitatibus accusantium aspernatur aliquam.",
  })
  await Product.create({
    name: "Joyroom Headsets",
    image: "img/product-1.jpg",
    category_id: cat10.id,
    price: 1080,
    discount: .1,
    rating: 4.5,
    rating_count: 45,
    is_featured: false,
    is_recent: true,
    color: color[Math.floor(Math.random()*color.length)],
    size: size[Math.floor(Math.random()*size.length)],
    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae nostrum ipsam quisquam molestiae expedita laudantium necessitatibus! Necessitatibus accusantium aspernatur aliquam.",
  })
  await Product.create({
    name: "Adidas Bags",
    image: "img/product-2.jpg",
    category_id: cat11.id,
    price: 450,
    discount: .1,
    rating: 3.5,
    rating_count: 4,
    is_featured: false,
    is_recent: true,
    color: color[Math.floor(Math.random()*color.length)],
    size: size[Math.floor(Math.random()*size.length)],
    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae nostrum ipsam quisquam molestiae expedita laudantium necessitatibus! Necessitatibus accusantium aspernatur aliquam.",
  })
  await Product.create({
    name: "SAMSUNG TV's",
    image: "img/product-3.jpg",
    category_id: cat12.id,
    price: 10100,
    discount: .05,
    rating: 4.5,
    rating_count: 10,
    is_featured: false,
    is_recent: true,
    color: color[Math.floor(Math.random()*color.length)],
    size: size[Math.floor(Math.random()*size.length)],
    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae nostrum ipsam quisquam molestiae expedita laudantium necessitatibus! Necessitatibus accusantium aspernatur aliquam.",
  })

  console.log('done')
  process.exit(1)
})()
