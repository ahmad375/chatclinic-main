import React, { useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import pdfToText from 'react-pdftotext'

const MyDropzone = ({setPdfContent, selectedFile, setSelectedFile}) => {

  const InputChange = (event) => {
    let file = event.target.files[0];
    if(file){
      setSelectedFile(file);
      pdfToText(file)
        .then(text => {
          setPdfContent(text);
          console.log(text);
        })
        .catch(error => console.error("Failed to extract text from pdf"))
    }else {
      setSelectedFile(null);
      setPdfContent('')
    }
    // if(!file.name.endsWith('pdf')) console.log('error');
  };

  return (
    <div className="kb-data-box">
      <form>
        <div className="kb-file-upload">
          <div className="file-upload-box">
            <input
              type="file"
              id="fileupload"
              accept="application/pdf"
              className="file-upload-input"
              onChange={InputChange}
            />
            <AiOutlineCloudUpload style={{width:'100%', height:'25px'}}/>
            <p style={{fontSize:'16px', lineHeight:'23px'}}>
              <span className="file-link">Click to upload</span>
              &nbsp;or drop your file here
            </p>
            <div style={{fontSize:'13px'}}>
              <p style={{marginBottom:'3px'}}>Upload PDF File For New Document</p>
            </div>
          </div>
        </div>
        {selectedFile && 
          <div className="file-atc-box">
            <div className="file-detail">
              <p style={{fontSize:'15px',color:'#475f7b'}}>{selectedFile.name}</p>
              <p onClick={()=>setSelectedFile(null)} className="deleteFile">×</p>
            </div>
            <div className="progress-bar">
              <div className="progress-bar-fill"></div>
            </div>
          </div>
        }
      </form>
    </div>
  );
};

export default MyDropzone;