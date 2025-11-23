import { createContext, useContext, useEffect, useState } from "react";

const Authcontext = createContext();

const Authentication = ({ children }) => {
  const [user, setUser] = useState(null);
  const [subc, setSubC] = useState(null);
  const [product, setProduct] = useState(null);
  const [order, setOrder] = useState(null);
  const [paycomplete, setPayComplete] = useState({});
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
    let orderData = localStorage.getItem("order");
    if(orderData){
       setOrder(JSON.parse(orderData));
    }
    let payCompletion = localStorage.getItem("paymentCompletionProcess");
    if(payCompletion){
       setPayComplete(JSON.parse(payCompletion));
      console.log("Auth Payment", payCompletion)
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

  const OrderData = (order) => {
    localStorage.setItem("order", JSON.stringify(order));
    setOrder(order);
  }

  const PaymentComplete = (payment)=>{
    localStorage.setItem("paymentCompletionProcess", JSON.stringify(payment));
    setPayComplete(payment);
  }

  return (
    <Authcontext.Provider value={{ User, user, subcategorySender, subc, SendProductDataToOrderPage, product, OrderData, order, PaymentComplete, paycomplete }}>
      {children}
    </Authcontext.Provider>
  );
}

export const authUser = () => useContext(Authcontext);
export default Authentication;
