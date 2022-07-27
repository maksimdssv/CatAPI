import React from 'react';
import CatButton from "./CatButton";
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
        fetch('/breed/' + id).then(() => {
            props.clickAction("BreedInfo");
        })
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
                        if (props.type === "Breeds" || props.type === "Search") {
                            getBreedInfo(item.id);
                        }
                    }}>
                        <CatButton type={props.type} item={item} startState={props.startState}/>
                    </div>
                } else {
                    return null
                }
            })}
        </div>;
    });
}

export default CatDisplay;