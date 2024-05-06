import React, {useState, useRef, useEffect} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './frontpage/App.tsx';
import Fishing from './fishing/Fishing.tsx';

export interface RouterProps {
    style: any;
}

Router.defaultProps = {
    style: {},
}

export default function Router (props: RouterProps){
    return (
    <div className='Router' style={{...{

    }, ...props.style}}>
        <BrowserRouter>
            <Routes>
                <Route path="/*" element={<App />} />
                <Route path="/fishing/*" element={<Fishing />} />
            </Routes>
        </BrowserRouter>
    </div>
    )
}