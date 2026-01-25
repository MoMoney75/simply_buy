import React from "react";
import './CSS/home.css'
import { useNavigate } from "react-router-dom";
function Home(){

    const token = localStorage.getItem('token')
    const navigate = useNavigate();



    return(
        <div className="container-fluid">

            { <p> Browse through hundreds of products with free shipping to anywhere in the USA!</p>}
            <div id="carouselExample" className="carousel slide">
             <div className="carousel-inner">
                <div className="carousel-item active">
                    <h3>Electronics</h3>
                    <p> 
                        Stay ahead of the curve with our state-of-the-art electronics, 
                        designed to enhance your lifestyle, improve productivity, 
                        and bring entertainment to life. Discover, compare, 
                        and choose from our extensive collection to find the perfect tech 
                        solutions for your needs.
                    </p>

                </div>
                <div className="carousel-item">
                    <h3>Jewelery</h3>
                    <p>
                    Discover pieces crafted from high-quality materials, including gold, silver, and precious gemstones, 
                    all designed to add a touch of glamour to your ensemble. Whether you’re celebrating a milestone, 
                    seeking the perfect gift, or simply treating yourself, our Jewelry collection features designs that 
                    combine classic beauty with contemporary flair.
                    </p>

                </div>

                <div className="carousel-item">
                   <h3>Men's Clothing</h3>
                   <p>
                   Our collection features premium fabrics and modern cuts, ensuring you look sharp 
                   whether you’re in the office, at a weekend event, or hitting the gym. Explore the 
                   latest trends and timeless essentials from top brands known for their quality 
                   and design. Elevate your wardrobe with versatile pieces that offer both style 
                   and functionality, helping you make a lasting impression wherever you go.
                   </p>

                </div>
                <div className="carousel-item">
                   <h3>Women's Clothing</h3>
                   <p>
                   Discover our curated selection of high-quality fabrics, modern cuts, 
                   and on-trend designs that celebrate your individuality and enhance your wardrobe. 
                   Whether you’re dressing up for a special event, refreshing your everyday essentials, 
                   or exploring the latest fashion trends, our collection features pieces that combine comfort, style, 
                   and versatility. Embrace your unique style and find the perfect outfits 
                   to express yourself with confidence.
                   </p>

                </div>
                <div className="shop-now">

{token === null ? <button className='btn btn-primary' onClick={()=>navigate("/login")}>Shop now </button>
    : 
<button className='btn btn-primary' onClick={()=>navigate('/products')}>Shop now </button> }
</div>    
             </div>
             
          <div>
              <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
              </button>

              <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>   
            </div>  
          
          </div>
          
        </div>
    )
}

export default Home;