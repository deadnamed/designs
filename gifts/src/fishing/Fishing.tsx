//import React, {useState, useRef, useEffect} from 'react';
import './Fishing.css'
import FishingBar from './FishingBar';
import pond from '/src/assets/pond.png'

export interface FishingProps {
    style: any;
}

Fishing.defaultProps = {
    style: {},
}

export default function Fishing (props: FishingProps){
    props
    return (
    <div className="App" style={{
        backgroundColor: "#EEE7DA",
        position: "absolute",
        top: 0,
        left: 0,
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    }}>
        <img src={pond} style={{
            height: "25vh",
            width: "35vh",
            objectFit: 'cover',
            marginTop: -150,
        }}></img>
        <FishingBar />
    </div>
    )
}