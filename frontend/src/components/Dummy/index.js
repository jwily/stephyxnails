import React, { useEffect, useState } from 'react';

const testData = {
  name: "John",
  email: "john@test.com",
  instagram: "",
  sets: [
    {
      description: "Test One",
      shape: "s-coffin",
      left_sizes: "123",
      right_sizes: "123",
      tier: 1,
      images: []
    },
    {
      description: "Test Two",
      shape: "s-coffin",
      left_sizes: "123",
      right_sizes: "123",
      tier: 1,
      images: []
    }
  ]
}

const DummyComponent = () => {

  const [files, setFiles] = useState([]);

  useEffect(() => {
    console.log(files);
  }, [files])

  const prepareData = (data) => {

    const fileTree = {};
    const newSets = [];

    for (let [idx, set] of data.sets.entries()) {
      fileTree[idx] = [...set.images];
      newSets.push({ ...set, images: [] });
    }

    const newData = { ...data, sets: newSets };
    console.log(newData);
    console.log(fileTree);
    return [newData, fileTree]
  }

  const tryUpload = async () => {

    const formData = new FormData();

    const [newData, fileTree] = prepareData(testData);

    formData.append('json', new Blob([JSON.stringify(newData)], { type: 'application/json' }))

    Object.keys(fileTree).forEach(key => {
      fileTree[key].forEach((file, idx) => {
        const fieldName = `files_${key}_${idx}`;
        formData.append(fieldName, file);
      })
    })

    for (let [key, value] of formData.entries()) {
      console.log(key, value); // 'json', Blob { ... }
    }

    const res = await fetch('/api/orders/',
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

  const handleFileChange = (e) => {
    let files = Array.from(e.target.files)
    if (files.length > 0) {
      if (files.length > 3) {
        console.log('3 pictures allowed. Selecting first 3.')
        files = files.slice(0, 3);
      }
      setFiles(files);
    }
  }

  const addToData = (e, idx) => {
    testData.sets[idx].images = [...files];
    console.log(testData);
  }

  return (
    <div>
      <input
        type='file'
        accept='image/*'
        multiple
        onChange={handleFileChange}
        placeholder='Main Image Url'
      />
      <div className='space-x-5'>
        <button onClick={e => addToData(e, 0)}>Add to One</button>
        <button onClick={e => addToData(e, 1)}>Add to Two</button>
        <button onClick={tryUpload}>Upload</button>
      </div>
    </div>
  )

}

export default DummyComponent;
