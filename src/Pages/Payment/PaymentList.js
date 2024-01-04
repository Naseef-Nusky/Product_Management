

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { PAYMENT_API } from "../../Util";

/**
 * This component will handle the payment details
 * @returns the Payment component
 */
function Payment() {
  // Define state variables for storing the payment data, search keyword, and filter value.
  const [payment, setPayment] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [filter, setFilter] = useState("all");
  
  // Load the payment data when the component mounts.
  useEffect(() => {
    loadPayment();


    // const intervalId = setInterval(() => {
    //   const currentDate = new Date();
    //   if (currentDate.getHours() === 2 && currentDate.getMinutes() === 12) {
    //     sendReminderEmail();
    //   }
    // }, 60000); // Check every minute
  
    // return () => {
    //   clearInterval(intervalId);
    // };


  }, []);

  // Function to fetch the payment data from the server.
  const loadPayment = async () => {
    const result = await axios.get(PAYMENT_API);
    setPayment(result.data);
  };

  // Function to delete a payment record.
  const deletePayment = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this payment record?"
    );
    if (confirmDelete) {
      await axios.delete(`http://localhost:8080/payment/${id}`);
      loadPayment();
    }
  };

  // Helper function to determine the text color based on payment status.
  const getStatusColor = (status) => {
    return status === "paid" ? "green" : "red";
  };

  // Function to handle search by keyword.
  const handleSearch = (event) => {
    setKeyword(event.target.value.toLowerCase());
  };

  // Function to handle filter selection.
  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  const filteredPayment = payment.filter((payment) => {
    const status = payment.status ? payment.status.toLowerCase() : '';
    const invoiceNo = payment.invoiceNo ? payment.invoiceNo.toLowerCase() : '';
  
    if (filter === "all") {
      return invoiceNo.includes(keyword);
    } else if (filter === "paid") {
      return status === "paid" && invoiceNo.includes(keyword);
    } else if (filter === "unpaid") {
      return status === "unpaid" && invoiceNo.includes(keyword);
    }
  
    return false;
  });
  
  // Returning the component.
  return (
    <div style={{ marginLeft: "250px", marginTop: "65px" }}>
      <div className="container">
        <div className="d-flex justify-content-end mb-2">
        <div className="mx-2">
          <input
            type="number"
            placeholder="Search by invoice No"
            onChange={handleSearch}
            className="form-control"
            style={{ width: "200px" }}
          />
        </div>
          <select
            className="form-control ml-2"
            onChange={handleFilter}
            style={{ width: "150px" }}
          >
            <option value="all">All</option>
            <option value="paid">Paid</option>
            <option value="unpaid">Unpaid</option>
          </select>
        </div>
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">InvoiceNo</th>
              <th scope="col">Status</th>
              <th scope="col">Due Date</th>
              <th scope="col">Amount</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayment.map((payment, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{payment.invoiceNo}</td>
                <td style={{ color: getStatusColor(payment.status) }}>
                  {payment.status}
                </td>
                <td>{payment.dueDate}</td>
                <td>{payment.amount}</td>
                <td>
                  <Link
                    className="btn btn-primary mx-2"
                    to={`/viewpayment/${payment.id}`}
                  >
                    View
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deletePayment(payment.id)}
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

// Export the Payment component as the default export.
export default Payment;


