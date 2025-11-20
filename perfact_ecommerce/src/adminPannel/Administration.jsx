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
import { Link } from "react-router-dom";

const Administration = () => {
  const [user, setUser] = useState("");
  const [categories, setCategories] = useState("");
  const [subcategories, setSubCategories] = useState("");
  const [products, setProducts] = useState("");
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleFalse = () => setShow(false);

  useEffect(() => {
    fetch("https://think-api-task-2.onrender.com/api/getuserscount")
      .then(e => e.json())
      .then((data) => {
        console.log(data);
        setUser(data?.users);
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
      {/* <h3><SiStackhawk /></h3> */}
      <h3 style={{
        background: "linear-gradient(90deg, #1B20AB, #7A5AF8)",
        padding: "20px",
        textAlign: "center",
        color: "white",
        boxShadow: "0px 4px 12px rgba(0,0,0,0.3)",
        margin: 0, letterSpacing: "1px", fontSize: "28px"
      }}>⚙️ Administration Dashboard</h3>
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
      <p className="text-center align-items-center mt-5 fs-2" style={{ color: 'lightblue' }}>I'm Admin</p>
      <div className="container mt-5">
        <div style={{ display: 'flex', gap: '20px' }}>
          <div className="col-3 p-5" style={{ boxShadow: '-4px 4px 4px 2px #ccc' }}>
            <h3 className="text-center"><FaUser /></h3>
            <h5 className="text-center">Total Users : {user}</h5>
          </div>
          <div className="col-3 p-5" style={{ boxShadow: '-4px 4px 4px 2px #ccc' }}>
            <h3 className="text-center"><SiDatabricks /></h3>
            <h5 className="text-center">Total Categories : {categories}</h5>
          </div>
          <div className="col-3 p-5" style={{ boxShadow: '-4px 4px 4px 2px #ccc' }}>
            <h3 className="text-center"><AiOutlineProduct /></h3>
            <h5 className="text-center">Total SubCategories : {subcategories}</h5>
          </div>
          <div className="col-3 p-5" style={{ boxShadow: '-4px 4px 4px 2px #ccc' }}>
            <h3 className="text-center"><BiCart /></h3>
            <h5 className="text-center">Total Products : {products}</h5>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Administration;
