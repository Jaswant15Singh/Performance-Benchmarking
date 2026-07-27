import { Link } from "react-router-dom";
const NavbarComponent = () => {
  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="logo">FreshCart</Link>
        <nav className="nav">
          {/* <a href="#">Home</a> */}
          <Link to="/">Home</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/products">Products</Link>
          <Link to="/contact">Contact</Link>
        </nav>
        <button className="btn btn-primary">Shop now</button>
      </div>
    </header>
  );
};

export default NavbarComponent;
