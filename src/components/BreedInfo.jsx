import React, {useEffect, useState} from 'react';
import Title from "./Title";
import './BreedInfo.css';
import Loader from "./Loader.jsx";

function BreadInfo(props) {
    const [currentBreed, setCurrentBreed] = useState({});
    const [images, setImages] = useState([]);
    const [loading, setLoad] = useState(true);
    const [counter, setCounter] = useState(0);

    function getInfo() {
        fetch("/currentBreed").then(res => res.json()).then((data) => {
            setCurrentBreed(data.breed);
            setImages(data.images);
            console.log(data);
        }).then(() => {
            setLoad(false)
        });
    }

    useEffect(getInfo, []);

    return <div>
        <div className="flex-container">
            <Title sectionName={"Breeds"} alt={true} handleBack={props.handleBack}/>
            <div className="breedId">
                <p>{currentBreed.id}</p>
            </div>
        </div>
        <div className="pos-container">
            {loading && <Loader/>}
            <div className="cat-img">
                <img className="test-img" src={images[counter] !== undefined ? images[counter].url : ""} alt={"Cat"}/>
            </div>
            <div className="cat-selectors">
                {images.map((image, index) => <button
                    className={"small-selector" + (counter === index ? " active" : "")} value={index} onClick={(e) => {
                    setCounter(index)
                }}/>)}
            </div>
        </div>
        <div className="cat-info-container">
            <div className="breed-name-container">
                <p className="breed-name">{currentBreed.name}</p>
            </div>
            <p className="bred-for">{currentBreed.description}</p>
            <div className="flex-container">
                <div className="temperament-container">
                    <p>Temperament:</p>
                    <p className="description">{currentBreed.temperament}</p>
                </div>
                <div className="additional-description-container">
                    Origin: <span className="description">{currentBreed.origin}</span><br/><br/>
                    Weight: <span className="description">{!loading ? currentBreed.weight["metric"] : ""} kgs</span><br/><br/>
                    Life Span: <span className="description">{currentBreed["life_span"]} years </span>
                </div>
            </div>
        </div>

    </div>

}

export default BreadInfo;