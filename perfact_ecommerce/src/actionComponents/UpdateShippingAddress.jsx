import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
const UpdateShippingAddress = ({ data, setShowModel }) => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [postal, setPostal] = useState("");
  const [land, setLand] = useState("");
  const [stateValue, setStateValue] = useState("");
  const [country, setCountry] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (data) {
      setName(data.fullName);
      setContact(data.contactNumber);
      setStreet(data.street);
      setCity(data.city);
      setPostal(data.postalCode);
      setLand(data.landMark);
      setStateValue(data.state);
      setCountry(data.country);
    }
  }, [data]);

  const HandleShippingUpdate = async (e) => {
    e.preventDefault();

    const obj = {
      fullName: name,
      contactNumber: contact,
      street,
      city,
      landMark: land,
      postalCode: postal,
      state: stateValue,
      country,
    };

    try {
      const request = await fetch(`https://think-api-task-2.onrender.com/api/putshipping/${ data?.user }`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(obj),
        }
      );

      const response = await request.json();

      if (!request.ok) {
        toast.error(response.message);
      } else {
        toast.success(response.message);
        navigate(0);
      }

    } catch (err) {
      console.error("Internal Server Error:", err);
    }
  };
  return (
    <div>
      {
        data?.fullName == undefined ?
          null :
        
          <div className="container mt-4">
            <form onSubmit={HandleShippingUpdate} className="card p-3" style={{ maxHeight: '700px', overflowY: 'auto'}}>
              <button
                type="button"
                className="btn btn-close text-white"
                onClick={() => setShowModel(false)}
              ></button>
              <h4 className="text-center">Update Shipping Address</h4><br />

              <label>Full Name</label>
              <input className="form-control" value={name} onChange={(e) => setName(e.target.value)} /><br/>

              <label>Contact Number</label>
              <input className="form-control" value={contact} onChange={(e) => setContact(e.target.value)} /><br />

              <div className="row">
               <div className="col-6">
                  <label>Street</label>
                  <input className="form-control" value={street} onChange={(e) => setStreet(e.target.value)} /><br />
               </div>
                <div className="col-6">
                  <label>City</label>
                  <input className="form-control" value={city} onChange={(e) => setCity(e.target.value)} /><br />
                </div>
              </div>

              <div className="row">
                <div className="col-6">
                  <label>Landmark</label>
                  <input className="form-control" value={land} onChange={(e) => setLand(e.target.value)} /><br />
                </div>
                <div className="col-6">
                  <label>Postal Code</label>
                  <input className="form-control" value={postal} onChange={(e) => setPostal(e.target.value)} /><br />
                </div>
              </div>
              <label>State</label>
              <input className="form-control" value={stateValue} onChange={(e) => setStateValue(e.target.value)} /><br />

              <label>Country</label>
              <input className="form-control" value={country} onChange={(e) => setCountry(e.target.value)} /><br />

              <button className="btn btn-success mt-3">Save</button>
            </form>
          </div>
      }
      <ToastContainer />
    </div>
  );
};

export default UpdateShippingAddress;
