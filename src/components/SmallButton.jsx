import React from 'react';
import './SmallButton.css';

function SmallButton(props) {
    return <button onClick={props.handleClick} className={"small-button " + props.className}/>
}

export default SmallButton;