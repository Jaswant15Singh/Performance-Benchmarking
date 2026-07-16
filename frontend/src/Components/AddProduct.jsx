import { useState } from "react";
import { memo } from "react";
import "../stylesheets/Product.css";

export default  memo(function AddProductForm({isFormOpen,setIsFormOpen,refresh,setRefresh}) {
  const [form, setForm] = useState({
    product_name: "",
    product_description: "",
    product_price: "",
    category_id: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0] || null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.product_name) {
      setError("Product name is required");
      return;
    }

    const data = new FormData();
    data.append("product_name", form.product_name);
    data.append("product_description", form.product_description);
    data.append("product_price", form.product_price);
    data.append("category_id", form.category_id);
    if (imageFile) {
      data.append("product_image", imageFile);
    }

    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/api/product", {
        method: "POST",
        body: data,
      });
      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.message || "Something went wrong");
      }

      setSuccess(true);
      setForm({
        product_name: "",
        product_description: "",
        product_price: "",
        category_id: "",
      });
      setImageFile(null);
      e.target.reset();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setRefresh(!refresh)
    }
  };

  const handleClick=(e)=>{
    console.log(e);
    e.stopPropagation();
    setIsFormOpen(!isFormOpen)
  }

  if (success) {
    return (
      <div className="form-card">
        <p className="form-success">Product added.</p>
        <button className="btn" onClick={() => setSuccess(false)}>
          Add another
        </button>
      </div>
    );
  }

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <h3 style={{ marginTop: 0 }}>Add product</h3>
      <button
        onClick={handleClick}
        style={{
          position: "absolute",
          right: "15px",
          top: "25px",
          borderRadius: "5px",
          border: "none",
          background: "#2e7d32",
          padding: "6px 10px",
          color:"white"
        }}
      >
        X
      </button>
      {error && <p className="form-error">{error}</p>}

      <div className="form-group">
        <label htmlFor="product_name">Product name</label>
        <input
          id="product_name"
          name="product_name"
          type="text"
          value={form.product_name}
          onChange={handleChange}
          placeholder="Fresh Apples"
        />
      </div>

      <div className="form-group">
        <label htmlFor="product_description">Description</label>
        <textarea
          id="product_description"
          name="product_description"
          value={form.product_description}
          onChange={handleChange}
          placeholder="Short description of the product"
        />
      </div>

      <div className="form-group">
        <label htmlFor="product_price">Price</label>
        <input
          id="product_price"
          name="product_price"
          type="number"
          step="0.01"
          min="0"
          value={form.product_price}
          onChange={handleChange}
          placeholder="3.99"
        />
      </div>

      <div className="form-group">
        <label htmlFor="category_id">Category ID</label>
        <input
          id="category_id"
          name="category_id"
          type="text"
          value={form.category_id}
          onChange={handleChange}
          placeholder="1"
        />
      </div>

      <div className="form-group">
        <label htmlFor="product_image">Product image</label>
        <input
          id="product_image"
          name="product_image"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileChange}
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary form-submit"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add product"}
      </button>
    </form>
  );
})
