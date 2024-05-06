import React, {useState, useRef, useEffect} from 'react';
import './CircularText.css'

export interface CircularTextProps {
    style: any;
    text: string;
    author: string;
    scale: number;
    shown: boolean;
    kill: any;
}

CircularText.defaultProps = {
    style: {},
    text: "pas you're so cute",
    author: "chloe",
    scale: 1,
    shown: false,
    kill: ()=>{},
}



export default function CircularText (props: CircularTextProps){
    const testLengthRef = React.useRef<HTMLParagraphElement>(null!)
    const rotationPeriod = 40*props.scale*(Math.random()/5+0.9)
    return (
        <div className='rotationWrapper' style={{
            height: "100vh",
            width: "100vw",
            position: 'absolute',
            animation: `rotate ${rotationPeriod}s linear infinite`,
            display: props.shown ? "block" : "none",
        }}>
            <p id="test" ref={testLengthRef} style={{
                opacity: 0,
            }}>{props.text + " - " + props.author}</p>
            <svg viewBox="0 0 100 100" width="200" height="100" style={{
                position: "absolute",
                height: 250,
                width: 250,
                bottom: 0,
                right: 0,
                color: "#000000",
                transform: `translate(50%, 50%) scale(${props.scale*3})`,
            }}>
                <defs>
                    <path id="circle"
                    d="
                        M 50, 50
                        m -37, 0
                        a 37,37 0 1,1 74,0
                        a 37,37 0 1,1 -74,0"
                    />
                </defs>
                <text fontSize={`${2/props.scale}`}>
                    <textPath xlinkHref="#circle">
                        {props.text+"   -"+" "}
                        {props.author}
                    </textPath>
                </text>
            </svg>
        </div>
    )
}