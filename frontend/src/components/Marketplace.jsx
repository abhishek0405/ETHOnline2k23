
import Navbar from "./Navbar"
import { Wallet, getDefaultProvider } from "ethers";
import { Database } from "@tableland/sdk";
import React, { useState,useRef, useEffect } from 'react';
import mangaABI from "../contracts/MarketKornerABI.json"
import Web3 from 'web3'
import { ethers } from "ethers"
const { ethereum } = window;

const privateKey = process.env.REACT_APP_PRIVATE_KEY;
const wallet = new Wallet(privateKey);
const provider = getDefaultProvider("https://goerli.optimism.io/");
const signer = wallet.connect(provider);
const db = new Database({ signer });
function Marketplace(){
  const tableName = "manga_420_27";
  const [mangaList,setMangaList] = useState([]);

  useEffect(() => {
    fetchMangaList();

  }, []);

  const fetchMangaList = async()=>{
    console.log('done')
    const { results } = await db.prepare(`SELECT * FROM ${tableName} WHERE owner = '${localStorage.getItem('metamaskAddress')}' ;`).all();
    console.log(results)
    setMangaList(results)
    
  }

  const handleBuy = async (e,manga) => {

    e.preventDefault()
    console.log("buying")
    // await provider.send("eth_requestAccounts", []);
    const web3Instance = new Web3(window.ethereum);
    const chainId = await web3Instance.eth.getChainId();

    console.log(chainId)

    if(chainId!==5001){
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x1389' }],
      });
    }

    if (chainId === 5001) { 
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      var signer = await provider.getSigner();
      console.log(signer)
      const contract = new ethers.Contract('0xc5801B90010c945559Ec736a7882d619B2C7256c', mangaABI, signer);
      const tokenId = manga.manga_hash;
      // const price = ?
      //understand which method to use
      const a = await contract.buy(parseInt(tokenId), {value: 0.1})
      console.log(a)
    }
    else{
      alert('switch to mantle')
    }

  }
    return(
        <>
            <div className="container min-h-screen min-w-full bg-gradient-to-r from-stone-800 to-slate-800 bg-center bg-cover px-20 py-2 overflow-hidden">
                
                <Navbar />
                <div class="container mx-auto p-6">
 

    <div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">

                      {mangaList.length === 0 ? (
                        <div>Loading...</div>
                      ) : (
                        mangaList.map((obj, index) => (
                          <div class="card">
                          <div class="p-6 bg-white rounded-lg shadow-lg glass-effect">
                            <img src="https://rukminim2.flixcart.com/image/850/1000/xif0q/regionalbooks/j/k/v/demon-slayer-1-manga-comic-anime-original-imagh2nghksvw6sd.jpeg?q=20" alt="placeholder-image" style={{height: 100, width: 100, borderRadius:'50%'}}/>
                                {/* <img src={`https://ipfs.io/ipfs/${obj.manga_hash}/${obj.character_name}`} alt="placeholder-image" style={{height: 100, width: 100, borderRadius:'50%'}}/> */}
                            <h2 class="text-xl font-bold mb-4">{obj.title}</h2>
                            <p>{obj.plotline}</p>
                            <button class="btn btn-orange mt-4 ml-20" onClick={e=>handleBuy(e,obj)}>Buy</button>
                          </div>
                        </div>
                        ))
                      )}
                    </div>
     

    </div>
  </div>

            </div>
        </>
    )
}

export default Marketplace