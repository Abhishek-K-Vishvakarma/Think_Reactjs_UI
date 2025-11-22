import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { SiDatabricks } from "react-icons/si";
import { AiOutlineProduct } from "react-icons/ai";
import { BiCart } from "react-icons/bi";
import { FaUserTie } from "react-icons/fa";
import { Accordion, Offcanvas } from "react-bootstrap";
// import { SiStackhawk } from "react-icons/si";
import { BsDatabaseAdd } from "react-icons/bs";
import { BsDatabaseDash } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { authUser } from "../authentication/Authentication";
import { ToastContainer, toast } from "react-toastify";
const Administration = () => {
  const [users, setUsers] = useState("");
  const [categories, setCategories] = useState("");
  const [subcategories, setSubCategories] = useState("");
  const [products, setProducts] = useState("");
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleFalse = () => setShow(false);

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
      } catch (err) {
        toast.error("Internal Server Error", err);
      }
    };

    Profile();
  }, [user]);

  useEffect(() => {
    fetch("https://think-api-task-2.onrender.com/api/getuserscount")
      .then(e => e.json())
      .then((data) => {
        console.log(data);
        setUsers(data?.users);
      });
  }, []);
  useEffect(() => {
    fetch("https://think-api-task-2.onrender.com/api/getcategoriescount")
      .then(e => e.json())
      .then((data) => {
        console.log(data);
        setCategories(data?.categories);
      });
  }, []);

  useEffect(() => {
    fetch("https://think-api-task-2.onrender.com/api/getsubcategoriescount")
      .then(e => e.json())
      .then((data) => {
        console.log(data);
        setSubCategories(data?.subcategories);
      });
  }, []);

  useEffect(() => {
    fetch("https://think-api-task-2.onrender.com/api/getproductscount")
      .then(e => e.json())
      .then((data) => {
        console.log(data);
        setProducts(data?.products);
      });
  }, []);
  return (
    <div style={{ fontFamily: "sans-serif", minHeight: "100vh" }}>
      {/* <p><SiStackhawk /></p> */}
      <p style={{
        background: "linear-gradient(90deg, #1B20AB, #7A5AF8)",
        padding: "10px",
        textAlign: "center",
        color: "white",
        boxShadow: "0px 4px 12px rgba(0,0,0,0.3)",
        margin: 0, letterSpacing: "1px", fontSize: "20px",
        width: '100%'
      }}>⚙️ Administration Dashboard</p>
      <button onClick={handleShow} style={{ background: 'none', border: 'none', display: 'inline', fontWeight: 'bold' }}><BsDatabaseAdd /> <p>SidePannel</p></button>
      <Offcanvas show={show} style={{ width: '16rem', minHeight: '100vh', position: 'absolute' }}>
        <button onClick={handleFalse} style={{ background: 'none', border: 'none', fontWeight: 'bold' }}><BsDatabaseDash /> <p>Close SidePannel</p></button>
        <hr />
        <Accordion defaultActiveKey={0}>
          <Accordion.Item eventKey={0}>
            <Accordion.Header>Category</Accordion.Header>
            <Accordion.Body>
              <Link to="/admincategory" style={{ textDecoration: 'none' }}>Category</Link><br/><br/>
              <Link to="/getadmincategory" style={{ textDecoration: 'none' }}>GetCategory</Link>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey={2}>
            <Accordion.Header>Subcategory</Accordion.Header>
            <Accordion.Body>
              <Link to="/adminsubcategory" style={{ textDecoration: 'none' }}>Subcategory</Link><br/><br/>
              <Link to="/getadminsubcategory" style={{ textDecoration: 'none' }}>GetSubcategory</Link>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey={4}>
            <Accordion.Header>Product</Accordion.Header>
            <Accordion.Body>
              <Link to="/adminproduct" style={{ textDecoration: 'none' }}>Product</Link><br/><br/>
              <Link to="/getadminproduct" style={{ textDecoration: 'none' }}>GetProduct</Link>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey={5}>
            <Accordion.Header>Settings</Accordion.Header>
            <Accordion.Body>
              <Link to="/adminlogout" style={{ textDecoration: 'none' }}>Logout</Link><br /><br />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <div style={{ marginTop: '48rem', textAlign: 'center', fontWeight: 'bold' }}>
          <p>&copy; 2025 Real.com</p>
        </div>
        <br />
      </Offcanvas>
      <p className="text-center align-items-center mt-5"><FaUserTie style={{ fontSize: '90px', color: 'lightblue' }} /></p>
      <div className="container">
       <div className="row" style={{margin: 'auto', gap: '20px', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>
         <div className="col-3" style={{boxShadow: '0px 0px 5px 2px #ccc', padding: '20px', width: '12rem'}}>
            <p style={{ alignItems: 'center', justifyContent: 'center', display: 'flex', fontWeight: 'bold'}}><FaUser/>Users: {users}</p>
         </div>
          <div className="col-3" style={{ boxShadow: '0px 0px 5px 2px #ccc', padding: '20px', width: '12rem' }}>
            <p style={{ alignItems: 'center', justifyContent: 'center', display: 'flex', fontWeight: 'bold' }}><SiDatabricks />Categories: {categories}</p>
          </div>
          <div className="col-3" style={{ boxShadow: '0px 0px 5px 2px #ccc', padding: '20px', width: '12rem' }}>
            <p style={{ alignItems: 'center', justifyContent: 'center', display: 'flex', fontWeight: 'bold' }}><AiOutlineProduct />SubCategories: {subcategories}</p>
          </div>
          <div className="col-3" style={{ boxShadow: '0px 0px 5px 2px #ccc', padding: '20px', width: '12rem' }}>
            <p style={{ alignItems: 'center', justifyContent: 'center', display: 'flex', fontWeight: 'bold' }}><BiCart/>Products: {products}</p>
          </div>
       </div>
      </div>
      <ToastContainer/>
    </div>
  )
}
export default Administration;
