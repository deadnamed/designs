import React, {useState, useRef, useEffect} from 'react';
import './RotatingTextManager.css'
import CircularText from './CircularText';

export interface RotatingTextManagerProps {
    style: any;
}

RotatingTextManager.defaultProps = {
    style: {},
}

function getTextWidth(text: string, font: string) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if(context==null){
        return -1
    }
  
    context.font = font || getComputedStyle(document.body).font;
    
    return context.measureText(text).width;
}

export default function RotatingTextManager (props: RotatingTextManagerProps){
    const regionsMap = [0, 2, 7, 9]
    const [update, forceUpdate] = React.useState(0)
    const quotes = [
        ["heres your daily chloe", "pas", 0],
        ["pas you're so cute", "chloe", 0],

        ["all this just to spite me???", "pas", 1],
        ["lets do debate some time!!!!!", "pas", 1],
        ["heres a video of pregnant phuc", "pas", 1],
        ["i just drew this for pas today", "chloe", 1],
        ["oil oil burger burger gun gun", "nam khanh", 1],

        ["i mean my skin care routine is nonexistent", "chloe", 2],
        ["youve never seen a conversation btween me and anie", "pas", 2],

        ["BAHAHAHAH IRONIC but such a sweetheart 🤭 thanks pookie pas", "bella", 3],
        ["bet you finger a woman even worse than you do a guitar which is painful", "pas", 3],
    ]
    let newShown = [false, false, false, false, false, false, false, false, false, false, false, false, ]
    newShown[getRandomInt(regionsMap[1]-regionsMap[0])+regionsMap[0]]=true
    newShown[getRandomInt(regionsMap[2]-regionsMap[1])+regionsMap[1]]=true
    newShown[getRandomInt(regionsMap[3]-regionsMap[2])+regionsMap[2]]=true
    newShown[getRandomInt(regionsMap[4]-regionsMap[3])+regionsMap[3]]=true
    const [shown, setShown] = React.useState(newShown)
    //Array(quotes.length).fill(false)
    let key = 0
    const randomScale = (segment: number) => {
        if(segment==0){
            return Math.random()/3 + 0.5
        }
        if(segment==1){
            return Math.random()/4 + 1
        }
        if(segment==2){
            return Math.random()/5 + 4/3
        }
        if(segment==3){
            return Math.random()/5 + 5/3
        }
    }
    const quoteDOM = quotes.map((quote)=>(
        // @ts-ignore
        <CircularText text={quote[0]} author={quote[1]} key={Math.random()} scale={randomScale(quote[2])} shown={shown[quotes.indexOf(quote)]} kill={()=>{killYourself(quotes.indexOf(quote))}}/>
    ))
    function getRandomInt(max:number) {
        return Math.floor(Math.random() * max);
    }



    return (
    <div className='RotatingTextManager' style={{...{
    }, ...props.style}}>
        {quoteDOM}
    </div>
    )
}