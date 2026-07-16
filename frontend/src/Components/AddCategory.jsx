import { useState } from "react";
import { memo } from "react";
import "../stylesheets/Product.css";

export default  memo(function AddCategoryForm({isFormOpen,setIsFormOpen,refresh,setRefresh}) {
  const [form, setForm] = useState({
    category_name: "",
    category_description: "",
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

    if (!form.category_name) {
      setError("Category name is required");
      return;
    }

    const data = new FormData();
    data.append("category_name", form.category_name);
    data.append("category_description", form.category_description);
    if (imageFile) {
      data.append("category_image", imageFile);
    }
console.log(data);

    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/api/category", {
        method: "POST",
        body: data,
      });
      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.message || "Something went wrong");
      }

      setSuccess(true);
      setForm({
        category_name: "",
        category_description: "",
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
        <p className="form-success">Category added.</p>
        <button className="btn" onClick={() => setSuccess(false)}>
          Add another
        </button>
      </div>
    );
  }

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <h3 style={{ marginTop: 0 }}>Add Category</h3>
      <button
        onClick={handleClick}
        style={{
          position: "absolute",
          right: "15px",
          top: "25px",
          borderRadius: "5px",
          border: "none",
          background: "#58def1",
          padding: "5px 10px",
        }}
      >
        X
      </button>
      {error && <p className="form-error">{error}</p>}

      <div className="form-group">
        <label htmlFor="product_name">Category name</label>
        <input
          id="category_name"
          name="category_name"
          type="text"
          value={form.category_name}
          onChange={handleChange}
          placeholder="Fresh Apples"
        />
      </div>

      <div className="form-group">
        <label htmlFor="product_description">Description</label>
        <textarea
          id="category_description"
          name="category_description"
          value={form.category_description}
          onChange={handleChange}
          placeholder="Short description of the product"
        />
      </div>

      <div className="form-group">
        <label htmlFor="product_image">Category image</label>
        <input
          id="category_image"
          name="category_image"
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
        {loading ? "Adding..." : "Add Category"}
      </button>
    </form>
  );
})
