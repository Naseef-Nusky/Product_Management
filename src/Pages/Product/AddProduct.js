import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { CATEGORY_API, PRODUCT_API } from '../../Util';

export default function AddProduct() {
  let navigate = useNavigate();
  const [product, setProduct] = useState({
    image: '',
    name: '',
    category: '',
    brand: '',
    unit: '',
    unitValue: '',
    batchNumber: '',
    quantity: '',
    price: '',
    manufactureDate: '',
    expiryDate: '',
  });

  const { name, category,brand,unit, quantity, price,unitValue } = product;
  const [manufactureDate, setManufactureDate] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  
  const onInputChange = (e) => {
    const { name, value } = e.target;
  
    if (name === 'quantity' || name === 'unitValue' || name === 'price') {
      if (value < 0) {
        alert(`${name} cannot be a negative value`);
        return;
      }
    }
  
    if (name === 'manufactureDate') {
      setManufactureDate(value);
      if (expiryDate && value > expiryDate) {
        setExpiryDate('');
      }
    } else {
      if (manufactureDate && value < manufactureDate) {
        alert('Expiry date cannot be earlier than manufacture date');
      } else {
        setExpiryDate(value);
      }
    }
  
    setProduct({ ...product, [name]: value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post(PRODUCT_API, product);
    const formData = new FormData();
    formData.append('file', selectedFile);
    fetch('http://localhost:8080/api/images/upload', {
      method: 'POST',
      body: formData,
    });
    navigate('/productlist');
  };

 const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(CATEGORY_API);
      const options = response.data.map((row) => ({
         label: row.categoryType,
          value: row.id
         }));
      setOptions(options);
    };

    fetchData();
  }, []);


  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:8080/brand');
      const brands = response.data.map((row) => ({ label: row.brandName, value: row.id }));
      setBrands(brands);
    };

    fetchData();
  }, []);

  const handleFileInputChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <div className="container" style={{ marginLeft: '100px', marginTop: '100px' }}>
      <div className="row">
        <div className="col-md-8 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Add Product</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="Name" className="form-label">
                    Product Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter product name"
                    name="name"
                    value={name}
                    onChange={onInputChange}
                    required
                    pattern="^[a-zA-Z0-9 ]+$"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="Name" className="form-label">
                    Product Image
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    multiple
                    accept="image/*"
                    placeholder="Upload Image"
                    name="image"
                    required
                    onChange={handleFileInputChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="Category" className="form-label">
                    Select Category
                  </label>
                  <select
                    onChange={onInputChange}
                    className="form-select"
                    placeholder="---select category---"
                    name="category"
                    required
                    value={category}
                  >
                    <option value="">---select category---</option>
                    {options.map((option) => (
                      <option key={option.value} value={option.label}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="Quantity" className="form-label">
                    Quantity
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter quantity"
                    name="quantity"
                    value={quantity}
                    onChange={onInputChange}
                    required
                    pattern="^[0-9]+$"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="Unit" className="form-label">
                    Select Unit
                  </label>
                  <select
                    onChange={onInputChange}
                    className="form-select"
                    placeholder="---select Unit---"
                    name="unit"
                    required
                    value={unit}
                  >
                      <option value="">-- Select Unit --</option>
                      <option value="g">Grams (g)</option>
                      <option value="kg">Kilograms (kg)</option>
                      <option value="lb">Pounds (lb)</option>
                      <option value="oz">Ounces (oz)</option>
                      <option value="ml">Milliliters (ml)</option>
                      <option value="l">Liters (l)</option>
                      <option value="fl_oz">Fluid ounces (fl oz)</option>
                      <option value="each">Each</option>
                      <option value="dozen">Dozen</option>
                      <option value="pack">Pack</option>
                      <option value="set">Set</option>
                      <option value="bunch">Bunch</option>
                      <option value="bundle">Bundle</option>
                      <option value="bag">Bag</option>
                      <option value="box">Box</option>
                      <option value="carton">Carton</option>
                      <option value="case">Case</option>
                  </select>
                </div>  
              </div>
    
              <div className="col-md-6">
              <div className="mb-3">
                  <label htmlFor="Unit Value" className="form-label">
                    Unit Value
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter unitValue"
                    name="unitValue"
                    value={unitValue}
                    onChange={onInputChange}
                    required
                    pattern="^[0-9]+$"
                  />
                </div>
              <div className="mb-3">
                  <label htmlFor="Brand" className="form-label">
                    Select Brand
                  </label>
                  <select
                    onChange={onInputChange}
                    className="form-select"
                    placeholder="---select brand---"
                    name="brand"
                    required
                    value={brand}
                  >
                    <option value="">---select brand---</option>
                    {brands.map((brand) => (
                      <option key={brand.value} value={brand.lable}>
                        {brand.label}
                      </option>
                    ))}
                  </select>
                </div>


                <div className="mb-3">
                  <label htmlFor="Price" className="form-label">
                    Price
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter price"
                    name="price"
                    value={price}
                    onChange={onInputChange}
                    required
                    pattern="^[0-9]+$"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="manufactureDate" className="form-label">
                    Manufacture date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    placeholder="Enter manufacture date"
                    name="manufactureDate"
                    value={manufactureDate}
                    onChange={onInputChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="expiryDate" className="form-label">
                    Expiry date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    placeholder="Expiry date"
                    name="expiryDate"
                    value={expiryDate}
                    onChange={onInputChange}
                  />
                </div>
              </div>
            </div>

            <div className="text-center m-4">
              <button type="submit" className="btn btn-outline-primary mx-2">
                Save
              </button>
              <Link className="btn btn-outline-danger mx-2" to="/productlist">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}



