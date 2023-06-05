import React, { useState } from 'react';
import './App.css';
import { Modal, Button } from 'react-bootstrap';

function formatFileSize(size) {
  if (size < 1024) {
    return `${size} bytes`;
  } else if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(2)} kB`;
  } else if (size < 1024 * 1024 * 1024) {
    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  } else {
    return `${(size / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  }
}

function FileList() {
  const [files, setFiles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const fileList = event.target.files;//list of file extracted by user
    const newFiles = Array.from(fileList).map((file) => ({
      name: file.name.replace(/\.[^/.]+$/, ''),
      extension: file.name.split('.').pop(),
      size: file.size,
      modifiedDate: file.lastModified, // Add the modified date property
    }));
    const sortedFiles = newFiles.sort((a, b) => a.extension.localeCompare(b.extension));
    setFiles(sortedFiles);
  };

  const handleInfoClick = (file) => {
    setSelectedFile(file);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const showTable = files.length > 0;

  return (
    <div className="container">
      {showTable && (
        <table>
          <thead>
            <tr>
              <th>File Name</th>
              <th>File Size</th>
              <th>Info</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file, index) => (
              <tr key={index}>
                <td>{file.name}</td>
                <td>{formatFileSize(file.size)}</td>
                <td>
                  <button onClick={() => handleInfoClick(file)}>Info</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showTable ? null : (
        <div className="file-upload">
          <input type="file" onChange={handleFileChange} multiple webkitdirectory="" directory="" />
        </div>
      )}

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>File Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>File Name: {selectedFile && selectedFile.name}</p>
          <p>File Extension: {selectedFile && selectedFile.extension}</p>
          <p>File Size: {selectedFile && formatFileSize(selectedFile.size)}</p>
          
          {/* Display additional information about the file */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default FileList;

