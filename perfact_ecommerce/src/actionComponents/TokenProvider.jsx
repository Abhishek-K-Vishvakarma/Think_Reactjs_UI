import { useEffect } from "react";
const TokenProvider = () => {
  useEffect(() => {
    const Token = async () => {
      try {
        const req = await fetch("https://think-api-task-2.onrender.com/api/user_admin", {
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
