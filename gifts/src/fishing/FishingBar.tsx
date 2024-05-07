import React, {useState, useRef, useEffect} from 'react';
import './FishingBar.css'
import FishingMarker from './FishingMarker';
import PointIndicator from './PointIndicator';


export interface FishingBarProps {
    style: any;
    length: number;
    markers: number;
}

FishingBar.defaultProps = {
    style: {},
    length: 7,
    markers: 12,
}

export default function FishingBar (props: FishingBarProps){
    const leniency = 50 //50ms between markers
    const movingMarkerRef = React.useRef<HTMLDivElement>(null!)
    const barRef = React.useRef<HTMLDivElement>(null!)
    const [markers, setMarkers] = React.useState<any>([])
    const [pointIndicators, setPointIndicators] = React.useState<any>([])
    const [markerPlacements, setMarkerPlacements] = React.useState<any>([])
    const [markerDOMLeft, setMarkerDOMLeft] = React.useState<any>([])
    const [score, setScore] = React.useState(0)
    const playing = React.useRef(0);
    const barLeft = React.useRef(0);
    const barRight = React.useRef(0);
    const difference = React.useRef(0);
    const clicks = React.useRef(0);
    const generate = () => {
        let newMarkerPlacements = []
        let newMarkerDomLeft = []
        for(let i = 0; i < props.markers; i++){
            newMarkerPlacements.push(Math.random() * (props.length*1000 - leniency*(props.markers+1)))
        }
        newMarkerPlacements.sort((a, b) => a - b)
        console.log(newMarkerPlacements)
        for(let i = 0; i < props.markers; i++){
            newMarkerPlacements[i] += leniency*i
        }
        console.log(newMarkerPlacements)
        setMarkerPlacements(newMarkerPlacements)
        let newMarkers: any = newMarkerPlacements.map((timestamp)=>(
            <FishingMarker left={timestamp/10}/>
        ))
        for(let i = 0; i < newMarkers.length; i++){
            newMarkerDomLeft.push(newMarkers[i].props.left+barLeft.current)
        }
        console.log(newMarkerDomLeft, barLeft.current)
        setMarkerDOMLeft(newMarkerDomLeft)
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
            setScore(0)
            clicks.current = 0
            setPointIndicators([])
            generate()
            console.log('played')
            difference.current=0
            playing.current=1
            reset_animation()
            setTimeout(()=>{playing.current = 0; alert(difference.current+(props.markers-Math.min(clicks.current, props.markers))*100)}, (props.length+1)*1000)
        }
        else{
            const currentPos = movingMarkerRef.current.getBoundingClientRect().left
            clicks.current++
            let min = 1000000
            for (let i = 0; i < markerDOMLeft.length; i++){
                if(Math.abs(markerDOMLeft[i]-currentPos) < min){
                    min = Math.abs(markerDOMLeft[i]-currentPos)
                }
            }
            difference.current += min
            if(clicks.current <= props.markers){
                setScore(score + 100 - min)
            }
            else{
                setScore(score - min)
            }

            console.log(score)

            const getColorFromGradient = (color1: number[], color2: number[], weight: any) => {
                var w1 = weight;
                var w2 = 1 - w1;
                var rgb = [Math.round(color1[0] * w1 + color2[0] * w2),
                    Math.round(color1[1] * w1 + color2[1] * w2),
                    Math.round(color1[2] * w1 + color2[2] * w2)];
                return rgb;
            }

            function componentToHex(c: any) {
                var hex = c.toString(16);
                return hex.length == 1 ? "0" + hex : hex;
            }
              
            function rgbToHex(a: any) {
                return "#" + componentToHex(a[0]) + componentToHex(a[1]) + componentToHex(a[2]);
            }

            const getColor: any = (score: number) => {
                if(20<score && score<=100){
                    return rgbToHex(getColorFromGradient([255, 0, 0], [0, 255, 0], (Math.min(score, 100)-20)/100))
                }
                if(0<score && score<=20){
                    return rgbToHex(getColorFromGradient([0, 255, 0], [0, 0, 255], (Math.min(score, 20))/20))
                }
            }

            const newIndicator = (
                <PointIndicator color={getColor(min)} left={movingMarkerRef.current.getBoundingClientRect().left-barLeft.current} score={min} style={{
                    zIndex: 3,
                }}/>
            )
            setPointIndicators([...pointIndicators, ...[newIndicator]])
        }
        // movingMarkerRef.current.style.transitionDuration="0s"
        // setTimeout(()=>{movingMarkerRef.current.style.left = "0%";}, 10)
        // setTimeout(()=>{movingMarkerRef.current.style.transitionDuration=`${props.length}s`}, 20)
        // setTimeout(()=>{movingMarkerRef.current.style.left = "100%";}, 30)
        // setTimeout(()=>{playing.current=0}, props.length*1000)

    }

    React.useEffect(()=>{
        const barBox = movingMarkerRef.current.getBoundingClientRect()
        barLeft.current = barBox.left
        barRight.current = barBox.right
        generate()
    }, [])
    
    return (
        <div className='FishingBar' ref={barRef} style={{...{
            height: 25,
            width: props.length*100+100,
            background: "linear-gradient(90deg, rgba(108,76,76,1) 0%, rgba(67,75,38,1) 52%, rgba(22,60,17,1) 100%)",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
        }, ...props.style}} onClick={play}>
            <div style={{
                height: "fit-content"
            }}>
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
                {pointIndicators}
            </div>

            <div className="pointDisplay" style={{
                display: "block",
                marginTop: 120,
            }}>
                <div className="backgroundBar" style={{
                    height: 10,
                    width: 400,
                    borderRadius: 10,
                    backgroundColor: "#222222",
                }}>
                    <div className='maskBar' style={{
                        height: 10,
                        width: 400*score/(props.markers*100),
                        borderRadius: 10,
                        overflow: "hidden",
                        transitionDuration: "1s",
                    }}>
                    <div className="foregroundBar" style={{
                        height: 10,
                        width: 400,
                        borderRadius: 10,
                        background: "linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(0,255,0,1) 80%, rgba(0,0,255,1) 100%)",
                    }}>
                        
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}