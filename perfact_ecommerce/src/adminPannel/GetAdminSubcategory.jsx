import { useEffect, useRef, useState } from "react";
import { Container, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
const GetAdminSubCategory = () => {
  const [subcategory, setSubCategory] = useState([]);
  const nmRef = useRef();
  const desRef = useRef();
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [n, setN] = useState("");
  const [d, setD] = useState("");
  useEffect(() => {
    fetch("https://think-api-task-2.onrender.com/api/getsubcategories")
      .then(e => e.json())
      .then((data) => {
        setSubCategory(data?.data);
      })
  }, []);
  const DeleteSubCategory = async (id) => {
    if (!window.confirm("Are you sure you want to delete this subcategory?")) {
      return;
    }
    try {
      const request = await fetch(`https://think-api-task-2.onrender.com/api/delsubcategory/${id._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });
      const response = await request.json();
      if (request.ok == false) {
        toast.error(response.message)
      } else {
        toast.success(response.message);
        setSubCategory(subcategory.filter((e) => {
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
    setN(e.sub_name);
    setD(e.description);
    setId(e._id);
  }

  const PutSubCategory = async (e) => {
    e.preventDefault();
    try {
      const request = await fetch(`https://think-api-task-2.onrender.com/api/putsubcategory/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          sub_name: nmRef.current.value,
          description: desRef.current.value
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
  console.log(subcategory);
  
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
            subcategory.map((e, i) => {
              return <>
                <div key={i} className="card px-3 p-5 mt-4" style={{ margin: '5px', boxShadow: '-5px 5px 5px 2px #ccc' }}>
                  <img src={e?.sub_img_url} style={{width: '15rem', height: '12rem'}}/><br/>
                  <p><b>SubcategoryName</b>: {e.sub_name}</p>
                  <p><b>Description</b>: {e.description}</p>
                  <div className="row">
                    <div className="col-6">
                      <button onClick={() => DeleteSubCategory(e)} className="form-control" style={{ background: "linear-gradient(90deg, #1B20AB, #7A5AF8)", color: 'white', fontWeight: 'bold' }}>Delete</button>
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
      <div className="container">
        {
          n != ""
            ?
            <form onSubmit={PutSubCategory} className="card p-5" style={{ boxShadow: '-5px 5px 5px 2px #ccc' }}>
              <label>SubcategoryName</label>
              <input type="text" className="form-control" ref={nmRef} value={n} onChange={(e) => setN(e.target.value)} /><br />
              <label>Description</label>
              <input type="text" className="form-control" ref={desRef} value={d} onChange={(e) => setD(e.target.value)} /><br />
              <button type="submit" className="form-control" style={{ background: "linear-gradient(90deg, #1B20AB, #7A5AF8)", color: 'white', fontWeight: 'bold' }}>Save</button>
            </form>
            :
            null
        }
      </div>
      <ToastContainer />
    </div>
  )
}

export default GetAdminSubCategory;
