import { Container, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify";
import { authUser } from "../authentication/Authentication";
import Spinner from 'react-bootstrap/Spinner';
import { useState } from "react";

const UserLogout = () => {
  const navigate = useNavigate();
  const { user } = authUser();
  const [spin, setSpin] = useState(false);
  const HandleUserLogout = async () => {
    if (!window.confirm("Are you sure, Logout! -> Ok / Cancel => [ok - Logout || cancel - Cancel Logout]")) {
      localStorage.removeItem("user");
      return;
    }
    const request = await fetch("https://think-api-task-2.onrender.com/api/logout", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${ user }`,
      },
      credentials: "include"
    });
    const response = await request.json();
    console.log(request, response);
    if (request.status == 200) {
      toast.success(response.message);
      setSpin(true);
      setTimeout(() => {
        navigate("/signin");
        setSpin(false);
      }, 2000);
    } else {
      toast.error(response.message);
    }
    if (request.status == 403) {
      navigate("/signin");
    }
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
      <div className="container">
        <div className="card mt-5 p-5" style={{ boxShadow: '-5px 5px 4px 2px #ccc' }}>
          <p className="text-center mt-5" style={{ fontWeight: 'bold' }}>You want to Logout our Website, Please click below button</p>
          <button onClick={HandleUserLogout} style={{ marginTop: '14rem', background: 'blue', fontWeight: 'bold', borderRadius: '20px', padding: '8px', color: 'white', border: 'none', overflow: 'hidden' }}>Logout Website</button>
          <br/>
          {spin == true ? <Spinner animation="border" variant="dark" className="text-center" style={{margin: 'auto'}}/> : null}
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default UserLogout;
