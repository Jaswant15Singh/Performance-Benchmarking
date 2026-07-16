import AddProductForm from "../Components/AddProduct";
import NavbarComponent from "../Components/Navbar";
import "../stylesheets/Home.css";
import { useState, useEffect } from "react";
const Product = () => {
  const [products, setProducts] = useState([]);
  // const [error, setError] = useState(null);
  const [refresh,setRefresh]=useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  useEffect(() => {
    const controller = new AbortController();

    async function fetchProducts() {
      try {
        const result = await fetch("http://localhost:3000/api/products");
        const data = await result.json();
        setProducts(data.data);
      } catch (error) {
        console.log(error);
        setError(error);
      }
    }
    fetchProducts();
    return () => {
      controller.abort();
    };
  }, [refresh]);

  return (
    <>
      {isFormOpen && (
        <div className="overlay">
          <AddProductForm isFormOpen={isFormOpen} setIsFormOpen={setIsFormOpen} refresh={refresh} setRefresh={setRefresh}/>
        </div>
      )}
      <div className="page ">
        <NavbarComponent />
        <section
          id="products"
          className="container section"
          style={{ position: "relative" }}
        >
          <h3>All products</h3>
          <button
            style={{
              position: "absolute",
              top: "30px",
              right: "10px",
              borderRadius: "5px",
              background: "#58def1",
              padding: "3px 10px",
            }}
            onClick={()=>{setIsFormOpen(!isFormOpen)}}
          >
            Add Product
          </button>
          <div className="grid">
            {products.map((p) => (
              <div key={p.product_id} className="product-card">
                <img
                  src={`http://localhost:3000/uploads/products/${p.product_image}`}
                  width="100%"
                  style={{ aspectRatio: "1/1", cursor: "pointer" }}
                  alt={p.product_name}
                />
                <div className="product-category">{p.product_name}</div>
                <div className="product-name">{p.product_name}</div>
                <div className="product-row">
                  <span className="product-price">{p.product_price}</span>
                  <button className="btn btn-small">Add</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};
export default Product;
