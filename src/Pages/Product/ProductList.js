//correct code
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { PRODUCT_API } from "../../Util";

/**
 * This component will show the product list 
 * @returns the Product component
 */
function Product() {
  // Define state variables "products" and "filteredProducts" using useState hook.
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // useEffect hook is used to load products on the initial render.
  useEffect(() => {
    loadProducts();
  }, []);

  // This function loads products from the server and updates the "products" state variable.
  const loadProducts = async () => {
    const result = await axios.get(PRODUCT_API);
    setProducts(result.data);
    setFilteredProducts(result.data);
  };

  // Confirmation for deleting a record.
  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (confirmDelete) {
      await axios.delete(`http://localhost:8080/api/images/${id}`);
      await axios.delete(`http://localhost:8080/product/${id}`);
      loadProducts();
    }
  };

  // Helper function to determine if the quantity is below the reorder level.
  const isBelowReorderLevel = (quantity, reorderLevel) => {
    return quantity < reorderLevel;
  };

  // Function to handle search/filter by category
  const handleSearch = (event) => {
    const keyword = event.target.value;
    if (keyword !== null && keyword !== undefined) {
      const filtered = products.filter(product => product.category && product.category.toLowerCase().includes(keyword.toLowerCase()));
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  };
  
  // Function to check if a product is expired
  const isExpired = (expiryDate) => {
    const currentDate = new Date().toISOString().split("T")[0]; // Get the current date
    return expiryDate < currentDate; // Check if expiry date is less than current date
  };
  
  // Function to get the batch number for each product with the same name, brand, unit, and unit value
  const getBatchNumber = (product) => {
    const sameProducts = products.filter(p =>
      p.name === product.name &&
      p.brand === product.brand &&
      p.unit === product.unit &&
      p.unitValue === product.unitValue
    );
    return sameProducts.indexOf(product) + 1;
  };

  // This component renders the list of products.
  return (
    <div style={{ marginLeft: '250px', marginTop: '65px' }}>
      <div className="container">
        <div className="d-flex justify-content-end mb-2">
          <input
            type="text"
            placeholder="Search by category"
            onChange={handleSearch}
            className="form-control"
            style={{ width: '200px' }}
          />
        </div>
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Image</th>
              <th scope="col">Name</th>
              <th scope="col">Brand</th>
              <th scope="col">Category</th>
              <th scope="col">Quantity</th>
              <th scope="col">UnitValue</th>
              <th scope="col">Price</th>
              <th scope="col">Manufacture Date</th>
              <th scope="col">Expiry Date</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>
                  <img
                    src={`http://localhost:8080/api/images/${product.id}`}
                    width="100"
                    height="100"
                    style={{ borderRadius: '50%', border: '2px solid black' }}
                  />
                </td>
                {/* <td>{product.name}<br/>{getBatchNumber(product) > 1 ? ` (Batch ${getBatchNumber(product)})` : ''}</td> */}
                <td>
                    {product.name}<br/>
                    {getBatchNumber(product) > 1 ? (
                      <span style={{ color: 'blue' }}> (Batch {getBatchNumber(product)})</span>
                    ) : null}
                </td>
                <td>{product.brand}</td>
                <td>{product.category}</td>
                <td>
                  {product.quantity === 0 ? (
                    <span style={{ color: 'red' }}>Out of Stock</span>
                  ) : (
                    <>
                      {product.quantity}
                      <br/>
                      {isBelowReorderLevel(product.quantity, 20) ? (
                        <span style={{ marginLeft: '5px', color: 'orange' }}>
                          (Depleted)
                        </span>
                      ) : null}
                    </>
                  )}
                </td>
                <td>{product.unitValue}{product.unit}</td>
                <td>{product.price}</td>
                <td>{product.manufactureDate}</td>
                <td>{product.expiryDate}
                  <br/>
                  {isExpired(product.expiryDate) ? (
                    <span style={{ color: 'green' }}>Expired</span>
                  ) : null}
                </td>
                <td>
                  <Link className="btn btn-outline-primary mx-2" to={`/editProduct/${product.id}`}>Edit</Link>
                  <button className="btn btn-danger mx-2" onClick={() => deleteProduct(product.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Product;
