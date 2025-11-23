import { useEffect, useState } from "react";
import { Container, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { authUser } from "../authentication/Authentication";

const AllProductsItems = () => {
  const [product, setProduct] = useState([]);
  const [users, setUsers] = useState([]);
  // const { subc } = authUser();
  const { user, SendProductDataToOrderPage } = authUser();
  const navigate = useNavigate();
  useEffect(() => {
    fetch("https://think-api-task-2.onrender.com/api/getproducts")
      .then(e => e.json())
      .then((data) => {
        setProduct(data?.data);
      })

    fetch("https://think-api-task-2.onrender.com/api/user_admin")
      .then(e => e.json())
      .then((data) => {
        console.log("data?.users_admin", data?.users_admin)
        setUsers(data?.users_admin);
      })

  }, []);
  // const filterProduct = product.filter((subId) => {
  //   return subc?._id == subId?.subcategory;
  // })
  const findUserId = users.find(u => u?.token == user);
  const Addtocart = async (e) => {
    console.log(e);
    try {
      const req = await fetch("https://think-api-task-2.onrender.com/api/postcart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userId: findUserId._id, productId: e._id })
      });
      const res = await req.json();
      if (req.status != 201) {
        toast.error(res.message);
      } else {
        toast.success(res.message);
        setTimeout(() => {
          navigate("/addtocart");
        }, 2000);
      }
    } catch (err) {
      console.error("Internal Server error :", err);
    }
  }

  const ProductDataSendToOrderPage = (productData) => {
    SendProductDataToOrderPage(productData);
    toast.success("Product Page redirect to Order Page!")
    setTimeout(() => {
      navigate("/order");
    }, 2000);
  }
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
          <Link className="text-white" style={{ textDecoration: 'none' }}>Products</Link>
        </Container>
      </Navbar>
      <div className="container">
        <div>
          {
            product.length == 0
              ?
              <div>
                <h4 className="text-center text-danger mt-5">404: Not Found</h4>
                <Link to="/" className="mt-4" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Back To Home Page</Link>
              </div>
              :
              product.map((e) => {
                return <div className="card mt-2 p-2" style={{ boxShadow: '-2px 2px 5px 2px #ccc' }}>
                  <div style={{ display: 'flex' }}>
                    <img src={e?.product_img_url} style={{ height: '10rem', width: '10rem', marginLeft: '5rem' }} />
                    <br />
                  </div><br />
                  <p className="text-center"><b>Product:</b> {e?.p_name}</p>
                  <p className="text-center"><b>Price:</b> ₹ {e?.price}</p>
                  {e?.description != "" ? < p className="text-center"><b>Description:</b> {e?.description}</p> : null}
                  <br />
                  <button onClick={() => ProductDataSendToOrderPage(e)} style={{ background: 'linear-gradient(to right, blue, pink)', border: 'none', padding: '8px', color: '#fff', fontWeight: 'bold' }}>Buy Now</button>
                  <button onClick={() => Addtocart(e)} style={{ background: 'linear-gradient(to right, blue, pink)', border: 'none', padding: '8px', color: '#fff', fontWeight: 'bold' }} className="mt-1">Add To Cart</button>
                </div>
              })
          }
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default AllProductsItems;
