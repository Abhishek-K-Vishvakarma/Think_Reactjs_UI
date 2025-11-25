import { Container, Navbar, Modal, Offcanvas } from "react-bootstrap";
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
import { MdArrowDropDown } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import UpdateShippingAddress from "./src/actionComponents/UpdateShippingAddress";
const Home = () => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState(null);
  const [shippshow, setShippShow] = useState(false);
  const { user } = authUser();
  const navigate = useNavigate();
  const [shippdata, setShippData] = useState(null);
  const [up, setUp] = useState();
  const [showmodel, setShowModel] = useState(false);
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
  const putShippData = (ele) => {
    setUp(ele);
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
        fontSize: "16px",
      }}>
        <Container>
          <Link to="/" className="text-white d-flex align-items-center gap-1 text-decoration-none w-25" style={{ fontWeight: 'bold' }}><FaHome />Home</Link>
          <Link onClick={() => setShippShow(true)} className="text-white d-flex align-items-center text-decoration-none" style={{ fontWeight: 'bold' }}><MdArrowDropDown className="fs-2" /> Dear</Link>
          <Link to="/addtocart" className="text-white d-flex align-items-center text-decoration-none" style={{ fontWeight: 'bold' }}>Cart</Link>
          <button className="text-white d-flex align-items-center text-decoration-none" onClick={() => setShow(true)} style={{ background: "none", border: "none", color: "white", fontWeight: 'bold' }}>
            <BiUser className="fs-3" /> Profile
          </button>
        </Container>
      </Navbar>
      <Carousel className="d-flex align-items-center justify-content-center m-auto">
        <Carousel.Item interval={1000}>
          <img src="https://www.cloudways.com/blog/wp-content/uploads/ecommerce-website-checklist-b-.jpg" style={{ width: '100%', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', height: '36rem' }} />
        </Carousel.Item>
        <Carousel.Item interval={2000}>
          <img src="https://mediamindtechnology.com/wp-content/uploads/2023/05/Best-Practices-For-eCommerce-Website-Design.png" style={{ backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', width: '100%', height: '36rem' }} />
        </Carousel.Item>
        <Carousel.Item interval={3000}>
          <img src="https://colorlib.com/wp/wp-content/uploads/sites/2/free-bootstrap-ecommerce-templates.png.webp" style={{ width: '100%', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', height: '36rem' }} />
        </Carousel.Item>
      </Carousel>
      <Offcanvas placement="top" style={{background: 'none', border: 'none'}} show={showmodel}>
        {showmodel && <UpdateShippingAddress data={up} setShowModel={setShowModel}/>}
      </Offcanvas>
      <Modal className="modal modal-blur fade" show={show}>
        <button onClick={() => setShow(false)} className="mt-2" style={{ background: "none", border: "none", }}><CloseButton /></button>
        <br />
        <div className="card">
          <p className="text-center fs-1" ><FaUserShield /></p>
          <p className="text-center">Name: {data?.name} {data == null ? <Spinner variant="danger" animation="grow" style={{ width: '15px', height: '15px' }} /> : <Spinner variant="success" animation="grow" style={{ width: '15px', height: '15px' }} />}</p>
          <p className="text-center">Email: {data?.email}</p>
          <p className="text-center">Role: <b className="text-success">{shippdata?.role}</b></p>
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
      </Modal>
      <Modal show={shippshow}>
        <div className="d-flex">
          <button className="btn-close mt-2 ms-2" onClick={() => setShippShow(false)}></button>
          <button className="ms-auto ms-3" onMouseOver={() => setShowModel(true)} style={{ border: 'none', background: 'none', textDecoration: 'none' }} onClick={() => putShippData(shippdata)}>
            <button className="mt-2 ms-2" style={{ border: 'none', boxShadow: '-2px 2px 4px 1px #ccc', textDecoration: 'none' }} onClick={() => setShippShow(false)}>Edit <FaUserEdit /></button>
          </button>
        </div>
        <h3 className="text-center mt-2">Customer ShippingAddress Details</h3>
        <hr />
        <div className="p-4">
          <p><b>FullName:</b> {shippdata?.fullName}</p>
          <p><b>Contact:</b> {shippdata?.contactNumber}</p>
          <p><b>Street:</b> {shippdata?.street}</p>
          <p><b>LandMark:</b> {shippdata?.landMark}</p>
          <p><b>City:</b> {shippdata?.city}</p>
          <p><b>PostalCode:</b> {shippdata?.postalCode}</p>
          <p><b>Country:</b> {shippdata?.country}</p>
          <p className="d-flex"><b>Role:</b> &nbsp;<p className="text-success" style={{ fontWeight: 'bold' }}>{shippdata?.role}</p></p>
        </div>
      </Modal>
      <UserSubcategory />
      <ToastContainer />
    </div>
  );
};
export default Home;
