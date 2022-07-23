import React, {useEffect, useState} from 'react';
import Title from './Title.jsx';
import VotingButton from './VotingButton.jsx';
import UserLog from './UserLog.jsx';
import './Voting.css';
import Loader from './Loader.jsx';

function Voting(props) {
    const [image, setImage] = useState({});
    const [clickedEffect, setEffect] = useState(false);
    const [loading, setLoad] = useState(true);

    function getNewImage() {
        fetch("/image").then((response) => response.json()).then((newImage => setImage((prevImg) => {
            if(newImage.id !== prevImg.id){
                setEffect(false);
            }
            return newImage;
        }))).then(() => {setTimeout(() => {setLoad(false)
        }, 250)});
    }

    useEffect(() => {
        getNewImage();
        getLogs();
        }, []);

    function getLogs(){
        fetch("/logs").then((response) => response.json().then((logs) =>setLogs(logs)));
    }

    const [logs, setLogs] = useState([]);

    function handleVote(e) {
        const imgId = image.id;
        if(e !== "favourite" && e !== "favourite-del"){
            setLoad(true);
        }
        fetch("/image/" + e + '/' + imgId, {method: "POST",}).then((res) => res.json()).then((data) => {
            if(data.code === 200){
                getLogs();
                getNewImage();
            }
        });
    }

    return <div>
        <Title sectionName={"Voting"} handleBack={props.handleBack}/>
        <div className="pos-container">
            {loading && <Loader />}
            <div className="cat-img">
                <img className="test-img" src={image.url} alt={"Cat"}/>
            </div>
            <div className="voting-container">
                <div className="voting-buttons">
                    <VotingButton className={'like'} handleVote={handleVote}/>
                    <VotingButton className={'favourite'} handleVote={handleVote} clickedEffect={clickedEffect} setEffect={setEffect}/>
                    <VotingButton className={'dislike'} handleVote={handleVote}/>
                </div>
            </div>
        </div>
        <div className="user-logs">
            {logs.map((log, index) => <UserLog key={index} time={log.time} imageId={log.imageId} action={log.action}
                                               emojiName={log.emojiName}/>
            )
            }
        </div>
    </div>
}

export default Voting;