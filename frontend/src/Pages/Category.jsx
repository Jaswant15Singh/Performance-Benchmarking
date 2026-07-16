import AddCategoryForm from "../Components/AddCategory";
import NavbarComponent from "../Components/Navbar";
import "../stylesheets/Home.css";
import { useState, useEffect } from "react";
const Category = () => {
  const [category, setCategory] = useState([]);
  // const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  useEffect(() => {
    const controller = new AbortController();

    async function fetchCategory() {
      try {
        const result = await fetch("http://localhost:3000/api/categories");
        const data = await result.json();
        setCategory(data.data);
      } catch (error) {
        console.log(error);
        // setError(error);
      }
    }
    fetchCategory();
    return () => {
      controller.abort();
    };
  }, [refresh]);

  return (
    <>
      {isFormOpen && (
        <div className="overlay">
          <AddCategoryForm
            isFormOpen={isFormOpen}
            setIsFormOpen={setIsFormOpen}
            refresh={refresh}
            setRefresh={setRefresh}
          />
        </div>
      )}
      <div className="page ">
        <NavbarComponent />
        <section
          id="products"
          className="container section"
          style={{ position: "relative" }}
        >
          <h3>All Categories</h3>
          <button
            style={{
              position: "absolute",
              top: "30px",
              right: "10px",
              borderRadius: "5px",
              background: "#58def1",
              padding: "3px 10px",
            }}
            onClick={() => {
              setIsFormOpen(!isFormOpen);
            }}
          >
            Add Category
          </button>
          <div className="grid">
            {category.map((p) => (
              <div key={p.category_id} className="product-card">
                <img
                  src={`http://localhost:3000/uploads/categories/${p.category_image}`}
                  width="100%"
                  style={{ aspectRatio: "1/1", cursor: "pointer" }}
                  alt={p.category_name}
                />
                <div className="product-category">{p.category_name}</div>
                <div className="product-name">{p.category_name}</div>
                
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};
export default Category;
