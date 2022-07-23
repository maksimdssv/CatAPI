import React, {useState} from 'react';
import './Header.css';
import Button from './Button';
import SmallButton from './SmallButton';

function Header(props) {
    const [searchInput, setInput] = useState('');

    function handleClick(e) {
        props.handleClick(e);
    }

    function handleSearch(e) {
        setInput(e.target.value);
    }

    const emojis = [
        {
            img: "likes",
            alt: "Smiley face"
        },
        {
            img: "favourites",
            alt: "Heart emoji"
        },
        {
            img: "dislikes",
            alt: "Sad face"
        }

    ];

    return <div className="heading-container">
        <div style={{position: 'relative', marginRight: "5px"}}>
            <input type="text" className="input" placeholder="Search for breads by name" onChange={handleSearch}
                   value={searchInput}/>
            <SmallButton className={"search-btn"} handleClick={() => {
                handleClick({name: "Search", search: searchInput});
            }}/>
        </div>
        {emojis.map((item, index) => (<Button key={index} active={props.sectionName === item.img} img={item.img} onClick={() => {
            handleClick(item.img)
        }}/>))
        }
    </div>
}

export default Header;