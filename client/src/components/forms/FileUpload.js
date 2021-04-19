import React from 'react';
import Resizer from 'react-image-file-resizer';
import axios from 'axios';
import { useSelector } from 'react-redux';

const FileUpload = ({ values, setValues, setLoading }) => {
    const { user } = useSelector((state) => ({...state}));

    const fileUploadAndResize = (e) => {
        //console.log(e.target.files);
        //resize:
        let files = e.target.files;
        let allUploadedFiles =  values.images;

        if(files) {
            setLoading(true);
            for (let i=0; i<files.length; i++) {
                Resizer.imageFileResizer(files[i], 720, 720, 'JEPG', 100, 0, (uri) => {
                    //console.log(uri)
                    axios.post(
                        `${process.env.REACT_APP_API}/uploadimages`, 
                        {image: uri}, 
                        {
                            headers: {
                                authoken: user ? user.token : ""
                            }
                        }
                    )
                    .then(res => {
                        console.log('Image Upload res data', res);
                        setLoading(false);
                        allUploadedFiles.push(res.data);
                        setValues({...values, images: allUploadedFiles });
                    })
                    .catch()
                }, 'base64');
            }
        }
        //send back to server to upload to cloudinary
        //set url to images[] in the parent component - ProductCreate
    };

    return (
        <div className="row">
            <label className="btn btn-primary btn-raised">
                Choose File
                <input 
                    type="file" 
                    multiple
                    hidden 
                    accept="images/*" 
                    onChange={fileUploadAndResize}
                    >
                </input>
            </label>
        </div>
    );
}

export default FileUpload;