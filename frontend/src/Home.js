import React from "react";
import { Link } from "react-router-dom";
function Home(){

    return(
        <div>
            <h1>Welcome to Simply Buy</h1>
            <h2>Where we make shopping fun and easy!</h2>
            <div>
                <div>
                    <h3>Electronics</h3>
                    <p> 
                        Stay ahead of the curve with our state-of-the-art electronics, 
                        designed to enhance your lifestyle, improve productivity, 
                        and bring entertainment to life. Discover, compare, 
                        and choose from our extensive collection to find the perfect tech 
                        solutions for your needs.
                    </p>
                    <Link to="/products/electronics">Shop Now</Link>
                </div>
                <div>
                    <h3>Jewelery</h3>
                    <p>
                    Discover pieces crafted from high-quality materials, including gold, silver, and precious gemstones, 
                    all designed to add a touch of glamour to your ensemble. Whether you’re celebrating a milestone, 
                    seeking the perfect gift, or simply treating yourself, our Jewelry collection features designs that 
                    combine classic beauty with contemporary flair.
                    </p>
                    <Link to="/products/jewelery">Shop Now</Link>
                </div>

                <div>
                   <h3>Men's Clothing</h3>
                   <p>
                   Our collection features premium fabrics and modern cuts, ensuring you look sharp 
                   whether you’re in the office, at a weekend event, or hitting the gym. Explore the 
                   latest trends and timeless essentials from top brands known for their quality 
                   and design. Elevate your wardrobe with versatile pieces that offer both style 
                   and functionality, helping you make a lasting impression wherever you go.
                   </p>
                   <Link to="/products/men's%20clothing">Shop Now</Link>
                </div>
                <div>
                   <h3>Women's Clothing</h3>
                   <p>
                   Discover our curated selection of high-quality fabrics, modern cuts, 
                   and on-trend designs that celebrate your individuality and enhance your wardrobe. 
                   Whether you’re dressing up for a special event, refreshing your everyday essentials, 
                   or exploring the latest fashion trends, our collection features pieces that combine comfort, style, 
                   and versatility. Embrace your unique style and find the perfect outfits 
                   to express yourself with confidence.
                   </p>
                   <Link to="/products/women's%20clothing">Shop Now</Link>
                </div>
            </div>
        </div>
    )
}

export default Home;