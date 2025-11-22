import { useRef, useState } from "react"
import { Container, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { authUser } from "../authentication/Authentication";
import Spinner from 'react-bootstrap/Spinner';

const SignIn = () => {
  const { User } = authUser();
  const emRef = useState();
  const passRef = useRef();
  const navigate = useNavigate();
  const [spin, setSpin] = useState(false);
  const ResetForm = () => {
    emRef.current.value = "";
    passRef.current.value = "";
  }
  const HandlePostSignup = async (e) => {
    e.preventDefault();
    try {
      const request = await fetch("https://think-api-task-2.onrender.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: emRef.current.value,
          password: passRef.current.value
        })
      });
      const response = await request.json();
      User(response?.data?.token);
      console.log(response);
      if (request.status == 400) {
        toast.error(response.message);
        setSpin(false);
      } else {
        toast.success(response.message);
        if (response?.data?.role == "User") {
          setSpin(true);
          setTimeout(() => {
            setSpin(false);
            navigate("/");
          }, 2000);
        } else {
          setSpin(true);
          setTimeout(() => {
            navigate("/admin");
            setSpin(false);
          }, 2000);
        }
      }
      ResetForm();
    } catch (error) {
      console.error("Internal Server :", error);
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
        fontSize: "20px",
      }}>
        <Container>
          <Link to="/" className="text-white" style={{ textDecoration: 'none' }}>Home Page</Link>
        </Container>
      </Navbar>
      <form onSubmit={HandlePostSignup} className="container form-group mt-5 w-75 py-5" style={{ padding: '20px', boxShadow: '0px 0px 5px 5px #ccc', borderRadius: '20px'}}>
        <p className="text-center" style={{ fontWeight: 'bold', color: 'blue' }}>Sign In Page</p>
        <br />
        <label>Enter Email</label>
        <input type="text" ref={emRef} className="form-control" style={{ border: 'none', outline: 'none'}} />
        <div style={{height: '2px', color: 'blue', width: '100%', backgroundColor: 'red'}}></div><br />
        <label >Enter Password</label>
        <input type="password" ref={passRef} className="form-control" style={{ border: 'none', outline: 'none' }} />
        <div style={{ height: '2px', color: 'blue', width: '100%', backgroundColor: 'red' }}></div><br /><br/>
        <button type="submit" className="form-control" style={{ background: 'linear-gradient(to left, pink, red)', color: 'white', fontWeight: 'bold' }}>Sign In</button>
        {spin == true ? <Spinner animation="border" variant="dark" className="text-center" style={{ margin: 'auto' }} /> : null}
        <br/>
        <p style={{fontSize: '12px', fontWeight: 'bold'}}>Use this for (Create Account) <Link to="/signup" style={{ textDecoration: 'none' }}>Sign up</Link></p>
      </form>
      <ToastContainer />
    </div>
  )
}

export default SignIn;
