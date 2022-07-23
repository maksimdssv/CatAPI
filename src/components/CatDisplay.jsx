import React from 'react';
import './CatDisplay.css';

function CatDisplay(props) {
    const cats = props.cats;
    if (cats.length === 0) {
        return (<div className="not-found">No item found</div>);
    }
    let newCats = [];
    for (let i = 0; i < cats.length / 5; i++) {
        newCats.push(cats.slice(5 * i, 5 + 5 * i));
    }

    function getBreedInfo(id) {
        fetch('/breed/' + id).then(() => {props.clickAction("BreedInfo")})
    }

    function addToFavourites(){

    }

    function handleSection(isSection, item){
        if(isSection){
            return <div className="cat-wrapper">
                <img className="test-img" src={item.img !== undefined ? item.img.url : ""} alt="cat image"/>

                <div className={"cat-name-container" + (props.breedName ? "" : " fav-icon-container")}>
                    <button className={"cat-btn" + (props.breedName ? " cat-name-btn" : " fav-icon")}
                            name={props.breedName ? "BreedInfo" : ""}>{item.name}</button>
                </div>
            </div>
        }
        else{
            return <div className="cat-wrapper">
                <img className="test-img" src={item.url} alt="cat image"/>

                <div className={"cat-name-container fav-icon-container"}>
                    <button className={"cat-btn fav-icon"}/>
                </div>
            </div>
        }
    }

    return newCats.map((catArr, arrIndex) => {
        let reverse = '';
        if (arrIndex % 2 === 1) {
            reverse = ' reverse';
        }
        return <div key={arrIndex} className={"cat-pics" + reverse}>
            {catArr.map((item, index) => {
                if (item !== undefined) {
                    let additionalClasses = "";
                    if (index % 5 === 0) {
                        additionalClasses += 'mid-cat';
                    } else if (index % 4 === 0) {
                        additionalClasses += 'big-cat' + (reverse !== '' ? " bg-rev" : "");
                    }
                    return <div key={index} className={"cat " + additionalClasses} onClick={() => {
                        if(props.breedName !== undefined){
                            getBreedInfo(item.id);
                        }
                        else{
                         addToFavourites();
                        }
                    }}>
                        {handleSection(props.breedName, item)}
                    </div>
                }
            })}
        </div>;
    });
}

export default CatDisplay;