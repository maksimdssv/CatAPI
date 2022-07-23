import React, {useState} from 'react';
import './VotingButtons.css';

function VotingButton(props) {
    function handleClick(e) {
        let name = e.target.name;
        if (name === "favourite") {
            if(props.clickedEffect === true){
                name += "-del";
            }
            props.setEffect((prev) => !prev)
        }
        props.handleVote(name);
    }


    return <button
        className={"voting-btn " + props.className + " " + (props.clickedEffect ? props.className + "-active" : "")}
        name={props.className} onClick={handleClick}/>
}

export default VotingButton;