import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { BRAND_API } from '../../Util';

/**
 * This component will handle the adding brand
 * @returns the AddBrand component
 */
export default function AddBrand() {
  // Getting navigation functionality from React Router DOM.
  let navigate=useNavigate()
  const [brand, setBrand] = useState({
    brandName: "",
  });

  // Extracting brandName from brand state.
  const { brandName } = brand;

  // Updating brand state whenever there is any input change.
  const onInputChange = (e) => {
    setBrand({ ...brandName, [e.target.name]: e.target.value });
  };

 // Handling form submission.
  const onSubmit = async (e) => {
    e.preventDefault();
    // Making a POST request to add the new category to the backend.
      await axios.post(BRAND_API, brand);
      navigate("/productlist");
    
  };

  return (
    <div className='container'style={{ marginLeft: '100px' , marginTop: '200px' }}>
      <div className='row>'>
        <div className='col-md-8 offset-md-3 border rounded p-4 mt-2 shadow'>
          <h2 className='text-center m-4'>Add Brand</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className='mb-3>'>
              <label htmlFor="Name" className="form-lable">
                Brand Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter brand Name"
                name="brandName"
                value={brandName}
                onChange={(e) => onInputChange(e)}
                required 
                pattern="^[a-zA-Z0-9 ]+$"
              />
            </div>

            <div className="text-center m-4">
              <button type='submit' className='btn btn-outline-primary mx-2'>Save</button>
              <Link className='btn btn-outline-danger mx-2 ' to="/productlist ">Cancel</Link>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
