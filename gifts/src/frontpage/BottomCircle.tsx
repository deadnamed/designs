import React, {useState, useRef, useEffect} from 'react';
import './BottomCircle.css'
import anime from 'animejs';
import staticAnimation from '../assets/static.gif'
import reactLogo from '../assets/react.svg'

export interface BottomCircleProps {
    style: any;
    links: any;
}

BottomCircle.defaultProps = {
    style: {},
    links: [
        {"droppingOn": "Wed 8/5/24", "name": "fishery", "dropped": true, "imageLink":"https://source.unsplash.com/random?interior", "link":"/fishing"},
        {"droppingOn": "Wed 8/5/24", "name": "locked", "dropped": false, "imageLink":"https://source.unsplash.com/random?interior", "link":"/fishing"},
        {"droppingOn": "Wed 8/5/24", "name": "locked", "dropped": false, "imageLink":"https://source.unsplash.com/random?interior", "link":"/fishing"},
        {"droppingOn": "Wed 8/5/24", "name": "locked", "dropped": false, "imageLink":"https://source.unsplash.com/random?interior", "link":"/fishing"},
        {"droppingOn": "Wed 8/5/24", "name": "locked", "dropped": false, "imageLink":"https://source.unsplash.com/random?interior", "link":"/fishing"},
        {"droppingOn": "Wed 8/5/24", "name": "locked", "dropped": false, "imageLink":"https://source.unsplash.com/random?interior", "link":"/fishing"},
        {"droppingOn": "Wed 8/5/24", "name": "locked", "dropped": false, "imageLink":"https://source.unsplash.com/random?interior", "link":"/fishing"}
    ]
}

export default function BottomCircle (props: BottomCircleProps){
    const circleRef = useRef<HTMLDivElement>(null!)
    const [expanded, setExpanded] = React.useState(false)
    let key=0
    const imageDOM = props.links.map((link: any)=>(
        <div className='SubCircle' style={{
            clipPath: "circle(50% at 50% 50%)",
            height: 200,
            width: 200,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: `translate(-50%, -50%) rotate(${360*key/props.links.length}deg) translateY(-250px) rotate(-${360*key/props.links.length}deg)`,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#000000",
        }} key={key++} onClick={()=>{
            if(link.dropped){
            window.location.href = window.location.origin + link.link
            }
        }}>
            <div style={{
                animation: `rotate-reverse 20s linear infinite`,
                zIndex: 2,
            }}>
                <p style={{
                    zIndex: 2,
                    fontSize: 30,

                }}>
                    {link.name}
                </p>
                <p style={{
                    zIndex: 2,
                    fontSize: 10,
                    
                }}>
                    dropping on {link.droppingOn}
                </p>
            </div>
            <img className='image' src={link.dropped?link.imageLink:staticAnimation} style={{
                height: "100%",
                width: "100%",
                animation: `rotate-reverse 20s linear infinite`,
                objectFit: 'cover',
                filter: 'brightness(50%)',
                position: "absolute",
            }}>
                
            </img>
        </div>
    ))
    const normalize = (x: number, y:number, r:number)=>{
        return [x*(r)/Math.sqrt(x*x+y*y), y*(r)/Math.sqrt(x*x+y*y)]
    }
    React.useEffect(()=>{
        document.body.addEventListener('touchstart', (e)=>{
            anime({
                targets: '.BottomCircleContainer',
                bottom: `${normalize(e.changedTouches[0].screenX / 10, e.changedTouches[0].screenY / 10, 20)[0]}px`, 
                right: `${normalize(e.changedTouches[0].screenX / 10, e.changedTouches[0].screenY / 10, 20)[1]}px`,
                duration: 800
            });
        })
        document.body.addEventListener('touchmove', (e)=>{
            anime({
                targets: '.BottomCircleContainer',
                bottom: `${normalize(e.changedTouches[0].screenX / 10, e.changedTouches[0].screenY / 10, 20)[0]}px`, 
                right: `${normalize(e.changedTouches[0].screenX / 10, e.changedTouches[0].screenY / 10, 20)[1]}px`,
                duration: 800
            });
        })
        document.body.addEventListener('touchend', ()=>{
            anime({
                targets: '.BottomCircleContainer',
                bottom: `${0}px`, 
                right: `${0}px`,
                duration: 800
            });
        })


    })
    return (
        <div className="BottomCircleContainer" style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            animation: "rotate 20s linear infinite",
            zIndex: 10,
        }}>
            <div ref={circleRef} className='BottomCircle' style={{...{
                position: "absolute",
                height: expanded?800:250,
                width: expanded?800:250,
                backgroundColor: expanded?"#caba9c44":"#4D2D16",
                backdropFilter: "blur(5px)",
                bottom: 0,
                right: 0,
                clipPath: "circle(50% at 50% 50%)",
                transform: "translate(50%, 50%)",
                transitionDuration: "1s",
            }, ...props.style}}  >
                {imageDOM}
                <div className='UnexpandedBottomCircle' style={{...{
                    position: "absolute",
                    height: 250,
                    width: 250,
                    backgroundColor: "#4D2D16",
                    bottom: "50%",
                    right: "50%",
                    clipPath: "circle(50% at 50% 50%)",
                    transform: "translate(50%, 50%)",
                    transitionDuration: "1s",
                    zIndex: 2,
                }, ...props.style}}  onClick={()=>{setExpanded(expanded => !expanded)}}>
                    
                </div>
            </div>
        </div>
    )
}