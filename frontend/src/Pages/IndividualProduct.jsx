// import { Link } from "react-router-dom";
import AddProductForm from "../Components/AddProduct";
import NavbarComponent from "../Components/Navbar";
import UpdateProduct from "../Components/UpdateProduct";
import "../stylesheets/Home.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const IndividualProduct = () => {
  const [products, setProducts] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const controller = new AbortController();

    async function fetchProducts() {
      try {
        const result = await fetch(`http://localhost:3000/api/product/${id}`);
        const data = await result.json();
        setProducts(data.data);
      } catch (error) {
        console.log(error);
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
          <UpdateProduct
            isFormOpen={isFormOpen}
            setIsFormOpen={setIsFormOpen}
            refresh={refresh}
            setRefresh={setRefresh}
            id={id}
          />
        </div>
      )}
      <div className="page">
        <NavbarComponent />
        <section
          id="products"
          className="container section"
          style={{ position: "relative" }}
        >
          <div
            key={products.product_id}
            className="product-detail-row"
            style={{
              display: "flex",
              flex: "1 1",
              flexDirection: "row",
              alignItems: "flex-start",
              gap: "40px",
              justifyContent: "space-evenly",
              flexWrap: "wrap",
            }}
          >
            <div style={{ maxWidth: "320px" }}>
              <img
                src={`http://localhost:3000/uploads/products/${products.product_image}`}
                width="100%"
                style={{
                  aspectRatio: "1/1",
                  cursor: "pointer",
                  objectFit: "contain",
                  borderRadius: "10px",
                  boxShadow: " 0 0px 20px rgba(0, 0, 0, 0.13)",
                }}
                alt={products.product_name}
              />
            </div>

            <div
              style={{
                maxWidth: "480px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <h3 style={{ margin: 0 }}>{products.product_name}</h3>
              <div className="product-category">{products.product_name}</div>
              <p style={{ margin: 0 }}>{products.product_description}</p>

              <div
                className="product-row"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: "10px",
                }}
              >
                <span className="product-price">{products.product_price}</span>
              </div>
              <button
                style={{
                 width:"fit-content",
                  borderRadius: "5px",
                  background: "#2e7d32",
                  padding: "6px 10px",
                  color: "white",
                  border: "none",
                }}
                onClick={() => {
                  setIsFormOpen(!isFormOpen);
                }}
              >
                Update Product
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default IndividualProduct;
