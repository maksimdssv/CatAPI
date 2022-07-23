import React, {useEffect, useState} from 'react'
import './Breeds.css';
import Title from "./Title";
import CatDisplay from "./CatDisplay";
import Loader from "./Loader";

function Breeds(props) {
    const [loading, setLoad] = useState(true);
    const [breeds, setBreeds] = useState([]);
    const [currentBreed, setCurrentBreed] = useState("");
    const [limit, setLimit] = useState(5);
    const [order, setOrder] = useState('asc');

    function getAllBreeds(props) {
        fetch('/breeds').then(res => res.json()).then((dataBreeds) => {
            setBreeds(dataBreeds);
        }).then(() => {
            setLoad(false)
        });
    }

    function handleOrder(props){
        setOrder((prevValue) => {
            if (prevValue === props){
                return props;
            }
            else {
                setBreeds(breeds.reverse());
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
                    {breeds.map((breed, index) => <option key={index} value={breed.name}>{breed.name}</option>)}
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
            <button className={"sort-btn descending" + (order === "desc" ? " active" : "")} onClick={() => {handleOrder("desc");}}/>
            <button className={"sort-btn ascending" + (order === "asc" ? " active" : "")} onClick={() => {handleOrder("asc")}}/>
        </div>
        <CatDisplay cats={breeds.filter((item) => {
            return item.name === (currentBreed === "" ? item.name : currentBreed);
        }).slice(0, limit)} breedName={true} clickAction={props.handleClick}/>
    </div>
}

export default Breeds;