import React, {useState} from 'react';
import './UploadImage.css';

function UploadImage(props) {
    const [selectedImg, setImg] = useState(new FormData());
    const [loadImg, setLoadImg] = useState(false);
    const [displayedImg, setDisplayImg] = useState(null);
    const [error, setError] = useState(false);
    const [response, setResponse] = useState(false);

    function uploadImg() {
        fetch('/upload', {
            method: 'POST',
            body: selectedImg // This is your file object
        }).then(
            response => response.json() // if the response is a JSON object
        ).then(
            res => {
                setLoadImg(false);
                setResponse(true);
                if (res.status === 400) {
                    setError(true);
                } else {
                    setDisplayImg(null);
                }
            }
        ).catch(
            error => console.log(error) // Handle the error response object
        );
    }

    return (<div className={"upload-background"}>
        <div className="upload-menu">
            <button className={"close-btn"} onClick={() => {
                setImg(new FormData());
                props.setUpload(false)
            }}/>
            <p className={"upload-text"}>Upload a .jpg or .png Cat Image</p>
            <a href="https://thecatapi.com/privacy" className={"small-text rules"}>Any uploads must comply with the
                upload guidelines or face deletion.</a>
            <div className={"upload-container" + (error ? " error" : "")}>
                <input type="file" name="image" className="file-input" accept="image/*"
                       onChange={(e) => {
                           const formData = new FormData();
                           formData.append("img", e.target.files[0]);
                           setImg(formData)
                           setError(false);
                           setResponse(false);
                           setDisplayImg(e.target.files[0]);
                       }}/>
                {!displayedImg &&
                <p className={"small-text"}><span>Drag here</span> your file or <span>Click here</span> to upload
                </p>}
                {displayedImg &&
                <img className="image" src={URL.createObjectURL(displayedImg)} alt="not found"/>}
            </div>
            <p className={"small-text"}>{!displayedImg ? "No file selected " : "Image File Name: " + displayedImg.name}</p>
            {displayedImg && !response &&
            <button className={"upload-photo-btn" + (loadImg ? " active" : "")} onClick={() => {
                uploadImg();
                setLoadImg(true);
            }}>{loadImg ? " Uploading" : "Upload photo"}{loadImg && <div className={"loading"}/>}
            </button>}
            {response &&
            <div className={"response" + (error ? " error" : "")}>
                <p>{!error ? "Thanks for the Upload - Cat found!" : "No Cat found - try a different one"}</p>
            </div>}
        </div>
    </div>);
}

export default UploadImage;