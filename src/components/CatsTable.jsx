import React, {useEffect, useState} from 'react';
import './CatsTable.css';
import Title from './Title.jsx';
import CatDisplay from "./CatDisplay";
import Loader from "./Loader.jsx";

function CatsTable(props) {
    const [cats, setCats] = useState([]);
    const [loading, setLoad] = useState(true);
    const type = props.sectionType;


    useEffect(() => {
        handleSection(type)
    }, []);

    function handleSection(section) {
        if (section === "Search") {
            fetch('/breeds').then(res => res.json()).then((dataBreeds) => {
                console.log(dataBreeds.filter((item) => {
                    return item.name.includes(props.search)
                }));
                setCats(dataBreeds.filter((item) => {
                    return item.name.includes(props.search)
                }));
            }).then(() => {
                setLoad(false)
            });
        } else {
            fetch("/" + section).then(res => res.json()).then((res) => {
                console.log(res);
                const newCats = Promise.all(res.map((item) => {
                    return new Promise((resolve) => {
                        const newCats = {favId: item.id, url: item.image.url, id: item.image.id};
                        resolve(newCats);
                    })
                }));
                newCats.then((res) => {
                    setCats(res)
                });
            }).then(() => {
                setLoad(false);
            });
        }
    }

    return <div>
        <div className="flex-container">
            <Title sectionName={type} handleBack={props.handleBack}/>
        </div>
        {props.search && <p className="Search">Search results for: <span>{props.search}</span></p>}
        {loading ? <Loader/> :
            <CatDisplay cats={cats.reverse()} type={type} startState={(type === "favourites")}
                        clickAction={props.handleClick}/>}
    </div>
}

export default CatsTable;