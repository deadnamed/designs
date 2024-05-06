import React from 'react'
import './App.css'
import BottomCircle from './BottomCircle'
import CircularText from './CircularText'
import RotatingTextManager from './RotatingTextManager'
import TopCircle from './TopCircle.tsx'

function App() {
    // document.body.addEventListener('touchmove', (e)=>{
    //     e.preventDefault()
    // }, { passive: false });
    return (
    // <>
    //   <div>
    //     <a href="https://vitejs.dev" target="_blank">
    //       <img src={viteLogo} className="logo" alt="Vite logo" />
    //     </a>
    //     <a href="https://react.dev" target="_blank">
    //       <img src={reactLogo} className="logo react" alt="React logo" />
    //     </a>
    //   </div>
    //   <h1>Vite + React</h1>
    //   <div className="card">
    //     <button onClick={() => setCount((count) => count + 1)}>
    //       count is {count}
    //     </button>
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to test HMR
    //     </p>
    //   </div>
    //   <p className="read-the-docs">
    //     Click on the Vite and React logos to learn more
    //   </p>
    // </>
    
    <div className="App" style={{
        backgroundColor: "#EEE7DA",
        display: "block",
        position: "absolute",
        top: 0,
        left: 0,
        height: "100vh",
        width: "100vw",
    }}>
        <TopCircle />
        <BottomCircle style={{zIndex: 2,}}/>
        {/* <CircularText scale={1} text='bet you finger a woman even worse than you do a guitar which is painful'/>
        <CircularText scale={0.5}/> */}
        <RotatingTextManager style={{pointerEvents: "none"}}/>
    </div>
  )
}

export default App
