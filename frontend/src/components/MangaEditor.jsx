import {useState,useRef} from 'react'
import StripPanel from './StripPanel';
import Navbar from './Navbar';
import Canvas from './Canvas';
import './Canvas.css';

import html2canvas from 'html2canvas';
function MangaEditor(){

  

  return (

    <div className='container min-h-screen min-w-full bg-gradient-to-r from-stone-800 to-slate-800 bg-center bg-cover px-20 py-2 overflow-hidden'>
          
    <Navbar /> 
    <h2 className='text-4xl font-bold mt-6 '>Build your <span className='text-transparent font-bold bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600'>manga</span></h2>

    <div  id="content-to-merge">
      <Canvas></Canvas>
      {/* <Canvas></Canvas>
      <Canvas></Canvas> */}
    
      </div>
    </div>
    
    // <div className="app-container">
    //   <StripPanel />
    //   <StripPanel />
    //   <StripPanel />
    // </div>
  )
}

export default MangaEditor;