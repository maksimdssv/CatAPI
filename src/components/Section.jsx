import React, {useState} from 'react';
import './Section.css';
import BreedInfo from "./BreedInfo";
import Voting from "./Voting";
import Gallery from "./Gallery";
import Breeds from "./Breeds";
import CatsTable from "./CatsTable";

function Section(props) {
    const sectionName = props.sectionName;

    const [searchInput, setInput] = useState('')

    return <div>
        {sectionName === "Gallery" && <Gallery handleBack={props.handleBack}/>}
        {sectionName === "Voting" && <Voting handleBack={props.handleBack}/>}
        {sectionName === "BreedInfo" && <BreedInfo handleBack={props.handleBack}/>}
        {sectionName === "Breeds" && <Breeds handleBack={props.handleBack} handleClick={props.handleClick}/>}
        {(sectionName === "likes" || sectionName === "favourites" || sectionName === "dislikes") &&
        <CatsTable sectionType={sectionName} handleBack={props.handleBack}/>}
        {sectionName.name === "Search" &&
        <CatsTable handleBack={props.handleBack} sectionType={sectionName.name} search={sectionName.search}/>}
    </div>
}

export default Section;