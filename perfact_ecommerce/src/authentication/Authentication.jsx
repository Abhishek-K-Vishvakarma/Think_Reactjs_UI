import { createContext, useContext, useEffect, useState } from "react";

const Authcontext = createContext();

const Authentication = ({ children }) => {
  const [user, setUser] = useState(null);
  const [subc, setSubC] = useState(null);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      setUser(token);
      console.log("Token from auth :", token);
    }
    let sub = localStorage.getItem("sub");
    if (sub) {
      setSubC(JSON.parse(sub));
    }
    let product = localStorage.getItem("productData");
    if (product) {
      setProduct(JSON.parse(product));
      console.log("Product form auth :", product);
    }
  }, []);

  const User = (data) => {
    localStorage.setItem("token", data);
    setUser(data);
  };

  const subcategorySender = (sub) => {
    localStorage.setItem("sub", JSON.stringify(sub));
    setSubC(sub);
  }

  const SendProductDataToOrderPage = (product) => {
    localStorage.setItem("productData", JSON.stringify(product));
    setProduct(product);
  }

  return (
    <Authcontext.Provider value={{ User, user, subcategorySender, subc, SendProductDataToOrderPage, product }}>
      {children}
    </Authcontext.Provider>
  );
}

export const authUser = () => useContext(Authcontext);
export default Authentication;
