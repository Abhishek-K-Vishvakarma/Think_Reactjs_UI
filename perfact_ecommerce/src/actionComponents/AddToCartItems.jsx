import { useEffect, useState } from "react";
import { Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { authUser } from "../authentication/Authentication";

const AddToCartItems = () => {
  const [cart, setCart] = useState([]);
    const { user } = authUser();
    const [data, setData] = useState(null);
  useEffect(()=>{
    fetch("https://think-api-task-2.onrender.com/api/getcart")
    .then(e=> e.json())
    .then((data)=>{
      setCart(data?.resCartData);
    })
  }, []);

  useEffect(() => {
    const Profile = async () => {
      if (!user) return;

      try {
        const response = await fetch("https://think-api-task-2.onrender.com/api/profile", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${ user }`,
          },
          credentials: "include"
        });

        const result = await response.json();
        setData(result?.users?.user);
      } catch (err) {
        toast.error("Internal Server Error", err);
      }
    };
    Profile();
  }, [user]);
  const DeleteOneCartItems = async(e)=>{
    console.log(e)
    try{
      const request = await fetch(`https://think-api-task-2.onrender.com/api/deletecart/${e?._id}`, {
        method: "DELETE",
      });
      const response = await request.json();
      console.log(request, response);
      if(request.status == 200){
         toast.success(response.message);
      }else{
         toast.error(response.message);
      }
      setCart(cart.filter(id=> id?._id !== e?._id));
    }catch(err){
       console.error("Internal Server error :", err);
    }
  }
  const carts = cart.filter((u)=>{
    return u?.user?._id == data?._id;
  })
  return (
    <div>
      <Navbar style={{
        background: "linear-gradient(90deg, #1B20AB, #7A5AF8)",
        padding: "10px",
        textAlign: "center",
        color: "white",
        boxShadow: "0px 4px 12px rgba(0,0,0,0.3)",
        margin: 0,
        letterSpacing: "1px",
        fontSize: "18px",
      }}>
        <Container>
          <Link to="/" className="text-white" style={{ textDecoration: 'none' }}>Home Page</Link>
          <Link className="text-white" style={{ textDecoration: 'none' }}>Cart Items</Link>
        </Container>
      </Navbar>
      <div className="container">
        {
          carts.map((e) => {
            return <>
              <div className="card py-5 px-5 mt-3" style={{boxShadow: '-2px 2px 3px 2px #ccc'}}>
                <h4>Customer : {e?.user?.name}</h4>
                <br/>
                <p><b>Product: </b>{e?.product?.p_name}</p>
                <p><b>Price: </b>{e?.product?.price}</p>
                <p><b>Description: </b>{e?.product?.description}</p>
                <button onClick={() => DeleteOneCartItems(e)} style={{border: 'none', background: 'linear-gradient(to left, blue, pink)', padding: '8px', color: 'white', fontWeight: 'bold'}}>Delete</button>
              </div>
            </>
          })
        }
      </div>
      <ToastContainer/>
    </div>
  )
}

export default AddToCartItems;
