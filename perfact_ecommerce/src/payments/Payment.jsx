import { Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { paymentParentCss } from "../styles/PaymentStyle";
const PaymentSuccess = () => {
  function payNow() {

    // Normally FROM BACKEND
    const backendOrder = {
      order_id: "order_Rg78EZSPVBxxTA", // real order_id
      amount: 1200                      // rupees
    };

    const options = {
      key: "rzp_test_RfKW91aqmT1BaO",
      amount: backendOrder.amount * 100,
      currency: "INR",
      name: "Test Payment",
      description: "React Razorpay Test",
      order_id: backendOrder.order_id,

      handler: function (response) {
        console.log("Payment success:", response);

        fetch("https://think-api-task-2.onrender.com/api/payverify", {   // <-- YOUR BACKEND URL
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
            alert(data.message);
          });
      },

      theme: { color: "#3399cc" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
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
        fontSize: "28px",
      }}>
        <Container>
          <Link to="/" className="text-white" style={{ textDecoration: 'none' }}>Home Page</Link>
        </Container>
      </Navbar>
      <br/>
      <div className="container card text-center" style={paymentParentCss}>
        <div>
          <p style={{ width: '20px', height: '20px', background: 'black', borderRadius: '100px', marginTop: '0px' }}></p>
          <p style={{ fontWeight: 'bold', padding: '5px', color: 'blue' }}>Payment Gateway</p>
          <button onClick={payNow} style={{ marginTop: '35rem', background: 'blue', fontWeight: 'bold', borderRadius: '20px', padding: '8px', color: 'white', border: 'none', width: '100%' }}>Pay Now</button>
        </div>
      </div>
    </div>
  )
}

export default PaymentSuccess;
