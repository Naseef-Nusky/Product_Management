import React, { useEffect, useState } from "react";
import axios from "axios";
import { CATEGORY_API } from "../../Util";

/**
 * This component will show the category list
 * @returns the Categorylist component
 */
export default function Categorylist() {
  const [categories, setCategories] = useState([]);

  // Loading categories on mount.
  useEffect(() => {
    loadCategories();
  }, []);

  // Function to load categories
  const loadCategories = async () => {
    const result = await axios.get(CATEGORY_API);
    setCategories(result.data);
  };


 // Conformation for delete a record.
  const deleteCategory = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (confirmDelete) {
      await axios.delete(`http://localhost:8080/category/${id}`);
      loadCategories();
    }
  };

  return (
    <div style={{ marginLeft: '250px', marginTop: '65px'  }}>
      <div className="container">
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Category Types</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((categories, index) => (
              <tr>
                <th scope="row" key={index}>
                  {index + 1}
                </th>
                <td>{categories.categoryType}</td>
                <td>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteCategory(categories.id)}
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
