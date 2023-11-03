import React, { useState } from 'react';

const DummyComponent = () => {
  const [image, setImage] = useState('')

  const tryUpload = async () => {

    const formData = new FormData();
    formData.append("image", image);
    formData.append("url", "https://www.cdrf.co/3.14/rest_framework.serializers/ModelSerializer.html");
    formData.append("set", 1);

    const res = await fetch('/api/setimages/',
      {
        method: 'POST',
        body: formData
      })

    if (res.ok) {
      console.log('it worked')
    } else {
      console.log('it borke')
    }
  }


  return (
    <div>
      <input
        type='file'
        accept='image/*'
        onChange={(e) => setImage(e.target.files[0])}
        placeholder='Main Image Url'
      />
      <button onClick={tryUpload}>Test</button>
    </div>
  )

}

export default DummyComponent;
