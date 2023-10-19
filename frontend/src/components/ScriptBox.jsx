import {useEffect, useState} from 'react'
import axios from 'axios'
import Navbar from './Navbar'


function ScriptBox({sceneDetails}){
    console.log("scene",sceneDetails)
    return (
        <div>
        <ul>
        {sceneDetails.map((item, index) => (
            <>
          <li key={index}>{item}</li>
         <p></p>
          </>
        ))}
        </ul>
        </div>
    )
}

export default ScriptBox