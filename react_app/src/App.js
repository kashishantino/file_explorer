import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileList, setFileList] = useState([]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append('files', file);
    });

    try {
      await axios.post('http://localhost:8000/api/files/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Files uploaded successfully.');
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };

  const fetchFileList = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/files/');
      setFileList(response.data);
    } catch (error) {
      console.error('Error fetching file list:', error);
    }
  };

  const showFileInfo = (file) => {
    alert(`File Name: ${file.filename}\nFile Size: ${file.size} bytes\nFile Extension: ${file.extension}`);
  };

  return (
    <div>
      <h1>File Explorer</h1>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <button onClick={fetchFileList}>Fetch File List</button>
      <table>
        <thead>
          <tr>
            <th>File Name</th>
            <th>File Size</th>
            <th>Info</th>
          </tr>
        </thead>
        <tbody>
          {fileList.map((file) => (
            <tr key={file.id}>
              <td>{file.filename}</td>
              <td>{file.size} bytes</td>
              <td>
                <button onClick={() => showFileInfo(file)}>Info</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
