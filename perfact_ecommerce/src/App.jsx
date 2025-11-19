import { BrowserRouter, Routes, Route } from "react-router-dom";
import PaymentSuccess from "./payments/Payment";
import Home from "../Home";
import SignUp from "./actionComponents/SignUp";
import SignIn from "./actionComponents/SignIn";
import Administration from "./adminPannel/Administration";
import Category from "./adminPannel/Category";
import SubCategory from "./adminPannel/Subcategory";
import Product from "./adminPannel/Product";
import GetAdminCategory from "./adminPannel/GetAdminCategory";
import GetAdminSubCategory from "./adminPannel/GetAdminSubcategory";
import GetAdminProduct from "./adminPannel/GetProduct";
import UserSubcategory from "./actionComponents/UserSubcategory";
import UserProduct from "./actionComponents/UserProduct";
import UserLogout from "./actionComponents/UserLogout";
import TokenProvider from "./actionComponents/TokenProvider";
import Authentication from "./authentication/Authentication";
import AdminLogout from "./adminPannel/AdminLogout";
import AddToCartItems from "./actionComponents/AddToCartItems";
function App() {
  return (
    <>
      <Authentication>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/payment" element={<PaymentSuccess />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/signin" element={<SignIn />}></Route>
            <Route path="/admin" element={<Administration />}></Route>
            <Route path="/admincategory" element={<Category />}></Route>
            <Route path="/adminsubcategory" element={<SubCategory />}></Route>
            <Route path="/adminproduct" element={<Product />}></Route>
            <Route path="/getadmincategory" element={<GetAdminCategory />}></Route>
            <Route path="/getadminsubcategory" element={<GetAdminSubCategory />}></Route>
            <Route path="/getadminproduct" element={<GetAdminProduct />}></Route>
            <Route path="/usubproduct" element={<UserSubcategory />}></Route>
            <Route path="/uproduct" element={<UserProduct />}></Route>
            <Route path="/ulogout" element={<UserLogout />}></Route>
            <Route path="/token" element={<TokenProvider />}></Route>
            <Route path="/adminlogout" element={<AdminLogout/>}></Route>
            <Route path="/addtocart" element={<AddToCartItems />}></Route>
          </Routes>
        </BrowserRouter>
      </Authentication>
    </>
  );
}

export default App;
