import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { CATEGORY_API } from '../../Util';

/**
 * This component will handle the adding category
 * @returns the AddCategory component
 */
export default function AddCategory() {
  // Getting navigation functionality from React Router DOM.
  let navigate=useNavigate()
  const [category, setCategory] = useState({
    categoryType: "",
  });

  // Extracting categoryType from category state.
  const { categoryType } = category;

  // Updating category state whenever there is any input change.
  const onInputChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

 // Handling form submission.
  const onSubmit = async (e) => {
    e.preventDefault();
    // Making a POST request to add the new category to the backend.
      await axios.post(CATEGORY_API, category);
      navigate("/productlist");
    
  };

  return (
    <div className='container'style={{ marginLeft: '100px' , marginTop: '200px' }}>
      <div className='row>'>
        <div className='col-md-8 offset-md-3 border rounded p-4 mt-2 shadow'>
          <h2 className='text-center m-4'>Add Category</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className='mb-3>'>
              <label htmlFor="Name" className="form-lable">
                Category Type
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter category Type"
                name="categoryType"
                value={categoryType}
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
