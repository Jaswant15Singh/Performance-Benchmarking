import { useState } from "react";
import "../stylesheets/Home.css";



export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
  };

  return (
    <div className="page">
      <header className="header">
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
      </header>

      <section className="container hero">
        <div className="hero-text">
          <h2>Groceries delivered to your door, the same day.</h2>
          <p>
            Fresh fruits, vegetables, dairy and more — sourced locally and
            delivered fast. No subscriptions, no hassle.
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary">Start shopping</button>
            <button className="btn">Browse categories</button>
          </div>
        </div>
        <div className="hero-image">🛒</div>
      </section>


      <section id="contact" className="newsletter">
        <h3>Get updates on new products</h3>
        <p>We'll send occasional emails, no spam.</p>
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
      </section>

      <footer className="footer">
        <div className="container footer-inner">
          <p>
            &copy; {new Date().getFullYear()} FreshCart. All rights reserved.
          </p>
          <div className="footer-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
