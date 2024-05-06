import React, {useState, useRef, useEffect} from 'react';
import './FishingBar.css'
import FishingMarker from './FishingMarker';


export interface FishingBarProps {
    style: any;
    length: number;
    markers: number;
}

FishingBar.defaultProps = {
    style: {},
    length: 2,
    markers: 2,
}

export default function FishingBar (props: FishingBarProps){
    const leniency = 50 //50ms between markers
    const movingMarkerRef = React.useRef<HTMLDivElement>(null!)
    const [markers, setMarkers] = React.useState<any>([])
    const [markerPlacements, setMarkerPlacements] = React.useState<any>([])
    const [markerDOMLeft, setMarkerDOMLeft] = React.useState<any>([])
    const playing = React.useRef(0);
    const generate = () => {
        let newMarkerPlacements = []
        for(let i = 0; i < props.markers; i++){
            newMarkerPlacements.push(Math.random() * (props.length*1000 - leniency*(props.markers+1)))
        }
        newMarkerPlacements.sort()
        for(let i = 0; i < props.markers; i++){
            newMarkerPlacements[i] += leniency*i
        }
        setMarkerPlacements(newMarkerPlacements)
        let newMarkers: any = newMarkerPlacements.map((timestamp)=>(
            <FishingMarker left={timestamp/10}/>
        ))
        setMarkers(newMarkers)
    }

    const reset_animation = ()=>{
        playing.current = 1
        var el = movingMarkerRef.current;
        el.style.animation = 'none';
        el.offsetHeight; /* trigger reflow */
        el.style.animation = `play ${props.length+1}s linear forwards`; 
        setTimeout(()=>{playing.current = 0}, (props.length+1)*1000)
    }

    const play = () => {
        if(playing.current == 0){
            console.log('played')
            playing.current=1
            reset_animation()
            setTimeout(()=>{playing.current = 0}, (props.length+1)*1000)
        }
        else{
            console.log(movingMarkerRef.current.getBoundingClientRect().left)
        }
        // movingMarkerRef.current.style.transitionDuration="0s"
        // setTimeout(()=>{movingMarkerRef.current.style.left = "0%";}, 10)
        // setTimeout(()=>{movingMarkerRef.current.style.transitionDuration=`${props.length}s`}, 20)
        // setTimeout(()=>{movingMarkerRef.current.style.left = "100%";}, 30)
        // setTimeout(()=>{playing.current=0}, props.length*1000)

    }

    React.useEffect(()=>{
        generate()
    }, [])
    
    return (
        <div className='FishingBar' style={{...{
            height: 25,
            width: props.length*100+100,
            background: "linear-gradient(90deg, rgba(108,76,76,1) 0%, rgba(67,75,38,1) 52%, rgba(22,60,17,1) 100%)",
            position: "relative",
        }, ...props.style}} onClick={play}>
            {markers}
            <div ref={movingMarkerRef} className='MovingFishingMarker' style={{...{
                height: 30,
                width: 3,
                backgroundColor: "#FFFFFF",
                position: "absolute",
                top: "50%",
                left: 0,
                transform: "translate(0%, -50%)",
                animation: "",
            }, ...props.style}}>

            </div>
        </div>
    )
}