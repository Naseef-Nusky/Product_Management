import React, { useState, useEffect } from 'react';

function ImageDisplay({ id }) {
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/images/${id}`)
      .then(response => {
        if (response.ok) {
          return response.blob();
        }
        throw new Error('Network response was not ok.');
      })
      .then(blob => {
        setImageData(URL.createObjectURL(blob));
      })
      .catch(error => console.error(error));
  }, [id]);

  if (imageData === null) {
    return <div>Loading...</div>;
  }

  return <img src={imageData} alt="Image" />;
}

export default ImageDisplay;
