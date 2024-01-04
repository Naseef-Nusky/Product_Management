
import React, { useState } from 'react';
import axios from 'axios';

function Delete() {
  const [id, setId] = useState('');
  const [message, setMessage] = useState('');

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/images/${id}`);
      setMessage(response.data);
    } catch (error) {
      setMessage(error.response.data);
    }
  };

  return (
    <div>
      <h1>Delete an Image</h1>
      <input type="text" placeholder="Enter ID" value={id} onChange={(e) => setId(e.target.value)} />
      <button onClick={handleDelete}>Delete</button>
      <p>{message}</p>
    </div>
  );
}

export default Delete;
