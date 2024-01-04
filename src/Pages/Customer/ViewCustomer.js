import axios from "axios";
import React, { useEffect,useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewCustomer() {
  const [customer, setCustomer] = useState({
    name: "",
    address: "",
    email: "",
    cno: "",
  });

  const { id } = useParams();

  useEffect(() => {
    loadCustomer();
  }, []);

  const loadCustomer = async () => {
    const result = await axios.get(`http://localhost:8080/customer/${id}`);
    setCustomer(result.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Customer's Details</h2>

          <div className="card">
            <div className="card-header">
              Details of user id : {customer.id}
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>Name:</b>
                  {customer.name}
                </li>
                <li className="list-group-item">
                  <b>Address:</b>
                  {customer.address}
                </li>
                <li className="list-group-item">
                  <b>Contact Number:</b>
                  {customer.cno}
                </li>
                <li className="list-group-item">
                  <b>Email:</b>
                  {customer.email}
                </li>
              </ul>
            </div>
          </div>
          <Link className="btn btn-primary my-2" to={"/"}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
