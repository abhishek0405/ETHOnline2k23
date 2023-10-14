import { logo } from "../assets"
import React, { useEffect, useState } from "react";

function Navbar(){



    return (
        <>
            <nav className="flex items-center">
                <img src={logo} alt="" className="w-44" />
                <ul className="flex-1 text-center" id="navbar">
                    <li><a href="/">Home</a></li>
                    <li><a href="/">Marketplace</a></li>

                    <li>
                        <a href="/createNFT">Create NFT</a>
                        <ul>
                            <li><a href="/createCharacter">Generate characters</a></li>
                            <li><a href="/editCharacter">Edit characters</a></li>
                            <li><a href="/">View characters</a></li>
                            <li><a href="/generateScript">Generate script</a></li>
                            <li><a href="/">Edit manga</a></li>
                            <li><a href="/">Mint Manga NFT</a></li>
                        </ul>
                        
                    </li>

                    <li><a href="/">My NFTs</a></li>
                    

                    
                </ul>
                <button className="btn btn-orange">Connect wallet</button>
            </nav>
        </>
    )

}

export default Navbar