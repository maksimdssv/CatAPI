import React from 'react';
import SmallButton from "./SmallButton";
import './Title.css';


function Title(props) {
    return <div className="title-container">
        <SmallButton className={"back-btn"} handleClick={props.handleBack}/>
        <div className={"title-name" + (props.alt ? " title-name-alt" : "")}>
            <p className="title">{props.sectionName}</p>
        </div>
    </div>
}

export default Title;