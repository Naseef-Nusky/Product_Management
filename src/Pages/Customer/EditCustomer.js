import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditCustomer() {
  let navigate = useNavigate();

  const { id } = useParams();

  const [customer, setCustomer] = useState({
    name: "",
    address: "",
    cno: "",
    email: "",
    
  });

  const { name, address, cno, email } = customer;

  const onInputChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadCustomer();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/customer/${id}`, customer);
    navigate("/");
  };

  const loadCustomer = async () => {
    const result = await axios.get(`http://localhost:8080/customer/${id}`);
    setCustomer(result.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit Customer's Details</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                Name
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter Customer's Name"
                name="name"
                value={name}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Address" className="form-label">
                Address
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter customer's Address"
                name="address"
                value={address}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="cno" className="form-label">
                Contact Number
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter Customer's Contact Number"
                name="cno"
                value={cno}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Email" className="form-label">
                E-mail
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter Customer's e-mail id"
                name="email"
                value={email}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
