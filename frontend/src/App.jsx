import {BrowserRouter,Routes, Route} from "react-router-dom"
import Home from "./Pages/Home";
import Product from "./Pages/Product";
import Category from "./Pages/Category";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/products" element={<Product />} />
          <Route exact path="/categories" element={<Category />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;



