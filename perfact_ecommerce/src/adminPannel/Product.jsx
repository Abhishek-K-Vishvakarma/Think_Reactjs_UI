import { useEffect, useRef, useState } from "react";
import { Container, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
const Product = () => {
  const nmRef = useRef();
  const desRef = useRef();
  const categoryId = useRef();
  const subcategoryId = useRef();
  const priceRef = useRef();
  // const productImageRef = useRef();
  const [category, setCategory] = useState([]);
  const [subcategory, setSubCategory] = useState([]);
  const navigate = useNavigate();
  const ResetForm = () => {
    nmRef.current.value = "";
    desRef.current.value = "";
    priceRef.current.value = "";
    categoryId.current.value = "";
    subcategoryId.current.value = "";
  }

  useEffect(() => {
    fetch("https://think-api-task-2.onrender.com/api/getcategories")
      .then(e => e.json())
      .then((data) => {
        setCategory(data?.data);
      })
  }, []);
  useEffect(() => {
    fetch("https://think-api-task-2.onrender.com/api/getsubcategories")
      .then(e => e.json())
      .then((data) => {
        setSubCategory(data?.data);
      })
  }, []);
  const HandleCategory = async (e) => {
    e.preventDefault();
    // const file = productImageRef.current.value;
    // const formData = new FormData();
    // formData.append("p_name", nmRef.current.value);
    // formData.append("description", desRef.current.value);
    // formData.append("categoryId", categoryId.current.value);
    // formData.append("subcategoryId", subcategoryId.current.value);
    // formData.append("price", priceRef.current.value);
    // formData.append("cloudimage", file);
    try {
      const request = await fetch("https://think-api-task-2.onrender.com/api/product", {
        method: "POST",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          p_name: nmRef.current.value,
          price: priceRef.current.value,
          description: desRef.current.value,
          categoryId: categoryId.current.value,
          subcategoryId: subcategoryId.current.value
        })
      });
      const response = await request.json();
      if (request.status == 500) {
        toast.error(response.message);
      } else {
        toast.success(response.message);
        setTimeout(()=>{
        navigate("/admin");
        },2000);
        ResetForm();
      }
      console.log(request, response);
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
        fontSize: "28px",
      }}>
        <Container>
          <Link to="/admin" className="text-white" style={{ textDecoration: 'none' }}>Administration Page</Link>
        </Container>
      </Navbar>
      <div className="container">
        <div className="card p-5 mt-5" style={{ boxShadow: '-5px 5px 4px 2px #ccc' }}>
          <form onSubmit={HandleCategory} className="form-group">
            <label style={{ fontWeight: 'bold' }}>Enter ProductName</label>
            <input type="text" ref={nmRef} className="form-control p-2 fs-5" /><br />
            <label style={{ fontWeight: 'bold' }}>Enter Price</label>
            <input type="number" ref={priceRef} className="form-control p-2 fs-5" /><br />
            <label style={{ fontWeight: 'bold' }}>Enter Description</label>
            <textarea type="text" ref={desRef} className="form-control p-2 fs-5" /><br />
            {/* <label>Choose Image File</label>
            <input type="file" accept="/*" ref={productImageRef} className="form-control p-2"/><br/> */}
            <label style={{ fontWeight: 'bold' }}>Choose Category</label>
            <select type="text" ref={categoryId} className="form-control p-2 fs-5">
              <option value="">Choose Category</option>
              {
                category.map((e, i) => {
                  return <div key={i}>
                    <option value={e._id}>{e.c_name}</option>
                  </div>
                })
              }
            </select><br />
            <label style={{ fontWeight: 'bold' }}>Choose Subcategory</label>
            <select type="text" ref={subcategoryId} className="form-control p-2 fs-5">
              <option value="">Choose Subcategory</option>
              {
                subcategory.map((e, i) => {
                  return <div key={i}>
                    <option value={e._id}>{e.sub_name}</option>
                  </div>
                })
              }
            </select><br />
            <button type="submit" className="form-control p-2" style={{ background: "linear-gradient(90deg, #1B20AB, #7A5AF8)", fontSize: '18px', fontWeight: 'bold', color: '#fff' }}>Create Product</button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Product;
