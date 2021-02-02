import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTimes } from '@fortawesome/free-solid-svg-icons'

function CanvasControls(props) {
    return (
        <div className="controls" id="controls">
            <button className="control" onClick={props.close}>
                <FontAwesomeIcon icon={faTimes} />
            </button>
            <button className="control" onClick={() => props.zoom(-1)}>
                <FontAwesomeIcon icon={faPlus} />
            </button>
            <button className="control" onClick={() => props.zoom(+1)}>
                <FontAwesomeIcon icon={faMinus}/>
            </button>
        </div>
    );
}

export default CanvasControls;
