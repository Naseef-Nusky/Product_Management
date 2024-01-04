// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate, useParams } from 'react-router-dom';

// /**
//  * This component will handle the edit payment details
//  * @returns the EditPayment component
//  */
// export default function EditPayment() {
//   let navigate = useNavigate();

//   // Getting the payment ID from the URL parameters.
//   const { id } = useParams();

//   // Initializing the payment state with default values.
//   const [payment, setPayment] = useState({
//     status: '',
//     paymentMethod: '',
//     paymentDate: '',
//     dueAmount: '',
//     supplier: '',
//   });

//   const { status, paymentMethod, paymentDate, dueAmount, supplier } = payment;

//   // Function to handle input change.
//   const onInputChange = (e) => {
//     setPayment({ ...payment, [e.target.name]: e.target.value });
//   };

//   // Effect hook to load the payment details on component mount.
//   useEffect(() => {
//     loadPayment();
//   }, []);

//   //Function to handle form submission.
//   // const onSubmit = async (e) => {
//   //   e.preventDefault();
//   //   await axios.put(`http://localhost:8080/payment/${id}`, payment);
//   //   navigate('/paymentlist');
//   // };



// //currect
// // Function to handle form submission.
// const onSubmit = async (e) => {
//   e.preventDefault();

//   // Check if the status is 'paid' and the payment date or payment method is empty
//   if (status === 'paid' && (paymentDate === '' || paymentMethod === '')) {
//     alert('Payment date and payment method are required for paid status.');
//     return;
//   }

//   // Check if the status is 'unpaid' and the payment date or payment method is not empty
//   if (status === 'unpaid' && (paymentDate !== '' || paymentMethod !== '')) {
//     alert('Payment date and payment method should be empty for unpaid status.');
//     return;
//   }

//   await axios.put(`http://localhost:8080/payment/${id}`, payment);
//   navigate('/paymentlist');
// };

//   // Function to load the payment details from the server.
//   const loadPayment = async () => {
//     const result = await axios.get(`http://localhost:8080/payment/${id}`);
//     setPayment(result.data);
//   };

//   // Returning the component.
//   return (
//     <div className='container'style={{ marginLeft: "250px", marginTop: "65px" }}>
//       <div className='row'>
//         <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
//           <h2 className='text-center m-4'>Edit Payment</h2>
//           <form onSubmit={(e) => onSubmit(e)}>
//           <div className='mb-3'>
//             <label htmlFor='' className='form-lable'>
//               Status
//             </label>
//             <select
//               className='form-select'
//               aria-label='Default select example'
//               required
//               name='status'
//               value={status}
//               onChange={(e) => onInputChange(e)}
//             >
//               <option value=''>--Select Status Type-- </option>
//               <option value='paid'>Paid</option>
//               <option value='unpaid'>Unpaid</option>
//             </select>
//           </div>

//             <div className='mb-3'>
//               <label htmlFor='paymentMethod' className='form-label'>
//                 Payment Method
//               </label>
//               <select
//                 className='form-select'
//                 aria-label='Default select example'
//                 name='paymentMethod'
//                 value={paymentMethod}
//                 //required={status === 'paid'}
//                 onChange={(e) => onInputChange(e)}
//               >
//                 <option value=''>--Select Payment Method-- </option>
//                 <option value='Cash'>Cash</option>
//                 <option value='Check'>Check</option>
//                 <option value='Debit card'>Debit card</option>
//                 <option value='Credit card'>Credit card</option>
//               </select>
//             </div>

//             <div className='mb-3'>
//               <label htmlFor='paymentDate' className='form-label'>
//                 Payment date
//               </label>
//               <input
//                 type='date'
//                 className='form-control'
//                 placeholder='Payment date'
//                 name='paymentDate'
//                 //required={status === 'paid'}
//                 value={paymentDate}
//                 onChange={(e) => onInputChange(e)}
//               />
//             </div>

//             {/* <div className='mb-3'>
//               <label htmlFor='dueAmount' className='form-label'>
//                 Due Amount
//               </label>
//               <input
//                 type='number'
//                 className='form-control'
//                 placeholder='Due Amount'
//                 name='dueAmount'
//                 required
//                 value={dueAmount}
//                 onChange={(e) => onInputChange(e)}
//                 min="0"
//               />
//             </div> */}

//             <div className='mb-3'>
//               <label htmlFor='supplier' className='form-label'>
//                 Supplier Name
//               </label>
//               <input
//                 type='text'
//                 className='form-control'
//                 placeholder='Supplier'
//                 name='supplier'
//                 value={supplier}
//                 onChange={(e) => onInputChange(e)}
//                 required 
//                 pattern="^[a-zA-Z .]+$"
//               />
//             </div>

//             <div className='text-center m-4'>
//               <button type='submit' className='btn btn-outline-primary mx-2'>
//                 Save
//               </button>
//               <Link className='btn btn-outline-danger mx-2'to={`/viewpayment/${payment.id}`}>
//                 Cancel
//               </Link>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }




import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

/**
 * This component will handle the edit payment details
 * @returns the EditPayment component
 */
export default function EditPayment() {
  let navigate = useNavigate();

  // Getting the payment ID from the URL parameters.
  const { id } = useParams();

  // Initializing the payment state with default values.
  const [payment, setPayment] = useState({
    status: '',
    paymentMethod: '',
    paymentDate: '',
    dueAmount: '',
    supplier: '',
  });

  const { status, paymentMethod, paymentDate, dueAmount, supplier } = payment;

  // Function to handle input change.
  const onInputChange = (e) => {
    setPayment({ ...payment, [e.target.name]: e.target.value });
  };

  // Effect hook to load the payment details on component mount.
  useEffect(() => {
    loadPayment();
  }, []);

  // Function to handle form submission.
  const onSubmit = async (e) => {
    e.preventDefault();
    
    const currentDate = new Date().toISOString().split('T')[0];
  if (paymentDate > currentDate) {
    alert('Payment date cannot be after the current date.');
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

    await axios.put(`http://localhost:8080/payment/${id}`, payment);
    navigate('/paymentlist');
  };

  // Function to load the payment details from the server.
  const loadPayment = async () => {
    const result = await axios.get(`http://localhost:8080/payment/${id}`);
    setPayment(result.data);
  };

  // Returning the component.
  return (
    <div className='container' style={{ marginLeft: '250px', marginTop: '65px' }}>
      <div className='row'>
        <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
          <h2 className='text-center m-4'>Edit Payment</h2>
          <form onSubmit={(e) => onSubmit(e)}>
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

            <div className='mb-3'>
              <label htmlFor='paymentMethod' className='form-label'>
                Payment Method
              </label>
              <select
                className='form-select'
                aria-label='Default select example'
                name='paymentMethod'
                value={paymentMethod}
                //required={status === 'paid'}
                onChange={(e) => onInputChange(e)}
              >
                <option value=''>--Select Payment Method-- </option>
                <option value='Cash'>Cash</option>
                <option value='Check'>Check</option>
                <option value='Debit card'>Debit card</option>
                <option value='Credit card'>Credit card</option>
              </select>
            </div>

            <div className='mb-3'>
              <label htmlFor='paymentDate' className='form-label'>
                Payment date
              </label>
              <input
                type='date'
                className='form-control'
                placeholder='Payment date'
                name='paymentDate'
                //required={status === 'paid'}
                value={paymentDate}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='supplier' className='form-label'>
                Supplier Name
              </label>
              <input
                type='text'
                className='form-control'
                placeholder='Supplier'
                name='supplier'
                value={supplier}
                onChange={(e) => onInputChange(e)}
                required
                pattern='^[a-zA-Z .]+$'
              />
            </div>

            <div className='text-center m-4'>
              <button type='submit' className='btn btn-outline-primary mx-2'>
                Save
              </button>
              <Link className='btn btn-outline-danger mx-2' to={`/viewpayment/${payment.id}`}>
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
