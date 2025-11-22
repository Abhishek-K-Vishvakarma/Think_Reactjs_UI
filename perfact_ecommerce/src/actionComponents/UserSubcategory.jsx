import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authUser } from "../authentication/Authentication";
import { SlTag } from "react-icons/sl";
import { HiBadgeCheck } from "react-icons/hi";

const UserSubcategory = () => {
  const [subcategory, setSubCategory] = useState([]);
  const { subcategorySender } = authUser();
  const navigate = useNavigate();
  useEffect(() => {
    fetch("https://think-api-task-2.onrender.com/api/getsubcategories")
      .then(e => e.json())
      .then((data) => {
        setSubCategory(data?.data);
        console.log(data?.data)
      })
  }, []);
  const sendSubcategory = (data)=>{
    subcategorySender(data);
    navigate("/uproduct");
  }
  return (
    <div>
      <h3 className="mt-5 ms-5">
        #Exclusive Brands shell <SlTag className="text-success" />
      </h3>

      <div className="container mt-4">
        <div className="row">

          {subcategory.map((e) => (
            <div key={e._id} className="col-md-6 mb-4">
              <div className="card p-3 text-center border-0">
                <p style={{boxShadow: '-2px 2px 5px 2px #ccc', fontSize: '28px', color: 'red'}}><HiBadgeCheck/></p>
                <img
                  src={e.sub_img_url}
                  className="img-fluid"
                  style={{ width: "25rem", height: "10rem", margin: "auto", boxShadow: '-2px 2px 5px 2px #ccc'}}
                />
                <h5 className="mt-3 p-2" style={{ boxShadow: '-2px 2px 5px 1px #ccc', cursor: 'pointer'}} onClick={() => sendSubcategory(e)}>{e.sub_name}</h5>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default UserSubcategory;
