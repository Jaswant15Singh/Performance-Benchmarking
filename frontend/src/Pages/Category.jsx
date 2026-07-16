import NavbarComponent from "../Components/Navbar";
import "../stylesheets/Home.css";
import { useState, useEffect } from "react";
const Category = () => {
  const [category, setCategory] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const controller = new AbortController();
    async function fetchProducts() {
      try {
        const result = await fetch("http://localhost:3000/api/categories");
        const data = await result.json();
        setCategory(data.data);
      } catch (error) {
        console.log(error);
        setError(error);
      }
    }
    fetchProducts();
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className="page">
      <NavbarComponent />
      <section id="products" className="container section">
        <h3>All Categories</h3>
        <div className="grid">
          {category.map((p) => (
            <div key={p.category_id} className="product-card">
              <img
                src={`http://localhost:3000/uploads/categories/${p.category_image}`}
                width="100%"
                style={{ aspectRatio: "1/1", cursor: "pointer" }}
                alt={p.product_name}
              />
              <div className="product-category">{p.category_name}</div>
              <div className="product-name">{p.category_name}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
export default Category;
