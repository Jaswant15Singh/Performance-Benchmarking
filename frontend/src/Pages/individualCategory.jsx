// import { Link } from "react-router-dom";
import NavbarComponent from "../Components/Navbar";
import "../stylesheets/Home.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import AddCategory from "../Components/AddCategory";
import UpdateCategory from "../Components/UpdateCategory";

const IndividualCategory = () => {
  const [category, setCategory] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const controller = new AbortController();

    async function fetchProducts() {
      try {
        const result = await fetch(`http://localhost:3000/api/category/${id}`);
        const data = await result.json();
        console.log(data.data);
        
        setCategory(data.data);
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
          <UpdateCategory
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
          id="category"
          className="container section"
          style={{ position: "relative" }}
        >
          <div
            key={category.category_id}
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
                src={`http://localhost:3000/uploads/categories/${category.category_image}`}
                width="100%"
                style={{
                  aspectRatio: "1/1",
                  cursor: "pointer",
                  objectFit: "contain",
                  borderRadius: "10px",
                  boxShadow: " 0 0px 20px rgba(0, 0, 0, 0.13)",
                }}
                alt={category.category_name}
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
              <h3 style={{ margin: 0 }}>{category.category_name}</h3>
              <div className="product-category">{category.category_name}</div>
              <p style={{ margin: 0 }}>{category.category_description}</p>
              <button
                style={{
                  // position: "absolute",
                  // top: "30px",
                  // right: "10px",
                  borderRadius: "5px",
                  background: "#2e7d32",
                  padding: "6px 10px",
                  color: "white",
                  border: "none",
                  width:"fit-content"
                }}
                onClick={() => {
                  setIsFormOpen(!isFormOpen);
                }}
              >
                Update Category
              </button>
              <div
                className="product-row"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: "10px",
                }}
              >
                <span className="product-price">{category.product_price}</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default IndividualCategory;
