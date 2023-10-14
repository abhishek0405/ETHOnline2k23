import { logo } from "../assets"
import React, { useEffect, useState } from "react";
//import { connectWallet, getAccount } from "../utils/wallet"

function Navbar(){


    // const [account, setAccount] = useState("");

    // useEffect(() => {
    //     (async () => {
    //     const account = await getAccount()
    //     console.log(account)
    //     setAccount(account)
    //     })();
    // }, [])



    // const onConnectWallet = async () => {
    //     await connectWallet();
    //     const account = await getAccount();
    //     setAccount(account);
    //   }

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
                            <li><a href="/editManga">Edit manga</a></li>
                            <li><a href="/">Mint Manga NFT</a></li>
                        </ul>
                        
                    </li>

                    <li><a href="/">My NFTs</a></li>
                    

                    
                </ul>
{/*                 
                <button onClick={onConnectWallet} className="btn btn-orange">{account ? account : "Connect Wallet"}</button> */}
                <button className="btn btn-orange">Connect wallet</button>
            </nav>
        </>
    )

}

export default Navbar