import {BrowserRouter,Routes, Route} from "react-router-dom"
import Home from "./Pages/Home";
import Product from "./Pages/Product";
import Category from "./Pages/Category";
import IndividualProduct from "./Pages/IndividualProduct";
import IndividualCategory from "./Pages/individualCategory";
import NotFound from "./Pages/NotFound";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/products" element={<Product />} />
          <Route exact path="/categories" element={<Category />} />
          <Route exact path="/category/:id" element={<IndividualCategory/>} />
          <Route exact path="/product/:id" element={<IndividualProduct/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;



