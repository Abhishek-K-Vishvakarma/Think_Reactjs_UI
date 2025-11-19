import { useEffect } from "react";
const TokenProvider = () => {
  useEffect(() => {
    const Token = async () => {
      try {
        const req = await fetch("http://localhost:5002/api/user_admin", {
          method: "GET",
          credentials: "include",
        });
        const res = await req.json();
        console.log(res);
      }catch (err) {
        console.log("Token fetch error:", err);
      }
    };
    Token();
  }, []);
  
  return (
    <div>

    </div>
  )
}

export default TokenProvider;
