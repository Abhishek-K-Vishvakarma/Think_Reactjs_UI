import { useEffect, useState } from "react";
import { authUser } from "../authentication/Authentication";
import { Container, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { SlBadge } from "react-icons/sl";
import { ToastContainer, toast } from "react-toastify";
const UserProductOrder = () => {
  const { product, user } = authUser();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [shippdata, setShippData] = useState(false);
  const [qty, setQty] = useState(1);
  console.log("Product :", product);
  console.log("Shipping data :", shippdata)
  const HandleOrder = async (e) => {
    e.preventDefault();
    const orderObject = {
      userId: shippdata?.user,
      items: [{ product: product?._id, name: product?.p_name, quantity: parseInt(qty), price: parseInt(product?.price), totalAmount: parseInt(product?.price * qty) }],
      ShippingAddress: {
        fullName: shippdata?.fullName,
        landMark: shippdata?.landMark,
        street: shippdata?.street,
        contactNumber: shippdata?.contactNumber,
        city: shippdata?.city,
        state: shippdata?.state,
        postalCode: shippdata?.postalCode,
        country: shippdata?.country
      }
    }
    try {
      const request = await fetch("https://think-api-task-2.onrender.com/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(orderObject)
      });
      const response = await request.json();
      console.log(request, response)
      if (request.ok == false) {
        toast.error(response.message);
      } else {
        toast.success(response.message);
      }
    } catch (err) {
      console.error("Internal Server error :", err);
    }
  }
  let array = []
  for (let i = 1; i < product?.p_qty; i++) {
    array.push(i);
  }
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
        if (result.status_code === 403) {
          toast.error("Session expired, Please Signin now");
          setTimeout(() => navigate("/signin"), 900);
          return;
        }
        setData(result?.users?.user);
      } catch (err) {
        toast.error("Internal Server Error", err);
      }
    };

    Profile();
  }, [user]);

  useEffect(() => {
    if (!data?._id) return;
    fetch(`https://think-api-task-2.onrender.com/api/shipping/${ data._id }`)
      .then(res => res.json())
      .then((result) => {
        console.log(result);
        setShippData(result?.data);
        if (result?.status === false) {
          navigate("/shipping");
        }
      });
  }, [data]);

  const d = new Date();
  const y = d.getFullYear();
  const m = d.getMonth();
  const ds = d.getDate();
  const date = `${ ds }-${ m }-${ y }`;
  console.log(qty);
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
      <div className="container">
        <br />
        <h3 className="text-center">Product Place Order Page</h3>
        <br />
        <div className="card p-1 w-75" style={{ boxShadow: '-3px 3px 5px 2px #ccc', background: 'orange', margin: 'auto' }}>
          <div className="card">
            <br />
            <div className="d-flex text-success">
              <p className="ms-1 text-dark">Customer Details</p>
              <p className="ms-5 ms-auto">Order Date: {date}</p>
              <SlBadge className="text-warning me-2 fs-1" />
            </div>
            <p style={{ background: 'orange', height: '2px', width: '100%' }}></p>
            <div className="card p-5 w-100 ms-auto border-0">
              <div className="row">
                <div className="col-3 w-100" style={{ display: 'inline-block' }}>
                  <p><b>FullName:</b> {shippdata?.fullName}</p>
                  <p><b>Contact:</b> {shippdata?.contactNumber}</p>
                </div>
                <div className="col-3 w-100" style={{ display: 'inline-block' }}>
                  <p><b>Street:</b> {shippdata?.street}</p>
                  <p><b>LandMark:</b> {shippdata?.landMark}</p>
                </div>
                <div className="col-3 w-100">
                  <p><b>City:</b> {shippdata?.city}</p>
                  <p><b>PostalCode:</b> {shippdata?.postalCode}</p>
                </div>
                <div className="col-3 w-100">
                  <p><b>Country:</b> {shippdata?.country}</p>
                  <p><b>Role:</b> {shippdata?.role}</p>
                </div>
              </div>
              <p style={{ background: 'orange', height: '2px', width: '100%' }}></p>
              <p className="ms-auto" style={{ background: '#E43A36', color: 'white', fontWeight: 'bold', padding: '2px 10px', fontSize: '12px' }}>Limited Time Deal</p>
              <img src={product?.product_img_url} style={{ width: '10rem', height: '12rem', boxShadow: '0px 0px 5px 2px #ccc' }} />
              <p className="mt-2 d-inline-block m5-4"><b>Product Name:</b>&nbsp;{product?.p_name}</p>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <p><strong>Price : ₹</strong> {product?.price}</p>&nbsp;&nbsp;&nbsp;
                <div style={{ borderRadius: '20px', width: '10rem', border: '2px solid orange', display: 'flex', padding: '5px' }}>
                  <button className="m-auto border-warning">-</button>&nbsp;&nbsp;
                  <select value={qty} onChange={(e) => setQty(e.target.value)}>
                    {
                      array.map((ele) => {
                        return <>
                          <option>{ele}</option>
                        </>
                      })
                    }
                  </select>&nbsp;&nbsp;
                  <button className="m-auto border-warning">+</button>
                </div>
              </div>
              <p className="mt-1"><b>Description:</b> {product?.description}</p>
              <h4 className="ms-auto">Total: ₹ {parseInt(product?.price * qty)}</h4>
              <p style={{ background: 'orange', height: '2px', width: '100%' }}></p>
              <button onClick={HandleOrder} className="btn ms-auto" style={{ background: 'orange', color: 'white', fontWeight: 'bold', boxShadow: '0px 0px 5px 1px #ccc' }}>Proceed To Pay</button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default UserProductOrder;
