//import React, {useState, useRef, useEffect} from 'react';
import './FishingMarker.css'

export interface FishingMarkerProps {
    style: any;
    left: number;
    color: string;
}

FishingMarker.defaultProps = {
    style: {},
    left: 0,
    color: "#000000",
}

export default function FishingMarker (props: FishingMarkerProps){
    return (
    <div className='FishingMarker' style={{...{
        height: 20,
        width: 3,
        backgroundColor: props.color,
        position: "absolute",
        top: "50%",
        left: props.left,
        transform: "translate(0%, -100%)"
    }, ...props.style}}>

    </div>
    )
}