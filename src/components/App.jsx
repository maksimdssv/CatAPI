import React, {useState} from 'react';
import Menu from "./Menu";
import Start from './Start';
import "./App.css"
import Header from "./Header";
import Section from "./Section";

function App() {

    const [section, setSection] = useState("Start");
    const [stateHistory, setHistory] = useState(["Start"]);


    function handleClick(newSection) {
        if (newSection !== section) {
            setHistory([...stateHistory, newSection]);
            setSection(newSection);
        }
    }

    function goBack() {
        if (stateHistory.length < 2) {
            handleClick("Start");
        } else {
            const oldElement = stateHistory[stateHistory.length - 2];
            stateHistory.pop();
            stateHistory.pop();
            handleClick(oldElement);
        }


    }

    return (<div>
        <div className={"upload-background"}>

        </div>
        <div className="page">

            <Menu handleClick={handleClick} sectionName={section}/>
            <div className={section === "Start" ? 'invisible' : ""}>
                <Header handleClick={handleClick} sectionName={section}/>
                <Section sectionName={section} handleBack={goBack} handleClick={handleClick}/>
            </div>

            {section === "Start" && <Start/>}
        </div>
    </div>);
}

export default App;