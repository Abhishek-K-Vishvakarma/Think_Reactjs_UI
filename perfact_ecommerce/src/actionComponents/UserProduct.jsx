import { useEffect, useState } from "react";
import { authUser } from "../authentication/Authentication";
import { Container, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
const UserProduct = () => {
  const [product, setProduct] = useState([]);
  const [users, setUsers] = useState([]);
  const { subc } = authUser();
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
  const filterProduct = product.filter((subId) => {
    return subc?._id == subId?.subcategory;
  })
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
    setTimeout(()=>{
      navigate("/order");
    },2000);
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
        </Container>
      </Navbar>
      <div className="container gap-1">
        {
          filterProduct.map((product) => {
            return <>
              <div className="card py-5 px-5 mt-5" style={{ boxShadow: '-3px 2px 4px 2px #ccc', border: '1px solid blue' }}>
                <img src={product?.product_img_url} style={{ width: '12rem', height: '12rem' }} />
                <p className="mt-1"><b>Product:</b> {product.p_name}</p>
                <p><b>price:</b> {product.price}</p>
                <p><b>Description:</b> {product.description}</p>
                <div className="row align-items-center justify-content-center">
                  <div className="col-md-6">
                    <button onClick={() => ProductDataSendToOrderPage(product)} className="w-100 p-2 mt-1" style={{ background: 'linear-gradient(to left, blue, lightpink)', color: 'white', fontWeight: 'bold', border: 'none' }}>Buy Now</button>
                  </div>
                  <div className="col-md-6">
                    <button onClick={() => Addtocart(product)} className="w-100 p-2 mt-1" style={{ background: 'linear-gradient(to left, blue, lightpink)', color: 'white', fontWeight: 'bold', border: 'none' }}>Add to cart</button>
                  </div>
                </div>
              </div>
            </>
          })
        }
      </div>
      <ToastContainer />
    </div>
  )
}

export default UserProduct;
