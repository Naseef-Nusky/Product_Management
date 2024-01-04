import React, { useEffect, useState } from "react";
import axios from "axios";
import { BRAND_API } from "../../Util";

/**
 * This component will show the brand list
 * @returns the Brandlist component
 */
export default function Brandlist() {
  const [brands, setBrands] = useState([]);

  // Loading brands on mount.
  useEffect(() => {
    loadBrands();
  }, []);

  // Function to load brands
  const loadBrands = async () => {
    const result = await axios.get(BRAND_API);
    setBrands(result.data);
  };


 // Conformation for delete a record.
  const deleteBrand = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this brand?"
    );
    if (confirmDelete) {
      await axios.delete(`http://localhost:8080/brand/${id}`);
      loadBrands();
    }
  };

  return (
    <div style={{ marginLeft: '250px', marginTop: '65px'  }}>
      <div className="container">
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Brand Name</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {brands.map((brands, index) => (
              <tr>
                <th scope="row" key={index}>
                  {index + 1}
                </th>
                <td>{brands.brandName}</td>
                <td>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteBrand(brands.id)}
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
