import React, {useEffect, useState} from 'react';
import Title from './Title.jsx';
import CatDisplay from './CatDisplay.jsx';
import './Gallery.css';
import Loader from './Loader.jsx';


function Gallery(props) {
    const [loading, setLoad] = useState(true);
    const [breeds, setBreeds] = useState([]);
    const [currentBreed, setCurrentBreed] = useState("null");
    const [limit, setLimit] = useState(5);
    const [order, setOrder] = useState('RANDOM');
    const [type, setType] = useState('gif,jpg,png');
    const [images, setImages] = useState([]);
    const [loadImgs, setLoadImgs] = useState(true);

    function getAllBreeds(props) {
        fetch('/breeds').then(res => res.json()).then((dataBreeds) => {
            setBreeds(dataBreeds);
        }).then(() => {
            setLoad(false)
        });
    }

    function getImages() {
        setLoadImgs(true);
        fetch('/images/' + currentBreed + "/" + type + '/' + limit + '/' + order).then(res => res.json()).then(res => {
            setImages(res);
            console.log(res);
        }).catch(error => {
            console.log(error);
        }).then(() => {
            setLoadImgs(false)
        });
    }

    useEffect(getAllBreeds, []);
    useEffect(getImages, []);

    return <div>
        {loading && <Loader/>}
        <div className="flex-container">
            <Title sectionName={"Gallery"} handleBack={props.handleBack}/>
            <button className="upload-btn">Upload</button>
        </div>
        <div className="gallery-selectors">
            <div className="selector-container">
                <label className="gallery-label">Order</label>
                <select className="gallery-selector order-selector" onChange={(e) => {
                    setOrder(e.target.value)
                }}>
                    <option value="RANDOM">Random</option>
                    <option value="DESC">Desc</option>
                    <option value="ASC">Asc</option>
                </select>
            </div>
            <div className="selector-container">
                <label className="gallery-label">Type</label>
                <select className="gallery-selector" onChange={(e) => {
                    setType(e.target.value)
                }}>
                    <option value="gif,jpg,png">All</option>
                    <option value="jpg,png">Static</option>
                    <option value="gif">Animated</option>
                </select>
            </div>
            <div className="selector-container">
                <label className="gallery-label">Breed</label>
                <select name={"Breed"} className="gallery-selector" onChange={(e) => {
                    setCurrentBreed(e.target.value)
                }}>
                    <option value="">All breeds</option>
                    {breeds.map((breed, index) => <option key={index} value={breed.id}>{breed.name}</option>)}
                </select>
            </div>
            <div className="selector-container">
                <label className="gallery-label">Limit</label>
                <select className="gallery-selector limit-selector" onChange={(e) => {
                    setLimit(Number(e.target.value))
                }}>
                    <option value="5">5 items per page</option>
                    <option value="10">10 items per page</option>
                    <option value="15">15 items per page</option>
                    <option value="20">20 items per page</option>
                </select>
            </div>
            <button className="reload-btn" onClick={getImages}/>
        </div>
        <div>
            {loadImgs ? <Loader/> :
                <CatDisplay cats={images} type={"favourites"}/>}
        </div>

    </div>
}

export default Gallery;