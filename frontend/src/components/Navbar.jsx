import { logo } from "../assets"
import React, { useEffect, useState } from "react";

function Navbar(){



    return (
        <>
            <nav className="flex items-center">
                <img src={logo} alt="" className="w-44"  style={{height: 70}}/>
                <ul className="flex-1 text-center" id="navbar">
                    <li><a href="/">Home</a></li>
                    <li><a href="/marketplace">Marketplace</a></li>

                    <li>
                        <a href="/createNFT">Create NFT</a>
                        <ul style={{fontSize:10}}> 
                            <li style={{fontSize:16, textAlign: 'left'}}><a href="/createCharacter">Generate</a></li>
                            <li style={{fontSize:16}}><a href="/editCharacter">Edit characters</a></li>
                            <li style={{fontSize:16}}><a href="/">View characters</a></li>
                            <li style={{fontSize:16}}><a href="/">Generate script</a></li>
                            <li style={{fontSize:16}}><a href="/">Edit manga</a></li>
                            <li style={{fontSize:16}}><a href="/mintNFT">Mint</a></li>
                        </ul>
                        
                    </li>

                    <li><a href="/myNFTs">My NFTs</a></li>
                    

                    
                </ul>
                <button className="btn btn-orange">Connect wallet</button>
            </nav>
        </>
    )

}

export default Navbar