import { Container, Navbar, Modal } from "react-bootstrap";
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
import Carousel from 'react-bootstrap/Carousel';
const Home = () => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState(null);
  const { user } = authUser();
  const navigate = useNavigate();
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
        textAlign: "center",
        color: "white",
        boxShadow: "0px 4px 12px rgba(0,0,0,0.3)",
        margin: 0,
        letterSpacing: "1px",
        fontSize: "16px",
      }}>
        <Container>
          <Link to="/" className="text-white d-flex align-items-center gap-1 text-decoration-none"><FaHome /> Home Page</Link>
          <Link to="/addtocart" className="text-white d-flex align-items-center gap-1 text-decoration-none">Add To Page</Link>
          <button onClick={() => setShow(true)} style={{ background: "none", border: "none", color: "white" }}>
            <BiUser /> Profile
          </button>
        </Container>
      </Navbar>
      <Carousel className="d-flex align-items-center justify-content-center m-auto mt-5">
        <Carousel.Item interval={1000}>
          <img src="https://www.cloudways.com/blog/wp-content/uploads/ecommerce-website-checklist-b-.jpg" style={{ width: '100%', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', height: '36rem' }}/>
        </Carousel.Item>
        <Carousel.Item interval={2000}>
          <img src="https://mediamindtechnology.com/wp-content/uploads/2023/05/Best-Practices-For-eCommerce-Website-Design.png" style={{ backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', width: '100%', height: '36rem'}} />
        </Carousel.Item>
        <Carousel.Item interval={3000}>
          <img src="https://colorlib.com/wp/wp-content/uploads/sites/2/free-bootstrap-ecommerce-templates.png.webp" style={{ width: '100%', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', height: '36rem'}} />
        </Carousel.Item>
      </Carousel>
      <Modal className="modal modal-blur fade" show={show}>
        <button onClick={() => setShow(false)} className="mt-2" style={{ background: "none", border: "none",}}><CloseButton/></button>
        <br/>
        <div className="card">
          <p className="text-center fs-1" ><FaUserShield /></p>
          <p className="text-center">Name: {data?.name} {data == null ? <Spinner variant="danger" animation="grow" style={{ width: '15px', height: '15px' }} /> : <Spinner variant="success" animation="grow" style={{ width: '15px', height: '15px' }} />}</p>
          <p className="text-center">Email: {data?.email}</p>
          <p className="text-center">Role: <b className="text-success">{data?.role}</b></p>
        </div>
        <br />
        <Accordion defaultActiveKey={0}>
          <Accordion.Item eventKey={0}>
            <Accordion.Header>Settings</Accordion.Header>
            <Accordion.Body>
              <Link to="/ulogout">Logout</Link>
            </Accordion.Body>
          </Accordion.Item>g
        </Accordion>
      </Modal>
      <UserSubcategory />
      <ToastContainer />
    </div>
  );
};

export default Home;
