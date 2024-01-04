import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

/**
 * This component will show full details of the payment
 * @returns the ViewPayment component
 */
export default function ViewPayment() {
  // Initializing the payment state variable using the useState hook.
  const [payment, setPayment] = useState({
    paymentMethod: "",
    paymentDate: "",
    dueAmount: "",
    supplier: "",
  });

  // Extracting the id parameter from the URL using the useParams hook.
  const { id } = useParams();

  // Loading the payment details on component mount using the useEffect hook.
  useEffect(() => {
    loadPayment();
  }, []);

  // Fetching the payment details from the API and updating the state.
  const loadPayment = async () => {
    const result = await axios.get(`http://localhost:8080/payment/${id}`);
    setPayment(result.data);
  };

  return (
    <div className="container" style={{marginTop: '65px' }}>
      <div className="row">
        <div className="col-md-6 offset-md-4 border rounded p-4 mt-2 shadow">
          <h2>Payment's Details</h2>
          <div className="card">
            <div className="card-header">
              <b>Details of Payment id : {payment.id}</b>
            </div>
            <table className="table" style={{ textAlign: "left" }}>
              <tbody>
                <tr>
                  <th>PaymentMethod:</th>
                  <td>{payment.paymentMethod}</td>
                </tr>
                <tr>
                  <th>paymentDate:</th>
                  <td>{payment.paymentDate}</td>
                </tr>
                <tr>
                  <th>Supplier:</th>
                  <td>{payment.supplier}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <Link className="btn btn-outline-primary my-2" to={"/paymentlist"}>
            Back to PaymentList
          </Link>
          <Link className="btn btn-outline-danger mx-2" to={`/editPayment/${payment.id}`}>
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
}
