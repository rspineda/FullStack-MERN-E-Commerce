import React from 'react';

const FileUpload = () => {

    const fileUploadAndResize = () => {
        //
    };

    return (
        <div className="row">
            <label>Choose File</label>
            <input 
                type="file" 
                multiple 
                accept="images/*" 
                onChange={fileUploadAndResize}
                >
            </input>
        </div>
    );
}

export default FileUpload;