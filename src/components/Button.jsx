import React from 'react';
import './Button.css';

function Button(props) {
    return <button className={"Button " + props.img + (props.active ? " active" : "")} onClick={props.onClick}>
    </button>
}

export default Button;