import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authUser } from "../authentication/Authentication";
import { SlTag } from "react-icons/sl";

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
      <div>
        <h3 className="mt-5 ms-5">#Exclusive Brands shell <SlTag className="text-success"/></h3>
      </div>
      <div className="container gap-3" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {
          subcategory.map((e) => {
            return <>
              <div key={e._id} className="card p-5" onClick={() => sendSubcategory(e)} style={{cursor: 'pointer', boxShadow: '0px 0px 5px 2px #ccc', fontWeight: 'bold'}}>
                <div>
                  <p className="text-center mt-5">{e.sub_name}</p>
                </div>
              </div>
            </>
          })
        }
      </div>
    </div>
  )
}

export default UserSubcategory;
