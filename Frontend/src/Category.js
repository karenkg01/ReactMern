import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import {useParams, Link} from 'react-router-dom';

//category card to choose from
const CategoryOptions = (props)=> {

  console.log("options...", props)

  return (
  <div id="homepage-category" >
    <h1>Select a Category:</h1>
    {props.categories && props.categories.map(x=> 
   <div id="category-options-card" className="card-product col-sm-12 col-md-6 col-lg-3" >
    <div className="card-body">
      <h5 className="card-title">{x}</h5>
      <Link to={`/categories/${x}`}>View Category</Link>
    </div>
    </div>
  
    
    
    )}

  </div>
  );
}

//list of products
const CategoryList = (props)=> {
  const [products, setProducts] = useState([]);

  async function getProducts() {
    const response = await axios.get('http://localhost:8080/api/v1/products')
    console.log("Got Products ", response)
    setProducts(response.data.products)
  }

  useEffect(()=>{
    getProducts();
  }, [])

  const filteredProducts = products.filter((product) => product.category === props.category);


  return (
    <div>
      <h1>Category: {props.category}</h1>
      {
	    filteredProducts.map((product, idx) => {

     	return <div id="homepage-product”" className="card">
                <div ClassName="card-body" key={`product-${idx}`}>
                  <div>{product.name}</div>
                  <div>{product.price}</div>
                  <button>AddToCart</button>
                </div>
            </div>

         
    })
}
    </div>
  )
}

const Category = ()=> {
    const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const {category} = useParams()


    async function getAllCategories() {
        const response = await axios.get('http://localhost:8080/api/v1/homepage/allcategories')
        console.log("Got Categories ", response)
        setCategories(response.data.map((c)=> c.category))
      }
    
      
    
      useEffect(()=>{
        getAllCategories();
      }, [])
    console.log("category", category)
    console.log("categories", categories )

    return (
    <>
    {/* <div class="flowers-wrap text-center " style={{ backgroundColor: 'white', marginTop: 100, marginLeft: 10, borderRadius: 20 }}>
      <p><strong>Category Filter</strong></p>
        <form>
            <div><input type="checkbox" name="Mobile" value="Mobile" id="Mobile" />Mobile</div>
            <div><input type="checkbox" name="Pet" value="Pet" id="Pet" />Pet</div>
            <div><input type="checkbox" name="names" value="names" id="names"/>names</div>
        </form>
    </div> */}
    {category? <CategoryList category={category} />: <CategoryOptions categories = {categories} />}

    </>
    
    );
  
}

  export default Category;