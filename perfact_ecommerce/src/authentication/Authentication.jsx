import { createContext, useContext, useEffect, useState } from "react";

const Authcontext = createContext();

const Authentication = ({ children }) => {
  const [user, setUser] = useState(null);
  const [subc, setSubC] = useState(null);

  useEffect(() => {
    let token = localStorage.getItem("token");
    if(token){
       setUser(token);
       console.log("Token from auth :", token);
    }
    let sub = localStorage.getItem("sub");
    if(sub){
       setSubC(JSON.parse(sub));
      }
  }, []);

  const User = (data) => {
   localStorage.setItem("token", data);
   setUser(data);
  };

  const subcategorySender = (sub)=>{
   localStorage.setItem("sub", JSON.stringify(sub));
   setSubC(sub);
  }

  return (
    <Authcontext.Provider value={{ User, user, subcategorySender, subc }}>
      {children}
    </Authcontext.Provider>
  );
}

export const authUser = () => useContext(Authcontext);
export default Authentication;
