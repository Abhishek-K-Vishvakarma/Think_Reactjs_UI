import { useEffect, useRef, useState } from "react";
import { Container, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { authUser } from "../authentication/Authentication";
const CustomerShippingAddress = () => {
  const { user } = authUser();
  const fullNameRef = useRef();
  const contactNumberRef = useRef();
  const streetRef = useRef();
  const landMarkRef = useRef();
  const cityRef = useRef();
  const stateRef = useRef();
  const postalCodeRef = useRef();
  const countryRef = useRef();
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  const HandleShipping = async (e) => {
    e.preventDefault();
    const shippingAddress = {
      userId: data?._id,
      fullName: fullNameRef.current.value,
      contactNumber: contactNumberRef.current.value * 1,
      street: streetRef.current.value,
      landMark: landMarkRef.current.value,
      city: cityRef.current.value,
      state: stateRef.current.value,
      postalCode: postalCodeRef.current.value,
      country: countryRef.current.value
    }
    try {
      const request = await fetch("http://localhost:5002/api/shippingAddress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(shippingAddress)
      });
      const response = await request.json();
      if (request.status == 400) {
        toast.error(response.message);
      } else if (request.status == 500){
        toast.error(response.message);
      }else{
        toast.success(response.message);
        navigate("/");
      }
      console.log("request :", request, response);
    } catch (err) {
      console.error("Internal Server error :", err);
    }
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
        console.log(result);
        
      } catch (err) {
        toast.error("Internal Server Error", err);
      }
    };

    Profile();
  }, [user]);
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
          <Link to="/" className="text-white" style={{ textDecoration: 'none', fontSize: '18px', width: '10rem' }}>Home Page</Link>
          <Link className="text-white" style={{ textDecoration: 'none', fontSize: '12px' }}>Create Shipping Address Credentials for Our Won</Link>
        </Container>
      </Navbar>
      <div>
        <div className="container mt-5">
          <form onSubmit={HandleShipping}>
            <div className="w-100 m-auto">
              <div className="row">
                <div className="col-6">
                  <label>Enter FullName</label>
                  <input type="text" ref={fullNameRef} className="form-control" />
                  <p style={{ background: 'red', height: '2px', width: '100%' }}></p>
                  <br />
                </div>
                <div className="col-6">
                  <label>Enter Contact</label>
                  <input type="number" ref={contactNumberRef} className="form-control" />
                  <p style={{ background: 'red', height: '2px', width: '100%' }}></p>
                  <br />
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <label>Enter Street</label>
                  <input type="text" ref={streetRef} className="form-control" />
                  <p style={{ background: 'red', height: '2px', width: '100%' }}></p>
                  <br />
                </div>
                <div className="col-6">
                  <label>Enter LandMark</label>
                  <input type="text" ref={landMarkRef} className="form-control" />
                  <p style={{ background: 'red', height: '2px', width: '100%' }}></p>
                  <br />
                </div>
              </div>

              <div className="row">
                <div className="col-6">
                  <label>Enter City</label>
                  <input type="text" ref={cityRef} className="form-control" />
                  <p style={{ background: 'red', height: '2px', width: '100%' }}></p>
                  <br />
                </div>
                <div className="col-6">
                  <label>Enter State</label>
                  <input type="text" ref={stateRef} className="form-control" />
                  <p style={{ background: 'red', height: '2px', width: '100%' }}></p>
                </div>
              </div>

              <div className="row">
                <div className="col-6">
                  <label>Enter PostalCode</label>
                  <input type="text" ref={postalCodeRef} className="form-control" />
                  <p style={{ background: 'red', height: '2px', width: '100%' }}></p>
                  <br />
                </div>
                <div className="col-6">
                  <label>Enter Country</label>
                  <input type="text" ref={countryRef} className="form-control" />
                  <p style={{ background: 'red', height: '2px', width: '100%' }}></p>
                </div>
              </div>
            </div>
            <button type="submit" style={{ background: 'linear-gradient(to right, red, pink)', color: 'white', border: 'none', padding: '5px 10px', margin: 'auto', fontWeight: 'bold', display: 'flex' }}>Shipping Address Create</button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default CustomerShippingAddress;
