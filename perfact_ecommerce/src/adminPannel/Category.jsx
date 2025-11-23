import { useRef } from "react";
import { Container, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
const Category = () => {
  const nmRef = useRef();
  const desRef = useRef();
  const navigate = useNavigate();
  const ResetForm = ()=>{
    nmRef.current.value = "";
    desRef.current.value = "";
  }
  const HandleCategory = async (e) => {
    e.preventDefault();
    try {
      const request = await fetch("https://think-api-task-2.onrender.com/api/category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          c_name: nmRef.current.value,
          description: desRef.current.value
        })
      });
      const response = await request.json();
      if (request.status == 400) {
        toast.error(response.message);
      } else {
        toast.success(response.message);
        setTimeout(() => {
          navigate("/adminsubcategory");
        }, 2000);
        ResetForm();
      }
    } catch (error) {
      console.error("Internal Server error :", error);
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
          <Link to="/admin" className="text-white" style={{ textDecoration: 'none' }}>Administration Page</Link>
        </Container>
      </Navbar>
      <div className="container">
        <div className="card p-5 mt-5" style={{ boxShadow: '-5px 5px 4px 2px #ccc' }}>
          <form onSubmit={HandleCategory} className="form-group">
            <label style={{ fontWeight: 'bold' }}>Enter CategoryName</label>
            <input type="text" ref={nmRef} className="form-control p-2 fs-5" /><br />
            <label style={{ fontWeight: 'bold' }}>Enter Description</label>
            <textarea type="text" ref={desRef} className="form-control p-2 fs-5" /><br />
            <button type="submit" className="form-control p-2" style={{ background: "linear-gradient(90deg, #1B20AB, #7A5AF8)", fontSize: '18px', fontWeight: 'bold', color: '#fff' }}>Create Category</button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Category;
