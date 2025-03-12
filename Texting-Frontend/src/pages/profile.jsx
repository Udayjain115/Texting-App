import React, { useState } from 'react';

const profile = () => {
  const [image, setImage] = useState(null);

  const onProfileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };
  return (
    <div>
      <input
        type="file"
        accept=".png"
        onChange={onProfileChange}></input>
      {image && (
        <img
          className="profile-image"
          alt="preview image"
          src={image}></img>
      )}
    </div>
  );
};

export default profile;
