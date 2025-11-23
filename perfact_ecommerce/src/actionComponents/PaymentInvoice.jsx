import { Container, Navbar } from "react-bootstrap";
import { authUser } from "../authentication/Authentication";
import { Link } from "react-router-dom";

const PaymentInvoice = () => {
  const { order, paycomplete } = authUser();
  console.log(paycomplete)
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
          <Link to="/" className="text-white" style={{ textDecoration: 'none' }}>Home Page</Link>
        </Container>
      </Navbar>
      <br/>
      <div className="container">
        <div className="card p-5">
          <p><b>Payment OrderID:</b> {paycomplete?.payment?.razorpay_order_id}</p>
          <p><b>CustomerID:</b> {paycomplete?.payment?.user}</p>
          <p><b>Payment Amount:</b> {paycomplete?.payment?.amount}</p>
          <p><b>Payment Currency:</b> {paycomplete?.payment?.currency}</p>
          <p><b>Payment Status:</b> {paycomplete?.payment?.status}</p>
          <button className="fw-bold text-white" onClick={() => {
            window.open(`https://think-api-task-2.onrender.com/api/invoice/${ order?.order?._id }`);
          }} style={{width: '15rem', background: 'linear-gradient(to right, blue, pink)', border: 'none', padding: '2px'}}>
            Download Invoice PDF
          </button>
        </div>
      </div>
    </div>
  )
}
export default PaymentInvoice;
