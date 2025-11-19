import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authUser } from "../authentication/Authentication";
const UserSubcategory = () => {
  const [subcategory, setSubCategory] = useState([]);
  const { subcategorySender } = authUser();
  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:5002/api/getsubcategories")
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
      <div className="container gap-3" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {
          subcategory.map((e) => {
            return <>
              <div key={e._id} className="card mt-5" onClick={() => sendSubcategory(e)} style={{ width: '15rem', height: '8rem', fontWeight: 'bold', boxShadow: '0px 0px 5px 3px #ccc', cursor: 'pointer' }}>
                <div style={{ height: '10px', background: 'linear-gradient(to right, blue, pink)', borderRadius: '20px' }}></div>
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
