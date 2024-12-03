import { Button } from '@nextui-org/react';
import React, { useCallback,useState } from 'react';
import { useDropzone } from 'react-dropzone';

const DragPerson = ({label, onFileUpload}) => {
    const onDrop = useCallback((acceptedFiles) => {
        if (onFileUpload && acceptedFiles.length > 0) {
          const filesData = [];
        
          acceptedFiles.forEach((file) => {
            const reader = new FileReader();
        
            reader.onloadend = () => {
              const fileData = { 
                fileName: file.name, 
                base64: reader.result, 
                fileType: file.type,
                relativePath: file.webkitRelativePath // This will give the relative path within the folder
              };
      
              // Add file data to filesData array
              filesData.push(fileData);
      
              // Once all files are processed, trigger the file upload
              if (filesData.length === acceptedFiles.length) {
                onFileUpload(filesData); // Call the onFileUpload callback with the array of files
              }
            };
      
            reader.readAsDataURL(file); // Read file as Base64 string
          });
        }
      }, [onFileUpload]);
      
      
  

  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  return (
    <div
      {...getRootProps()}
      style={{
        border: isDragActive ?  '2px solid #0070f3': '2px dashed #0070f3',
        padding: '20px',
        textAlign: 'center',
        borderRadius: '10px',
        backgroundColor: isDragActive ? '#f2f2f2' : '#f2f2f2',
        opacity: isDragActive ? '70%' : '100%',
        position: 'relative',
        
      }}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <div>
        <p className='opacity-70 '>... שחרר את ה{label} כאן </p>
        <div className='h-1'></div>
        <div
        
          style={{
            padding: '10px 20px',

          }}
        >
           הוסף קבצים
        </div>
      </div>
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