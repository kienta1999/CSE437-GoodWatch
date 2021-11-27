import { useState, useEffect, useContext, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { OverlayTrigger, Popover, Button, Tooltip, Overlay } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';

import UpdateLists from "./UpdateLists.jsx";

import { getLists, checkList, removeFromList, addToList } from "../data/lists";
import UserContext from "../context/UserContext.js";

const HoverList = ({ movieid, style, setShow2, onHomePage, setUpdateMsg }) => {
    const { currUser, setUser } = useContext(UserContext);

    const [show, setShow] = useState(false);

    const target = useRef(null);

    const setVisibility = async (event) => {
        setShow(!show)
        setShow2(!show)
    };
    
    return (
        <div>
        {onHomePage ? (
            <span className="smallerBlackCircle" ref={target} style={style} onClick={setVisibility}>
                {!show && (
                    <FontAwesomeIcon className="list-icon homePageIcon" icon={faList}/>
                )}
                {show && (
                    <FontAwesomeIcon className="list-icon homePageIcon" icon={faTimes}/>
                )}
            </span>
        ) : (
            <span className="blackCircle" ref={target} style={style} onClick={setVisibility}>
                {!show && (
                    <FontAwesomeIcon className="list-icon" icon={faList}/>
                )}
                {show && (
                    <FontAwesomeIcon className="list-icon" icon={faTimes}/>
                )}
            </span>
        )}
        
        <Overlay target={target.current} show={show} placement="bottom">
            {(props) => (
            <Tooltip id="overlay-example" {...props}>
                <UpdateLists movieid={movieid} setOverlayVisibility={setVisibility} setUpdateMsg={setUpdateMsg}/>
            </Tooltip>
            )}
        </Overlay>
        
        </div>
      );
    };
    
export default HoverList;