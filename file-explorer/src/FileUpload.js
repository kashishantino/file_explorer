import React, { useState } from 'react';

function FileUpload() {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles([...selectedFiles, ...files]);
  };

  const renderFileInfo = () => {
    return selectedFiles.map((file, index) => {
      const { name, size } = file;
      const fileName = name.split('.').slice(0, -1).join('.');
      const fileSize = (size / 1024).toFixed(2); // Convert bytes to kilobytes

      return (
        <tr key={index}>
          <td>{fileName}</td>
          <td>{fileSize} KB</td>
          <td>
            <button onClick={() => handleInfoClick(file)}>Info</button>
          </td>
        </tr>
      );
    });
  };

  const handleInfoClick = (file) => {
    // Handle the Info button click event for a specific file here
    console.log('Info button clicked for:', file);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} multiple />
      <table>
        <thead>
          <tr>
            <th>File Name</th>
            <th>File Size</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {renderFileInfo()}
        </tbody>
      </table>
    </div>
  );
}

export default FileUpload;
