import React from 'react';
import './FishingBar.css'
import FishingMarker from './FishingMarker';
import PointIndicator from './PointIndicator';
import anime from 'animejs';
import ItemPopup from './ItemPopup';
import {items} from './Data.js'



export interface FishingBarProps {
    style: any;
    length: number;
    markers: number;
}

FishingBar.defaultProps = {
    style: {},
    length: 2,
    markers: 3,
}

export default function FishingBar (props: FishingBarProps){
    const leniency = 50 //50ms between markers
    const movingMarkerRef = React.useRef<HTMLDivElement>(null!)
    const typeMarkerRef = React.useRef<HTMLDivElement>(null!)
    const barRef = React.useRef<HTMLDivElement>(null!)
    const [markers, setMarkers] = React.useState<any>([])
    const [pointIndicators, setPointIndicators] = React.useState<any>([])
    const [markerPlacements, setMarkerPlacements] = React.useState<any>([])
    const [markerDOMLeft, setMarkerDOMLeft] = React.useState<any>([])
    const [itemPopups, setItemPopups] = React.useState<any>(<></>)
    const [score, setScore] = React.useState(0)
    const nonStateScore = React.useRef(0)
    const [playing, setPlaying] = React.useState(0);
    const barLeft = React.useRef(0);
    const barRight = React.useRef(0);
    const difference = React.useRef(0);
    const clicks = React.useRef(0);
    const difficulty = Math.sqrt(props.markers)*2;
    const data = items;

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
            <FishingMarker left={timestamp/10+50}/>
        ))
        for(let i = 0; i < newMarkers.length; i++){
            newMarkerDomLeft.push(newMarkers[i].props.left+barLeft.current)
        }
        console.log(newMarkerDomLeft, barLeft.current)
        setMarkerDOMLeft(newMarkerDomLeft)
        setMarkers(newMarkers)
    }

    const reset_animation = ()=>{
        setPlaying(1)
        var el = movingMarkerRef.current;
        el.style.animation = 'none';
        el.offsetHeight; /* trigger reflow */
        el.style.animation = `play ${props.length+1}s ease-in-out forwards`; 
        setTimeout(()=>{setPlaying(-1)}, (props.length+1)*1000)
    }

    const get_type = (location: number) => {
        //console.log("score", nonStateScore.current)
        //console.log(location)
        //console.log("legendary upper limit: ", 100/((100*(props.markers*100-nonStateScore.current)/(props.markers*100))/((props.markers/difficulty)+1)))
        //console.log("rare upper limit: ", (100/((100*(props.markers*100-nonStateScore.current)/(props.markers*100))/((props.markers/difficulty)+1)))+(100/((100*(props.markers*100-nonStateScore.current)/(props.markers*100))/((4*props.markers/difficulty)+1))))
        //console.log("uncommon upper limit: ", (100/((100*(props.markers*100-nonStateScore.current)/(props.markers*100))/((props.markers/difficulty)+1)))+(100/((100*(props.markers*100-nonStateScore.current)/(props.markers*100))/((4*props.markers/difficulty)+1)))+(100/((100*(props.markers*100-nonStateScore.current)/(props.markers*100))/((9*props.markers/difficulty)+1))))
        if (location<100/((100*(props.markers*100-nonStateScore.current)/(props.markers*100))/((props.markers/difficulty)+1))){
            return("legendary")
        }
        if (location<(100/((100*(props.markers*100-nonStateScore.current)/(props.markers*100))/((props.markers/difficulty)+1)))+(100/((100*(props.markers*100-nonStateScore.current)/(props.markers*100))/((4*props.markers/difficulty)+1)))){
            return("rare")
        }
        if (location<(100/((100*(props.markers*100-nonStateScore.current)/(props.markers*100))/((props.markers/difficulty)+1)))+(100/((100*(props.markers*100-nonStateScore.current)/(props.markers*100))/((4*props.markers/difficulty)+1)))+(100/((100*(props.markers*100-nonStateScore.current)/(props.markers*100))/((9*props.markers/difficulty)+1)))){
            return("uncommon")
        }
        if (location<(100/((100*(props.markers*100-nonStateScore.current)/(props.markers*100))/((props.markers/difficulty)+1)))+(100/((100*(props.markers*100-nonStateScore.current)/(props.markers*100))/((4*props.markers/difficulty)+1)))+(100/((100*(props.markers*100-nonStateScore.current)/(props.markers*100))/((9*props.markers/difficulty)+1)))+(100/((100*(props.markers*100-nonStateScore.current)/(props.markers*100))/((36*props.markers/difficulty)+1)))){
            return("common")
        }
        return("trash")
    }

    const play = () => {
        if(playing == 0){
            setScore(0)
            nonStateScore.current=0
            clicks.current = 0
            setPointIndicators([])
            generate()
            markerPlacements
            // console.log('played', markerPlacements)
            difference.current=0
            setPlaying(1)
            reset_animation()
            setTimeout(()=>{
                const typeSelection = Math.random()*400
                console.log(get_type(typeSelection))
                const type = get_type(typeSelection)
                
                setTimeout(()=>{
                    anime({
                        targets: '.TypeFishingMarker',
                        height: '30px',
                        left: `${typeSelection}px`,
                    })
                }, 1000)
                //alert(difference.current+(props.markers-Math.min(clicks.current, props.markers))*100);
                setTimeout(()=>{
                    //@ts-ignore
                    const element=data[type][Math.floor(Math.random()*11)]
                    console.log(element["image_link"])
                    setItemPopups(<ItemPopup type={type} prefix={element["prefix"]} name={element["name"]} description={element["description"]} imageLink={element["image_link"]} close={()=>{setItemPopups(<></>)}}/>)
                    setPlaying(0) 
                    console.log(playing)
                }, 2000)
            }, (props.length+1)*1000)
            anime({
                targets: '.TypeFishingMarker',
                height: '0px',
                left: '0px',
            })
        }
        if(playing==1){
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
                nonStateScore.current = nonStateScore.current + 100 - min
            }
            else{
                setScore(score-min)
                nonStateScore.current = nonStateScore.current - min
            }

            //console.log(score)

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
                if(64<score){
                    return rgbToHex(getColorFromGradient([218, 86, 220], [218, 86, 86],  (Math.min(score, 100)-64)/36))
                }
                if(16<score && score<=64){
                    return rgbToHex(getColorFromGradient([218, 86, 86], [126, 222, 166], (score-16)/48))
                }
                if(4<score && score<=16){
                    return "#7EDEA6"
                }
                if(0<score && score<=4){
                    return "#4C64C4"
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

        document.body.addEventListener('touchstart', ()=>{
            anime({
                targets: '.MovingFishingMarker',
                height: `${45}px`,
                duration: 800
            });
        })
        document.body.addEventListener('touchend', ()=>{
            anime({
                targets: '.MovingFishingMarker',
                height: `${30}px`,
                duration: 800
            });
        })
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
        }, ...props.style}} 
        
        >
            <div className='hitbox' style={{
                position: 'fixed',
                top: 0,
                left: 0,
                height: "100vh",
                width: "100vw",
            }} onTouchStart={play}>

            </div>
            <div style={{
                height: "fit-content"
            }}>
                {markers}
                <div ref={movingMarkerRef} className='MovingFishingMarker' style={{...{
                    height: 30,
                    width: 3,
                    backgroundColor: "#000000",
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
                display: "flex",
                marginTop: 120,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <div className='AccuracyBar' style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <p style={{
                        color: "#4d2d16",
                        whiteSpace: "nowrap",
                        margin: 5,
                    }}>accuracy: </p>
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
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <p style={{
                        color: "#4d2d16",
                        whiteSpace: "nowrap",
                        margin: 5,
                    }}>reward type: </p>
                    <div className="rewardBar" style={{
                        height: 10,
                        width: (playing==1)?0:400,
                        borderRadius: 10,
                        backgroundColor: "#222222",
                        position: "relative",
                        transitionDuration: "1s",
                    }}>
                        <div ref={typeMarkerRef} className='TypeFishingMarker' style={{...{
                            height: 30,
                            width: 3,
                            backgroundColor: "#000000",
                            position: "absolute",
                            top: "50%",
                            left: 100,
                            transform: "translate(0%, -50%)",
                            animation: "",
                            zIndex: 2,
                        }, ...props.style}}>

                        </div>
                        <div className="rewardDisplayBar" style={{
                            height: 10,
                            width: (playing==1)?0:400,
                            borderRadius: 10,
                            backgroundColor: "#222222",
                            position: "relative",
                            overflow: "hidden",
                            transitionDuration: "1s",
                        }}>
                        <div className='LegendaryBar' style={{
                            height: 10,
                            width: 100/((100*(props.markers*100-score)/(props.markers*100))/((props.markers/difficulty)+1)),
                            borderRadius: 10,
                            overflow: "hidden",
                            transitionDuration: "1s",
                            backgroundColor: "#d590dd",
                            position: "absolute",
                            top: 0,
                            left: 0,
                            zIndex: 0,
                        }}>
                        </div>
                        <div className='RareBar' style={{
                            height: 10,
                            width: 100/((100*(props.markers*100-score)/(props.markers*100))/((4*props.markers/difficulty)+1)),
                            borderRadius: 10,
                            overflow: "hidden",
                            transitionDuration: "1s",
                            backgroundColor: "#4C64C4",
                            position: "absolute",
                            top: 0,
                            left: 100/((100*(props.markers*100-score)/(props.markers*100))/((props.markers/difficulty)+1)),
                            zIndex: 0,
                        }}>
                        </div>
                        <div className='UncommonBar' style={{
                            height: 10,
                            width: 100/((100*(props.markers*100-score)/(props.markers*100))/((9*props.markers/difficulty)+1)),
                            borderRadius: 10,
                            overflow: "hidden",
                            transitionDuration: "1s",
                            backgroundColor: "#CCE8CC",
                            position: "absolute",
                            top: 0,
                            left: 100/((100*(props.markers*100-score)/(props.markers*100))/((4*props.markers/difficulty)+1))+100/((100*(props.markers*100-score)/(props.markers*100))/((props.markers/difficulty)+1)),
                            zIndex: 0,
                        }}>
                        </div>
                        <div className='CommonBar' style={{
                            height: 10,
                            width: 100/((100*(props.markers*100-score)/(props.markers*100))/((25*props.markers/difficulty)+1)),
                            borderRadius: 10,
                            overflow: "hidden",
                            transitionDuration: "1s",
                            backgroundColor: "#EBDA8E",
                            position: "absolute",
                            top: 0,
                            left: 100/((100*(props.markers*100-score)/(props.markers*100))/((9*props.markers/difficulty)+1))+100/((100*(props.markers*100-score)/(props.markers*100))/((4*props.markers/difficulty)+1))+100/((100*(props.markers*100-score)/(props.markers*100))/((props.markers/difficulty)+1)),
                            zIndex: 0,
                        }}>
                        </div>
                        <div className='TrashBar' style={{
                            height: 10,
                            width: 400,
                            borderRadius: 10,
                            overflow: "hidden",
                            transitionDuration: "1s",
                            backgroundColor: "#601C1C",
                            position: "absolute",
                            top: 0,
                            left: 100/((100*(props.markers*100-score)/(props.markers*100))/((25*props.markers/difficulty)+1))+100/((100*(props.markers*100-score)/(props.markers*100))/((9*props.markers/difficulty)+1))+100/((100*(props.markers*100-score)/(props.markers*100))/((4*props.markers/difficulty)+1))+100/((100*(props.markers*100-score)/(props.markers*100))/((props.markers/difficulty)+1)),
                            zIndex: 0,
                        }}>
                        </div>
                        </div>

                    </div>
                </div>
            </div>
            {itemPopups}
        </div>
    )
}