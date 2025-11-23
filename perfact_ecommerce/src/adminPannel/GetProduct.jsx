import { useEffect, useRef, useState } from "react";
import { Container, Modal, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
const GetAdminProduct = () => {
  const [product, setProduct] = useState([]);
  const nmRef = useRef();
  const p_qtyRef = useRef();
  const desRef = useRef();
  const priceRef = useRef();
  console.log(product)
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [n, setN] = useState("");
  const [q, setQ] = useState(1);
  const [d, setD] = useState("");
  const [p, setP] = useState("");
  const [showmodal, setShowModal] = useState(false);
  useEffect(() => {
    fetch("https://think-api-task-2.onrender.com/api/getProducts")
      .then(e => e.json())
      .then((data) => {
        setProduct(data?.data);
      })
  }, []);
  const DeleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }
    try {
      const request = await fetch(`https://think-api-task-2.onrender.com/api/delproduct/${id._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });
      const response = await request.json();
      if (request.ok == false) {
        toast.error(response.message);
      } else {
        toast.success(response.message);
        setProduct(product.filter((e) => {
          return e._id != id
        }));
        setTimeout(() => {
          navigate(0);
        }, 1000);
      }
    } catch (error) {
      console.error("Internal Server error :", error);
    }
  }

  const setDataforPut = (e) => {
    console.log(e)
    setN(e.p_name);
    setQ(e.p_qty)
    setD(e.description);
    setP(e.price)
    setId(e._id);
    setShowModal(true);
  }

  const PutProduct = async (e) => {
    e.preventDefault();
    try {
      const request = await fetch(`https://think-api-task-2.onrender.com/api/putproduct/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          p_name: nmRef.current.value,
          p_qty: p_qtyRef.current.value * 1,
          description: desRef.current.value,
          price: priceRef.current.value * 1
        })
      });
      const response = await request.json();
      if (request.ok == false) {
        toast.error(response.message)
      } else {
        toast.success(response.message);
        setTimeout(() => {
          navigate(0);
        }, 1000);
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
      <div>
        <div className="container">
          {
            product.map((e) => {
              return <>
                <div key={e._id} className="card px-3 p-5 mt-4" style={{ margin: '5px', boxShadow: '-5px 5px 5px 2px #ccc' }}>
                  <img src={e.product_img_url} style={{width: '15rem', height: '12rem'}}/><br/>
                  <p><b>ProductName</b>: {e.p_name}</p>
                  <p><b>Qty</b>: {e.p_qty}</p>
                  <p><b>Price</b>: ₹ {e.price}</p>
                  <p><b>Description</b>: {e.description}</p>
                  <div className="row">
                    <div className="col-6">
                      <button onClick={() => DeleteProduct(e)} className="form-control" style={{ background: "linear-gradient(90deg, #1B20AB, #7A5AF8)", color: 'white', fontWeight: 'bold' }}>Delete</button>
                    </div>
                    <div className="col-6">
                      <button onClick={() => setDataforPut(e)} className="form-control" style={{ background: "linear-gradient(90deg, #1B20AB, #7A5AF8)", color: 'white', fontWeight: 'bold' }}>Edit</button>
                    </div>
                  </div>
                </div>
              </>
            })
          }
        </div>
      </div>
      <Modal show={showmodal}>
        <button onClick={() => setShowModal(false)} className="btn-close mt-2 p-2 ms-auto"></button>
        <div>
          {
            n != ""
              ?
              <form onSubmit={PutProduct} className="card p-5">
                <label>ProductName</label>
                <input type="text" className="form-control" ref={nmRef} value={n} onChange={(e) => setN(e.target.value)} /><br />
                <label>Qty</label>
                <input type="number" className="form-control" ref={p_qtyRef} value={q} onChange={(e) => setQ(e.target.value)} /><br />
                <label>Description</label>
                <input type="text" className="form-control" ref={desRef} value={d} onChange={(e) => setD(e.target.value)} /><br />
                <label>Price</label>
                <input type="number" className="form-control" ref={priceRef} value={p} onChange={(e) => setP(e.target.value)} /><br />
                <button type="submit" className="form-control" style={{ background: "linear-gradient(90deg, #1B20AB, #7A5AF8)", color: 'white', fontWeight: 'bold' }}>Save</button>
              </form>
              :
              null
          }
        </div>
      </Modal>
      <ToastContainer />
    </div>
  )
}

export default GetAdminProduct;
