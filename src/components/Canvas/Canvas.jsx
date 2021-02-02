import React, { useEffect, useRef, useState, useCallback } from 'react';
import CanvasControls from './CanvasControls';
import CanvasHelper from './CanvasHelper';
import '@styles/Canvas.scss';

export default function Canvas (props) {
    const canvasRef = useRef(null);
    const modalRef = useRef(null);

    const [canvasHelper, _setCanvasHelper] = useState(null);
    const canvasHeplerRef = useRef(canvasHelper);
    const setCanvasHelper = (ch) => {
        canvasHeplerRef.current = ch;
        _setCanvasHelper(ch);
    }

    
    
    const zoom = (sign) => {
        canvasHeplerRef.current.scale(sign);
    }
    
    const handleEsc = useCallback((e) => {
        if(e.key === "Escape")
            props.onClose();
    }, [])
    
    const handleMouseMove = useCallback((e) => {
        if (e.buttons === 1) 
            canvasHeplerRef.current.move(e.movementX, e.movementY);
    }, [])

    const handleWindowResize = useCallback(() => {
        if (canvasRef.current)
            canvasHeplerRef.current.resize();
    })

    const handleMouseWheel = useCallback((e) => {
        e.preventDefault();
        zoom(Math.sign(e.deltaY));
    }, [])
    
    useEffect(() => {
        var canvCurr = canvasRef.current;
        setCanvasHelper(
            new CanvasHelper(
                canvCurr.getContext('2d'),
                props.openedItem.drawing,
                canvasRef
            )
        );

        window.addEventListener("resize", handleWindowResize);
        window.addEventListener("keydown", handleEsc);
        canvCurr.addEventListener('wheel', handleMouseWheel);
        canvCurr.addEventListener('mousemove', handleMouseMove);

        return function cleanup() {
            window.removeEventListener("resize", handleWindowResize);
            window.removeEventListener("keydown", handleEsc);
            canvCurr.removeEventListener('wheel', handleMouseWheel);
            canvCurr.removeEventListener('mousemove', handleMouseMove);    
        }
    }, [handleMouseWheel]);

    return (
        <div className="overlay" onClick={props.onClose}>
            <div className="modal canvas-modal"
                ref={modalRef} onClick={(e) => e.stopPropagation()}>
                <canvas id="canvas" ref={canvasRef} />
                <CanvasControls zoom={zoom} close={props.onClose} />
            </div>
        </div>
    );
}
