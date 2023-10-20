import { logo } from "../assets"
import React, { useEffect, useState } from "react";
import { ethers } from "ethers"


function Navbar(){

    const [address, setAddress] = useState('')


    const btnhandler = () => { 
        console.log('hellp')


        if(localStorage.getItem('metamaskConnect') !== 'true'){
            if (window.ethereum) { 
      
                window.ethereum 
                  .request({ method: "eth_requestAccounts" }) 
                  .then((res) => {
                      setAddress(res[0])
                      localStorage.setItem('metamaskConnect', 'true')
                      localStorage.setItem('metamaskAddress', res[0])
                   
                  }); 
              } else { 
                alert("install metamask extension!!"); 
              } 
        }
        else{
            setAddress(localStorage.getItem('metamaskAddress'))
        }
  
       
    }


   

    useEffect(() => {
        btnhandler()
    
      }, []); 

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
                            <li style={{fontSize:16}}><a href="/editManga">Edit manga</a></li>
                            <li style={{fontSize:16}}><a href="/mintNFT">Mint your NFT</a></li>
                        </ul>
                        
                    </li>

                    <li><a href="/myNFTs">My NFTs</a></li>
                    

                    
                </ul>

                {address === '' ? (
                    <button className="btn btn-orange" onClick={btnhandler}>Connect wallet</button>
                ) : (

                    <div>{address}</div>
                    
                )}
                
            </nav>
        </>
    )

}

export default Navbar