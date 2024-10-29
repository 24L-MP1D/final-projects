'use client';

import { useState } from 'react';

const CLOUDINARY_CLOUD_NAME = 'deyylvaoy';
const CLOUDINARY_UPLOAD_PRESET = 'xnhpft2k';

export default function Page() {
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      const data = new FormData();
      data.append('file', file);
      data.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

      setLoading(true);

      fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`, {
        method: 'post',
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setImageUrl(data.secure_url);
          setLoading(false);
        })
        .catch((err) => {
          alert('An Error Occured While Uploading');
        });
    }
  };

  return (
    <div>
      <input disabled={loading} type="file" onChange={handleUpload} />
      <button>Upload</button>
      {imageUrl && <img src={imageUrl} alt="" />}
    </div>
  );
}
