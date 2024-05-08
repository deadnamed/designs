import React from 'react';
import './TopCircle.css'
import anime from 'animejs/lib/anime.es.js';

export interface TopCircleProps {
    style: any;
    imageLinks: string[];
}

TopCircle.defaultProps = {
    style: {},
    imageLinks: ["https://source.unsplash.com/random", "https://source.unsplash.com/random", "https://source.unsplash.com/random", "https://source.unsplash.com/random", "https://source.unsplash.com/random", "https://source.unsplash.com/random", "https://source.unsplash.com/random", "https://source.unsplash.com/random", "https://source.unsplash.com/random", "https://source.unsplash.com/random", "https://source.unsplash.com/random", "https://source.unsplash.com/random"]
}

export default function TopCircle (props: TopCircleProps){
    const circleRef = React.useRef<HTMLDivElement>(null!)
    let key=0
    const imageDOM = props.imageLinks.map((image)=>(
        <div className='SubCircle' style={{
            clipPath: "circle(50% at 50% 50%)",
            height: 125,
            width: 125,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: `translate(-50%, -50%) rotate(${360*key/props.imageLinks.length}deg) translateY(300px) rotate(-${360*key/props.imageLinks.length}deg)`,
            display: "block",
        }} key={key++}>
            <div className='image' style={{
                background: `url(${image})`,
                height: "100%",
                width: "100%",
                animation: `rotate-reverse 120s linear infinite`,
            }}>

            </div>
        </div>
    ))
    const normalize = (x: number, y:number, r:number)=>{
        return [x*(r)/Math.sqrt(x*x+y*y), y*(r)/Math.sqrt(x*x+y*y)]
    }
    React.useEffect(()=>{
        document.body.addEventListener('touchstart', (e)=>{
            anime({
                targets: '.TopCircle',
                top: `${normalize(e.changedTouches[0].screenX / 10, e.changedTouches[0].screenY / 10, 20)[1]}px`, 
                left: `${normalize(e.changedTouches[0].screenX / 10, e.changedTouches[0].screenY / 10, 20)[0]}px`,
                duration: 800
            });
        })
        document.body.addEventListener('touchmove', (e)=>{
            anime({
                targets: '.TopCircle',
                top: `${normalize(e.changedTouches[0].screenX / 10, e.changedTouches[0].screenY / 10, 20)[1]}px`, 
                left: `${normalize(e.changedTouches[0].screenX / 10, e.changedTouches[0].screenY / 10, 20)[0]}px`,
                duration: 800
            });
        })
        document.body.addEventListener('touchend', ()=>{
            anime({
                targets: '.TopCircle',
                top: `${0}px`, 
                left: `${0}px`,
                duration: 800
            });
        })
    })
    return (
    <div ref={circleRef} className='TopCircle' style={{...{
        position: "absolute",
        height: 425,
        width: 425,
        backgroundColor: "#8A624022",
        backdropFilter: "blur(10px)",
        top: 0,
        left: 0,
        borderRadius: 1000,
        transform: "translate(-50%, -50%)",
        zIndex: 1,
    }, ...props.style}}>
        <div style={{...{
            position: "absolute",
            height: 425,
            width: 425,
            backgroundColor: "#8A624022",
            backdropFilter: "blur(10px)",
            top: "50%",
            left: "50%",
            borderRadius: 1000,
            transform: "translate(-50%, -50%)",
            zIndex: 1,
        }, ...props.style}}>
            
        </div>
        <div className='rotation' style={{
            height: 425,
            width: 425,
            animation: `rotate 120s linear infinite`,
        }}>
            {imageDOM}
        </div> 
    </div>
    )
}