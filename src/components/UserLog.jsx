import React from 'react';
import './UserLog.css';

function UserLog(props) {
    return <div className="log-container">
        <div className='time'>
            {props.time}
        </div>
        <div className="log">
            Image ID: <span className="imgID">{props.imageId}</span> was {props.action}
        </div>
        <div className={"emoji " + props.emojiName + "-small"} />
    </div>
}

export default UserLog;