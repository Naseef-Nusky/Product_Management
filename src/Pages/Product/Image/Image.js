import React, { useState } from 'react';

function ImageUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', selectedFile);
    fetch('http://localhost:8080/api/images/upload', {
      method: 'POST',
      body: formData,
    })
  };

  const handleFileInputChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Choose an image to upload:
        <input type="file" name="file" onChange={handleFileInputChange} />
      </label>
      <button type="submit">Upload</button>
    </form>
  );

  }
export default ImageUpload;
