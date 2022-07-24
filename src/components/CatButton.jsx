import React, {useState} from 'react';
import './CatButton.css';

function CatButton(props) {
    function addToFavourites(name) {
        fetch("/image/" + (clickedEffect ? name + "-del" : name) + "/" + item.id, {method: "POST",}).then(res => res.json());
        return new Promise((resolve => {
            resolve();
        }));
    }

    const [clickedEffect, setEffect] = useState(props.startState);
    const type = props.type;
    const item = props.item;
    switch (type) {
        case "Search":
        case "Breeds":
            return <div className="cat-wrapper">
                <img className="test-img" src={item.img !== undefined ? item.img.url : ""} alt="cat"/>

                <div className={"cat-name-container"}>
                    <button className={"cat-btn cat-name-btn"}>{item.name}</button>
                </div>
            </div>
        case "favourites":
            return <div className="cat-wrapper">
                <img className="test-img" src={item.url} alt="cat"/>

                <div className={"cat-name-container fav-icon-container"}>
                    <button className={"cat-btn fav-icon" + (clickedEffect ? " active" : "")}
                            name={"favourite"}
                            onClick={(e) => {
                                addToFavourites(e.target.name).then(() => setEffect((e) => !e));
                            }}/>
                </div>
            </div>
        default:
            return <div className="cat-wrapper">
                <img className="test-img" src={item.url} alt="cat"/>

                <div className={"cat-name-container invisible"}>
                    <button className={"cat-btn"}/>
                </div>
            </div>
    }
}

export default CatButton;