import React, {useState} from 'react';
import './UploadImage.css';

function UploadImage(props) {
    const [selectedImg, setImg] = useState(new FormData());
    const [loadImg, setLoadImg] = useState(false);
    const [displayedImg, setDisplayImg] = useState(null);

    function uploadImg() {
        console.log(selectedImg);
        fetch('/upload', {
            method: 'POST',
            body: selectedImg // This is your file object
        }).then(
            response => response.json() // if the response is a JSON object
        ).then(
            success => console.log(success) // Handle the success response object
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
            <div className="upload-container">
                <input type="file" name="image" className="file-input" accept="image/*"
                       onChange={(e) => {
                           // selectedImg.delete("img");
                           const formData = new FormData();
                           formData.append("img", e.target.files[0]);
                           setImg(formData)
                           setDisplayImg(e.target.files[0]);
                       }}/>
                {!selectedImg &&
                <p className={"small-text"}><span>Drag here</span> your file or <span>Click here</span> to upload
                </p>}
                {displayedImg &&
                <img className="image" src={URL.createObjectURL(displayedImg)} alt="not found"/>}
            </div>
            <p className={"small-text"}>{!selectedImg.get("img") ? "No file selected " : "Image File Name: " + selectedImg.get("img").name}</p>
            {selectedImg && <button className={"upload-photo-btn" + (loadImg ? " active" : "")} onClick={() => {
                uploadImg();
                setLoadImg(true);
            }}>{loadImg ? " Uploading" : "Upload photo"}{loadImg && <div className={"loading"}/>}
            </button>}
        </div>
    </div>);
}

export default UploadImage;