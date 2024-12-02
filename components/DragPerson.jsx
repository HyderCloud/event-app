import { Button } from '@nextui-org/react';
import React, { useCallback,useState } from 'react';
import { useDropzone } from 'react-dropzone';

const DragPerson = ({label, onFileUpload}) => {
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
        padding: '20px',
        textAlign: 'center',
        borderRadius: '10px',
        backgroundColor: isDragActive ? '#f2f2f2' : '#f2f2f2',
        position: 'relative',
        
      }}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p className='opacity-70'>... שחרר את ה{label} כאן </p>
      ) : (
        <div>
          <p className='opacity-70'>
          גרור ושחרר את {label}  כאן, או לחץ כדי לבחור </p>
          <div className='h-1'></div>
          <Button
            onPress={() => document.querySelector('input[type="file"]').click()}
            style={{
              padding: '10px 20px',
              backgroundColor: '#0070f3',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
             הוסף קבצים
          </Button>
        </div>
      )}
    </div>
  );
};

export default DragPerson;