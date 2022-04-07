
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Home = (props) => {
  const [banner, setBanner] = useState(null);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getBanner();
    getCategories();
    getProducts();
  }, [])

  useEffect(()=>{
    console.log(banner)
  }, [banner])

  async function getBanner() {
    const response = await axios.get('http://localhost:8080/api/v1/homepage/banner')
    console.log("Got Banner Images", response)
    setBanner(response.data.products)
  }
  async function getCategories() {
    const response = await axios.get('http://localhost:8080/api/v1/homepage/categories')
    console.log("Got Categories ", response)
    setCategories(response.data.categories)
  }

  async function getProducts() {
    const response = await axios.get('http://localhost:8080/api/v1/homepage/products')
    console.log("Got Products ", response)
    setProducts(response.data.products)
  }

  return (
    <div id="home">
      {
        banner && 
        <section id="homepage-carousel" className="home-section">
        <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src={`./uploads/${banner[0].image}`} class="d-block w-100" alt="image1"/>
                <div class="carousel-caption d-none d-md-block">
                  <h5>{banner.name}</h5>
                  <p>Some representative placeholder content for the first slide.</p>
                </div>
            </div>
            <div class="carousel-item">
              <img src={`./uploads/${banner[1].image}`} class="d-block w-100" alt="image2"/>
                <div class="carousel-caption d-none d-md-block">
                  <h5>{banner.name}</h5>
                  <p>Some representative placeholder content for the second slide.</p>
                </div>
            </div>
            <div class="carousel-item">
              <img src={`./uploads/${banner[2].image}`} class="d-block w-100" alt="image3"/>
                <div class="carousel-caption d-none d-md-block">
                  <h5>{banner.name}</h5>
                  <p>Some representative placeholder content for the third slide.</p>
                </div>
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </section >
      }
      <section id="homepage-category”" className="home-section categories">
        {categories.map((category) => {
          return <div className="card">
            <div className="card-body">
              {category}
            </div>
          </div>
        })}
      </section>
      <section id="homepage-product”" className="home-section home-product-section">
        <h1>Top Products</h1>
        <div className='home-products-row'>
          {products.filter((x,i)=>i<=3).map((product) => {
            return <div className="card-product col-sm-12 col-md-6 col-lg-3" >

              {product.isTopProduct && <div className="top-product">#1 in {product.category}</div>}
              
              <img className="card-img-top" src={`../uploads/${product.image}`}  alt="card" style={{ width: "100px" }} />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
              </div>
            </div>
          })}
        </div>
        <div className='home-products-row'>
          {products.filter((x,i)=>i>3).map((product) => {
            return <div className="card-product col-sm-12 col-md-6 col-lg-3" >
              <img className="card-img-top" src={`../uploads/${product.image}`}  alt="card" style={{ width: "100px" }} />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
              </div>
            </div>
          })}
        </div>
      </section>
    </div>


  );
}

export default Home;