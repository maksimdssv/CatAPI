import React, {useEffect, useState} from 'react'
import './Breeds.css';
import Title from "./Title";
import CatDisplay from "./CatDisplay";
import Loader from "./Loader";

function Breeds(props) {
    const [loading, setLoad] = useState(true);
    const [cats, setCats] = useState([]);
    const [currentBreed, setCurrentBreed] = useState("");
    const [limit, setLimit] = useState(5);
    const [order, setOrder] = useState('asc');
    const [breeds] = useState([]);
    const [i, setI] = useState(0);

    function getAllBreeds() {
        fetch('/breeds').then(res => res.json()).then((dataBreeds) => {
            setCats(dataBreeds);
            dataBreeds.forEach((item) => {
                breeds.push(item.name);
            });
        }).then(() => {
            setLoad(false);
        });
    }

    function handleOrder(props) {
        setOrder((prevValue) => {
            if (prevValue === props) {
                return props;
            } else {
                setCats(cats.reverse());
                return props;
            }
        });
    }

    useEffect(getAllBreeds, []);

    return <div>
        {loading && <Loader/>}
        <div className='flex-container'>

            <Title sectionName={"Breeds"} handleBack={props.handleBack}/>
            <div className="selectors">
                <select name={"Breed"} className="select-all select-breeds" onChange={(e) => {
                    setCurrentBreed(e.target.value)
                }}>
                    <option value="">All breeds</option>
                    {breeds.map((breed, index) => <option key={index} value={breed}>{breed}</option>)}
                </select>
                <select name={"Limit"} className="select-all select-limit" onChange={(e) => {
                    setLimit(Number(e.target.value))
                }}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                </select>
            </div>
            <button className={"sort-btn descending" + (order === "desc" ? " active" : "")} onClick={() => {
                handleOrder("desc");
            }}/>
            <button className={"sort-btn ascending" + (order === "asc" ? " active" : "")} onClick={() => {
                handleOrder("asc")
            }}/>
        </div>
        <CatDisplay cats={cats.filter((item) => {
            return item.name === (currentBreed === "" ? item.name : currentBreed);
        }).slice(limit * i, limit * (i + 1))} type={"Breeds"} clickAction={props.handleClick}/>
        <div className="btn-container">
            <button className="page-btn prev" onClick={() => {
                setI((e) => (e === 0 ? e : e - 1))
            }}>Prev
                <div className={"tess"}/>
            </button>
            <button className="page-btn next" onClick={() => {
                setI((e) => e + 1)
            }}><p>Next</p>
            </button>
        </div>
    </div>
}

export default Breeds;