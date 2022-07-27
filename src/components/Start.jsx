import React from 'react';
import './Start.css';
import StartImg from '../images/girl-and-pet.png';

function Start() {


    return <div className="background-container">
        <div className="background">
            <div className="img-container">
                <img src={StartImg} alt={"Girl with pet"} className="girl-img"/>
            </div>
        </div>
    </div>;
}

export default Start;