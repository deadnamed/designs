import React, {useState, useRef, useEffect} from 'react';
import './PointIndicator.css'
import anime from 'animejs';

export interface PointIndicatorProps {
    style: any;
    color: string;
    left: number;
    score: number;
}

PointIndicator.defaultProps = {
    style: {},
    color: '#ff0000',
    left: 0,
    score: 100,
}

export default function PointIndicator (props: PointIndicatorProps){
    const pointIndicatorRef = React.useRef<HTMLDivElement>(null!)

    React.useEffect(()=>{
        anime({
            'targets': '.PointIndicator',
            'height': '20px',
            'width': '20px',
        })
        anime({
            'targets': '.PointMarker',
            'height': '15px',
            'width': '3px',
        })
    }, [])

    return (
    <div ref={pointIndicatorRef} className='PointIndicator' style={{...{
        height: 0,
        width: 0,
        borderRadius: 20,
        backgroundColor: props.color,
        position: "absolute",
        top: "50%",
        left: props.left,
        transform: "translate(-50%, -50%) translateY(25px)"
    }, ...props.style}}>
        <div className='PointMarker' style={{...{
        height: 3,
        width: 3,
        backgroundColor: props.color,
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, 0%) translateY(-25px)"
        }, ...props.style}}>

        </div>
    </div>
    )
}