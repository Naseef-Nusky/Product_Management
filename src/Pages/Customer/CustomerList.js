import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function Home() {
  const [customers, setCustomers] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    const result = await axios.get("http://localhost:8080/customers");
    setCustomers(result.data);
  };

  const deleteCustomer = async (id) => {
    await axios.delete(`http://localhost:8080/customer/${id}`);
    loadCustomers();
  };

  return (
    <div className="container">
      <div className="py-4">
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">Seriel No</th>
              <th scope="col">Name</th>
              <th scope="col">Address</th>
              <th scope="col">Contact No</th>
              <th scope="col">Email</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, index) => (
              <tr>
                <th scope="row" key={index}>
                  {index + 1}
                </th>
                <td>{customer.name}</td>
                <td>{customer.address}</td>
                <td>{customer.cno}</td>
                <td>{customer.email}</td>
                
                <td>
                  <Link
                    className="btn btn-primary mx-2"
                    to={`/viewcustomer/${customer.id}`}
                  >
                    View
                  </Link>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/editcustomer/${customer.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteCustomer(customer.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
