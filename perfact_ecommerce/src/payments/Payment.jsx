import { Container, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { authUser } from "../authentication/Authentication";

const PaymentSuccess = () => {
  const { paycomplete, order } = authUser();
  const navigate = useNavigate();
  console.log(paycomplete?.payment);
  function payNow() {
    // Normally FROM BACKEND
    const backendOrder = {
      order_id: paycomplete?.payment?.razorpay_order_id, // real order_id
      amount: 1200                      // rupees
    };
    const options = {
      key: "rzp_test_RfKW91aqmT1BaO",
      amount: backendOrder.amount * 100,
      currency: "INR",
      name: order?.order?.ShippingAddress?.fullName,
      description: "React Razorpay Test",
      order_id: backendOrder.order_id,

      handler: function (response) {
        console.log("Payment success:", response);

        fetch("https://think-api-task-2.onrender.com/api/payverify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("Verify result:", data);
            navigate("/invoice");
            alert(data.message);
          });
      },

      theme: { color: "#3399cc" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  }
  const isoString = "2025-11-23T11:22:27.286Z";

  const date = new Date(isoString);

  // Convert to IST string
  const indianTime = date.toLocaleTimeString("en-IN", {
    hour12: false,      // 24-hour format
    timeZone: "Asia/Kolkata"
  });

  console.log(indianTime); 

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
        fontSize: "20px",
      }}>
        <Container>
          <Link to="/" className="text-white" style={{ textDecoration: 'none'}}>Home Page</Link>
        </Container>
      </Navbar>
      <br/>
      <div className="container">
        <div className="card p-5" style={{boxShadow: '-2px 2px 5px 2px #ccc'}}>
          <h4 className="text-center">Product Details in Payment Gateway...</h4>
          <br/>
          <p><b>Created At: Date:</b> {paycomplete?.payment?.createdAt.slice(0, 10)} <b>Time:</b> {indianTime}</p>
          <p><b>Pay Amount:</b> ₹ {paycomplete?.payment?.amount}</p>
          <p><b>Currency:</b> {paycomplete?.payment?.currency}</p>
          <p><b>OrderID:</b> {paycomplete?.payment?.razorpay_order_id}</p>
          <p><b>Order Status:</b> {paycomplete?.payment?.status}</p>
          <p className="card p-2 align-items-center justify-content-center"><b>Payment Method</b> <p style={{textShadow: '-1px 1px blue', color: 'red'}}>Razorpay</p></p>
        </div><br/>
        <div className="card text-center p-5" style={{ boxShadow: '-2px 2px 5px 2px #ccc' }}>
          <div>
            <p style={{ fontWeight: 'bold', padding: '5px', color: 'blue' }}>Payment Gateway Completion Process...</p>
            <button onClick={payNow} style={{ background: 'linear-gradient(to right, blue, pink)', border: 'none', padding: '5px 20px', color: '#fff', fontWeight: 'bold' }}>Pay Now</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentSuccess;
