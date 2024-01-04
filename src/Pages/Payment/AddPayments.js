import axios from 'axios';
import React, { useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PAYMENT_API } from '../../Util';

/**
 * This component will handle adding payment details
 * @returns the AddPayment component
 */
export default function AddPayment() {
  // Initialize the useNavigate hook.
  let navigate = useNavigate();

  // Initialize the payment state with default values.
  const [payment, setPayment] = useState({
    invoiceNo: "",
    status: "",
    dueDate: "",
    amount: "",
    customerEmail:"",
    paymentMethod: "",
    paymentDate: "",
    supplier: "",
  });

  const [existingInvoiceNumbers, setExistingInvoiceNumbers] = useState([]);

  // Destructure the payment state.
  const { invoiceNo, status, dueDate, amount, customerEmail,paymentMethod, paymentDate, supplier } = payment;

  // Handle the input change event.
  const onInputChange = (e) => {
    setPayment({ ...payment, [e.target.name]: e.target.value });
  };

  // //Handle the form submission event.
  // const onSubmit = async (e) => {
  //   e.preventDefault();
  //   await axios.post(PAYMENT_API, payment);
  //   navigate("/paymentlist");
  // };
// Function to handle form submission.

useEffect(() => {
  fetchExistingInvoiceNumbers();
}, []);

const fetchExistingInvoiceNumbers = async () => {
  try {
    const response = await axios.get(PAYMENT_API);
    const payments = response.data;
    const invoiceNumbers = payments.map((payment) => payment.invoiceNo);
    setExistingInvoiceNumbers(invoiceNumbers);
  } catch (error) {
    console.log(error);
  }
};



const onSubmit = async (e) => {
  e.preventDefault();
  const currentDate = new Date().toISOString().split('T')[0];
  if (paymentDate > currentDate) {
    alert('Payment date cannot be after the current date.');
    return;
  }


  if (existingInvoiceNumbers.includes(invoiceNo)) {
    alert("Invoice number already exists. Cannot add duplicate entry.");
    return;
  }

  // Check if the status is 'paid' and the payment date or payment method is empty
  if (status === 'paid' && (paymentDate === '' || paymentMethod === '')) {
    alert('Payment date and payment method are required for paid status.');
    return;
  }

  // Check if the status is 'unpaid' and the payment date or payment method is not empty
  if (status === 'unpaid' && (paymentDate !== '' || paymentMethod !== '')) {
    alert('Payment date and payment method should be empty for unpaid status.');
    return;
  }

  await axios.post(PAYMENT_API, payment);
  navigate('/paymentlist');
};




  // Return the component.
  return (
    <div className="container"style={{ marginLeft: '100px' , marginTop: '100px' }}>
      <div className="row">
        <div className="col-md-8 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Add Payment</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="Name" className="form-lable">
                    Invoice Number
                  </label>
                  <input
                    type={"number"}
                    className="form-control"
                    placeholder="Enter invoice number"
                    name="invoiceNo"
                    value={invoiceNo}
                    onChange={(e) => onInputChange(e)}
                    required
                    pattern="^[0-9]+$"
                    min="0"
                  />
                </div>
                {/* <div className="mb-3">
                  <label htmlFor="Status" className="form-label">
                    Status
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter status"
                    name="status"
                    value={status}
                    onChange={(e) => onInputChange(e)}
                    required
                  />
                </div> */}
                 <div className='mb-3'>
            <label htmlFor='' className='form-lable'>
              Status
            </label>
            <select
              className='form-select'
              aria-label='Default select example'
              required
              name='status'
              value={status}
              onChange={(e) => onInputChange(e)}
            >
              <option value=''>--Select Status Type-- </option>
              <option value='paid'>Paid</option>
              <option value='unpaid'>Unpaid</option>
            </select>
          </div>
                <div className="mb-3">
                  <label htmlFor="DueDate" className="form-lable">
                    Due Date
                  </label>
                  <input
                    type={"date"}
                    className="form-control"
                    placeholder="Due Date"
                    name="dueDate"
                    value={dueDate}
                    required
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="Amount" className="form-lable">
                    Amount
                  </label>
                  <input
                    type={"number"}
                    className="form-control"
                    placeholder="Amount"
                    name="amount"
                    value={amount}
                    onChange={(e) => onInputChange(e)}
                    required
                    pattern="^[0-9]+$"
                    min="0"
                  />
                </div>
              </div>
              <div className="col-md-6">
              <div className="mb-3">
                  <label htmlFor="Email" className="form-lable">
                    Customer Email Address
                  </label>
                  <input
                    type={"email"}
                    className="form-control"
                    placeholder="Email"
                    name="customerEmail"
                    value={customerEmail}
                    onChange={(e) => onInputChange(e)}
                    required                    
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="PaymentMethod" className="form-lable">
                    Payment Method
                  </label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    name="paymentMethod"
                    value={paymentMethod}
                    required={status === 'paid'}
                    onChange={(e) => onInputChange(e)}
                  >
                    <option value="">--Select Payment Method--</option>
                    <option value="Cash">Cash</option>
                    <option value="Check">Check</option>
                    <option value="Debit card">Debit card</option>
                    <option value="Credit card">Credit catd</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="PaymentDate" className="form-lable">
                    Payment date
                  </label>
                  <input
                    type={"date"}
                    className="form-control"
                    placeholder="Payment date"
                    name="paymentDate"
                    value={paymentDate}
                    required={status === 'paid'}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="Supplier" className="form-label">
                    Supplier Name
                  </label>
                  <input
                    type={"text"}
                    className="form-control"
                    placeholder="Supplier"
                    name="supplier"
                    value={supplier}
                    onChange={(e) => onInputChange(e)}
                    required
                    pattern="^[a-zA-Z .]+$"
                  />
                </div>
              </div>
            </div>
            <div className="text-center m-4">
              <button type="submit" className="btn btn-outline-primary mx-2">
                Save
              </button>
              <Link className="btn btn-outline-danger mx-2" to="/paymentlist">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
