import React from 'react';
import './CatsTable.css';
import Header from './Header.jsx';
import Title from './Title.jsx';
import CatDisplay from "./CatDisplay";

function CatsTable(props) {
    const type = props.sectionType;
    const test = [1, 1, 1];

    return <div>
        <div className="flex-container">
            <Title sectionName={type} handleBack={props.handleBack}/>
        </div>
        {props.search && <p className="Search">Search results for: <span>{props.search}</span></p>}
        <CatDisplay cats={test} breedName={props.search ? props.search : null}/>
    </div>
}

export default CatsTable;