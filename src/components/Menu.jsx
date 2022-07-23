import React from 'react';
import './Menu.css';
import Logo from "../images/Logo.png";
import Breeds from "../images/pet-breeds.png";
import Gallery from "../images/images-search.png";
import Voting from "../images/vote-table.png";
import MenuButton from "./MenuButton";

function Menu(props) {
    const sections = [
        {
            sectionImg: Voting,
            backgroundColor: "#B4B7FF",
            sectionName: "Voting"
        },
        {
            sectionImg: Breeds,
            backgroundColor: "#97EAB9",
            sectionName: "Breeds"
        },
        {
            sectionImg: Gallery,
            backgroundColor: "#FFD280",
            sectionName: "Gallery"
        }
    ];


    return <div className="menu">
        <img src={Logo} alt={"Logo img"}/>
        <div>
            <h1>Hi intern!</h1>
            <p className="greeting test">Welcome to MI 2022 Front-end test</p>
            <p className="greeting">Lets start using The Cat API</p>
            <div className="block">
                {sections.map((item, index) =>
                    <MenuButton key={index} img={item.sectionImg} backgroundColor={item.backgroundColor}
                                sectionName={item.sectionName} onClick={props.handleClick}
                                active={props.sectionName === item.sectionName}/>
                )}
            </div>
        </div>
    </div>
}

export default Menu;