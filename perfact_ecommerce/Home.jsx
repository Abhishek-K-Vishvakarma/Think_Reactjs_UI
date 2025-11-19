import { Container, Navbar, Offcanvas } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import UserSubcategory from "./src/actionComponents/UserSubcategory";
import { useState, useEffect } from "react";
import { Accordion } from "react-bootstrap";
import { BiUser } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import { authUser } from "./src/authentication/Authentication";
import Spinner from 'react-bootstrap/Spinner';
import { FaUserShield } from "react-icons/fa";
import CloseButton from 'react-bootstrap/CloseButton';
const Home = () => {
  const [show, setShow] = useState(false);
  const { user } = authUser();
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const Profile = async () => {
      if (!user) return;  // ❗ user null hai to API mat call karo

      try {
        const response = await fetch("http://localhost:5002/api/profile", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${ user }`,
          },
          credentials: "include"
        });

        const result = await response.json();
        console.log(result)
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
 

  return (
    <div>
      <Navbar style={{
        background: "linear-gradient(90deg, #1B20AB, #7A5AF8)",
        padding: "10px",
        color: "white",
      }}>
        <Container>
          <Link to="/" className="text-white d-flex align-items-center gap-2"><FaHome /> Home Page</Link>
          <button onClick={() => setShow(true)} style={{ background: "none", border: "none", color: "white" }}>
            <BiUser /> Profile
          </button>
        </Container>
      </Navbar>

      <Offcanvas show={show} placement="end"className="d-flex" style={{height: '30rem', boxShadow: '-2px 2px 3px 2px #ccc'}}>
        <button onClick={() => setShow(false)} className="mt-2" style={{ background: "none", border: "none", marginRight: '350px'}}><CloseButton/></button>
        <br/>
        <div className="card">
          <p className="text-center fs-1" ><FaUserShield /></p>
          <p className="text-center">Name: {data?.name} <Spinner variant="success" animation="grow" style={{width: '15px', height: '15px', marginTop: '-10px', position: 'absolute'}}/></p>
          <p className="text-center">Email: {data?.email}</p>
        </div>
        <br />
        <Accordion defaultActiveKey={0}>
          <Accordion.Item eventKey={0}>
            <Accordion.Header>Settings</Accordion.Header>
            <Accordion.Body>
              <Link to="/ulogout">Logout</Link>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Offcanvas>
      <UserSubcategory />
      <ToastContainer />
    </div>
  );
};

export default Home;
