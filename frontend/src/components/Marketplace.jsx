
import Navbar from "./Navbar"
import {Web3Storage} from 'web3.storage'

import {useState, useEffect} from 'react'

// import forebodingABI from "../contracts/ForebodingABI.json"
import mangaABI from '../contracts/MarketKornerABI.json'
import {ethers} from "ethers"
import Web3 from 'web3';


const provider = new ethers.providers.Web3Provider(window.ethereum)

function Marketplace(){

   
  const [ipfsData, setIpfsData] = useState([])
  let subtitle;

  const client = new Web3Storage({ token: process.env.REACT_APP_WEB3_STORAGE_TOKEN })
  const [loading, setLoading] = useState(true)

  
    
  useEffect( () => {


        

    async function getData(){
        const data = []
        await provider.send("eth_requestAccounts", []);
        
        // const contract = new ethers.Contract('0x9eeF83ebA708c760b9D8f761835a47B9ff200722', forebodingABI, signer);
        const web3Instance = new Web3(window.ethereum);
        const chainId = await web3Instance.eth.getChainId();
    
        console.log(chainId)

        if (chainId === 5001) { 
            var signer = await provider.getSigner();
            const contract = new ethers.Contract('0xc5801B90010c945559Ec736a7882d619B2C7256c', mangaABI, signer);
        console.log("contract",contract);
        const market = await contract.fetchMarketItems()
        console.log(market)
        //console.log("here",parseInt(market[0]._hex, 16))

        for(var i = 0; i < market.length; i++){
            
            if(market[i].sold === false){
                var currData = await contract.tokenURI(i+1)
               
                var p = parseInt(market[i][3]._hex, 16)
                console.log(currData)
                console.log(p)
                if(currData === 'xtz') continue
                var response = await fetch('https://ipfs.io/ipfs/'+ currData);
                if(!response.ok)
                    throw new Error(response.statusText);
                    //console.log(response)
                    
                

                var json = {};
                console.log("json",json)
                Object.assign(json, {price : p})
                Object.assign(json, {key : i})
                Object.assign(json, {tokenId : i+1})
                data.push(json)

                // eslint-disable-next-line no-loop-func
                //setIpfsData(prevState => [...prevState, json])
            }
        }
        setIpfsData(data)
        setLoading(false)

        } 
        else {
            //alert('switch to mantle testnet');
            console.log('switch to mantle')
        }



        
    }
    getData()
    
}, [])








    return(
        <>
            <div className="container min-h-screen min-w-full bg-gradient-to-r from-stone-800 to-slate-800 bg-center bg-cover px-20 py-2 overflow-hidden">
                
                <Navbar />
                <div class="container mx-auto p-6">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">





    {(loading === true) ? (<p>Loading</p>) : (

<>

{
    ipfsData.map(d => {
                    
        return(
          
          <div class="card">
          <div class="p-6 bg-white rounded-lg shadow-lg glass-effect">
              <img src="https://waifu.vercel.app/sfw/neko" alt="placeholder-image" style={{height: 100, width: 100, borderRadius:'50%'}}/>
            <h2 class="text-xl font-bold mb-4">{d.title}</h2>
            <p>Description of Product 1 goes here.</p>
            <button class="btn btn-orange mt-4 ml-20">Buy</button>
          </div>
        </div>
           
       )

      })
}

</>

)
}
     
    


      

     
    </div>
  </div>

            </div>
        </>
    )
}

export default Marketplace