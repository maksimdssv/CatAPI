import React from 'react';
import './MenuButton.css';

function MenuButton(props) {
    function receiveClick() {
        props.onClick(props.sectionName);
    }

    return <div className={"section" + (props.active ? " active" : "")} onClick={receiveClick}>
        <div className='section-img' style={{backgroundColor: props.backgroundColor}}>
            <img src={props.img} alt={"SectionButton Name"}/>
        </div>
        <button className={'btn'} name={props.sectionName} >
           {props.sectionName}
        </button>
    </div>

}

export default MenuButton;