import { logo } from "../assets"
import React, { useEffect, useState } from "react";
import { ethers } from "ethers"
import Web3 from 'web3'


function Navbar(){

    const [address, setAddress] = useState('')
    const [accounts, setAccounts] = useState([])
    const [web3, setWeb3] = useState(null)
    async function handleConnect(){
        if (window.ethereum) {
          try {
            // Request account access if needed
            //await window.ethereum.request({ method: 'eth_requestAccounts' });
            
            const web3Instance = new Web3(window.ethereum);
            setWeb3(web3Instance);
  
            // Get accounts
            const accounts = await web3Instance.eth.getAccounts();
            console.log(accounts)
            setAccounts(accounts);
          } catch (error) {
            console.error(error);
          }
        }
  
      }

    useEffect(() => {
        
        handleConnect()
        
      }, [])


    const btnhandler = () => { 
        console.log('hellp')
        handleConnect()


        // if(localStorage.getItem('metamaskConnect') !== 'true'){
        //     if (window.ethereum) { 
      
        //         window.ethereum 
        //           .request({ method: "eth_requestAccounts" }) 
        //           .then((res) => {
        //               setAddress(res[0])
        //               localStorage.setItem('metamaskConnect', 'true')
        //               localStorage.setItem('metamaskAddress', res[0])
                   
        //           }); 
        //       } else { 
        //         alert("install metamask extension!!"); 
        //       } 
        // }
        // else{
        //     setAddress(localStorage.getItem('metamaskAddress'))
        // }
  
       
    }


   

    // useEffect(() => {
    //     btnhandler()
    
    //   }, []); 

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

                {accounts.length === 0 ? (
                    <button className="btn btn-orange" onClick={btnhandler}>Connect wallet</button>
                ) : (

                    <div>{accounts[0]}</div>
                    
                )}
                
            </nav>
        </>
    )

}

export default Navbar