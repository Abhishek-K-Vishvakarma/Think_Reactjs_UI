import { Navbar, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { authUser } from "../authentication/Authentication";
import { ToastContainer, toast } from "react-toastify";
const OrderPayment = () => {
  const { order, product, PaymentComplete } = authUser();
  const navigate = useNavigate();
  const HandleOrderPayment = async()=>{
    try{
      const request = await fetch("https://think-api-task-2.onrender.com/api/payorder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userId: order?.order?.user, orderId: order?.order?._id, amount: order?.order?.items[0]?.totalPrice })
      });
      const response = await request.json();
      PaymentComplete(response);
      if(request.ok == false){
        toast.error(response.message);
      }else{
        toast.success(response.message);
        setTimeout(()=>{
         navigate("/payment");
        }, 2000);
      }
      console.log(response);
    }catch(error){
      console.error("Internal Server error :", error);
    }
  }
  console.log(product);
  console.log(order?.order?.items[0])
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
      <br/>
      <div className="container">
        <div className="card p-5" style={{boxShadow: '-2px 2px 5px 2px #ccc'}}>
          <h4 className="text-center d-inline-block m-auto">Payment Gateway Under &nbsp; <p className="text-danger mt-2">Process...</p></h4>
        </div>
        <br/>
        <div className="card p-5" style={{ boxShadow: '-2px 2px 5px 2px #ccc' }}>
          <h4>User Details</h4>
          <p><b></b></p>
          <p><b>FullName:</b> {order?.order?.ShippingAddress?.fullName}</p>
          <p><b>Contact:</b> +91 {order?.order?.ShippingAddress?.contactNumber}</p>
          <p><b>Street:</b> {order?.order?.ShippingAddress?.street}</p>
          <p><b>LandMark:</b> {order?.order?.ShippingAddress?.landMark}</p>
          <p><b>ZipCode:</b> {order?.order?.ShippingAddress?.zipCode}</p>
          <p><b>State:</b> {order?.order?.ShippingAddress?.state}</p>
          <p><b>Country:</b> {order?.order?.ShippingAddress?.country}</p>
          <p className="d-flex"><b>Role:</b> <p className="text-success fw-bold d-flex ms-1">{order?.order?.ShippingAddress?.role}</p></p>
        </div>
        <br/>
        <div className="card p-5" style={{ boxShadow: '-2px 2px 5px 2px #ccc' }}>
         <h4>Product Details</h4>
          <p><b>Product:</b> {product?.p_name}</p>
          <p><b>Price:</b> ₹ {order?.order?.items[0].price}</p>
          <p><b>Quantity:</b> {order?.order?.items[0].quantity}</p>
          <p><b>TotalAmount:</b> ₹ {order?.order?.items[0].totalPrice}</p>
        </div>
        <br/>
        <div className="card p-1">
          <button className="btn fw-bold" onClick={HandleOrderPayment} style={{background: 'linear-gradient(to right, blue, pink)', color: 'white'}}>Payment Process</button>
        </div>
      </div>
      <br/>
      <ToastContainer/>
    </div>
  )
}

export default OrderPayment;
