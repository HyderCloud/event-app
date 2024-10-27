import React, { useCallback,useState } from 'react';
import { useDropzone } from 'react-dropzone';

const DragAndDrop = ({label, onFileUpload}) => {
  const onDrop = useCallback((acceptedFiles) => {
    if (onFileUpload && acceptedFiles.length > 0) {
      const file = acceptedFiles[0]; // Get the first file in the array
      const reader = new FileReader();
      
      reader.onloadend = () => {
        onFileUpload(reader.result); // Pass Base64 string to onFileUpload callback
      };
      
      reader.readAsDataURL(file); // Read the file as a Base64-encoded string
    }
  }, [onFileUpload]);
  

  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*', 
  });

  return (
    <div
      {...getRootProps()}
      style={{
        border: '2px dashed #0070f3',
        padding: '50px',
        textAlign: 'center',
        borderRadius: '10px',
        backgroundColor: isDragActive ? '#27272A' : '#27272A',
        position: 'relative',
        color: 'white',
        
      }}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p className='opacity-70'>... שחרר את ה{label} כאן </p>
      ) : (
        <div>
          <p className='opacity-70'>
          גרור ושחרר את {label} ההפקה כאן, או לחץ כדי לבחור </p>
          <div className='h-5'></div>
          <button
            onClick={() => document.querySelector('input[type="file"]').click()}
            style={{
              padding: '10px 20px',
              backgroundColor: '#0070f3',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
             הוסף   {label}
          </button>
        </div>
      )}
    </div>
  );
};

export default DragAndDrop;