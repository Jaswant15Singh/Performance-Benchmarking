import { useState,useEffect } from "react";
import "../stylesheets/Home.css";
import NavbarComponent from "../Components/Navbar";
import { Link } from "react-router-dom";
import { base_url } from "../../constant";
export default function Home() {
const [weather,setWeather]=useState('');
 useEffect(()=>{
     const getWeather=async()=>{
       let url = `${base_url}weather`;
       const data=await fetch(url);
       const result=await data.json()       
      //  console.log(await data.json());
       setWeather(result.main.temp)
     }
     getWeather();
 },[])
  // const [email, setEmail] = useState("");
  // const [submitted, setSubmitted] = useState(false);

  // const handleSubscribe = (e) => {
  //   e.preventDefault();
  //   if (!email) return;
  //   setSubmitted(true);
  //   setEmail("");
  // };

  return (
    <div className="page">
      {/* <header className="header">
        <div className="container header-inner">
          <h1 className="logo">FreshCart</h1>
          <nav className="nav">
            <a href="#">Home</a>
            <a href="#categories">Categories</a>
            <a href="#products">Products</a>
            <a href="#contact">Contact</a>
          </nav>
          <button className="btn btn-primary">Shop now</button>
        </div>
      </header> */}
      <NavbarComponent />
      <section className="container hero">
        <div className="hero-text">
          <h2>Groceries delivered to your door, the same day.</h2>
          <p>
            Fresh fruits, vegetables, dairy and more - sourced locally and
            delivered fast. No subscriptions, no hassle.
          </p>
          <div className="hero-buttons">
            <Link to="/products" className="btn btn-primary">
              Start shopping
            </Link>
            <Link to="/categories" className="btn">
              Browse categories
            </Link>
          </div>
        </div>
        <div className="hero-image">🛒</div>
      </section>

      {/* <section id="contact" className="newsletter">
        <h3>Get updates on new products</h3>
        {submitted ? (
          <p className="newsletter-success">Thanks, you're subscribed.</p>
        ) : (
          <form onSubmit={handleSubscribe} className="newsletter-form">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
            <button type="submit" className="btn btn-primary">
              Subscribe
            </button>
          </form>
        )}
      </section> */}

      <footer className="footer">
        <div className="container footer-inner">
          <p>&copy; {new Date().getFullYear()} Jaswant Freshcart.</p>
          <p>
            Today's Weather:{" "}
            <h6>
              <b style={{fontWeight:"bolder"}}>
                {weather} <span>&#176;</span>
              </b>
            </h6>
          </p>
        </div>
      </footer>
    </div>
  );
}
