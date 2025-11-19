import { useRef, useState } from "react"
import { Container, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
const SignUp = () => {
  const nmRef = useRef();
  const emRef = useState();
  const passRef = useRef();
  const navigate = useNavigate();
  const ResetForm = ()=>{
    nmRef.current.value = "";
    emRef.current.value = "";
    passRef.current.value = "";
  }
  const HandlePostSignup = async(e)=>{
    e.preventDefault();
    try{
      const request = await fetch("http://localhost:5002/api/signup",{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: nmRef.current.value,
          email: emRef.current.value,
          password: passRef.current.value
        })
      });
      const response = await request.json();
      if(request.status == 400){
        toast.error(response.message);
      }else{
        toast.success(response.message);
        navigate("/signin");
      };
      ResetForm();
    }catch(error){
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
        fontSize: "28px",
      }}>
        <Container>
          <Link to="/" className="text-white" style={{textDecoration: 'none'}}>Home Page</Link>
        </Container>
      </Navbar>
      <form onSubmit={HandlePostSignup} className="container card form-group mt-5" style={{
        height: '47rem', width: '25rem', boxShadow: '-6px 5px 5px 1px blue', borderRadius: '30px' }}>
        <p style={{ width: '20px', height: '20px', background: 'black', borderRadius: '100px', marginTop: '10px' }}></p>
        <p className="text-center" style={{fontWeight: 'bold', color: 'blue'}}>Sign Up Page</p>
        <br/><br/>
        <label>Enter FullName</label>
        <input type="text" ref={nmRef} className="form-control" style={{boxShadow: '0px 4px inset', padding: '12px'}}/><br/>
        <label>Enter Email</label>
        <input type="text" ref={emRef} className="form-control" style={{ boxShadow: '0px 4px inset', padding: '12px' }} /><br/>
        <label>Enter Password</label>
        <input type="password" ref={passRef} className="form-control" style={{ boxShadow: '0px 4px inset', padding: '12px' }} /><br/>
        <button type="submit" className="form-control" style={{ marginTop: '16rem', background: 'blue', fontWeight: 'bold', borderRadius: '20px', padding: '8px', color: 'white', border: 'none', overflow: 'hidden'}}>Sign Up</button>
      </form>
      <ToastContainer/>
    </div>
  )
}

export default SignUp;
