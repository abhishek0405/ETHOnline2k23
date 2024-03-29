
import Navbar from "./Navbar"
import {Web3Storage} from 'web3.storage'

import {useState, useEffect} from 'react'

// import forebodingABI from "../contracts/ForebodingABI.json"
import mangaABI from '../contracts/MarketKornerABI.json'
import {ethers} from "ethers"
import Web3 from 'web3';


//const provider = new ethers.providers.Web3Provider(window.ethereum)
import { Wallet, getDefaultProvider } from "ethers";
import { Database } from "@tableland/sdk"

const { ethereum } = window;

const privateKey = process.env.REACT_APP_PRIVATE_KEY;
const wallet = new Wallet(privateKey);
const provider = getDefaultProvider("https://goerli.optimism.io/");
const signer = wallet.connect(provider);
const db = new Database({ signer });
const contractAddress = "0x3Ca00aB9fe5791150C6713d7D9c862c382BA9BFa"


function Marketplace(){

   
  const [ipfsData, setIpfsData] = useState([])
 
  const client = new Web3Storage({ token: process.env.REACT_APP_WEB3_STORAGE_TOKEN })
  const [loading, setLoading] = useState(true)
  const tableName = "manga_420_27";
  const [mangaList,setMangaList] = useState([]);
  const [buying, setBuying] = useState('Buy')

  const fetchMangaList = async()=>{
    console.log('done')
    const accounts =await window.ethereum.request({
      method: "eth_requestAccounts",
    })
    const { results } = await db.prepare(`SELECT * FROM ${tableName};`).all();
    console.log(results)
    setMangaList(results)
    return results
    
  }

  
    
  useEffect( () => {

    
      

    async function getData(){
        const data = []
        const mangaResults = await fetchMangaList()
       //mantle
        await ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x1389' }],
        })

        const provider = new ethers.providers.Web3Provider(window.ethereum);

        await provider.send("eth_requestAccounts", []);
        
        // const contract = new ethers.Contract('0x9eeF83ebA708c760b9D8f761835a47B9ff200722', forebodingABI, signer);
        const web3Instance = new Web3(window.ethereum);
        const chainId = await web3Instance.eth.getChainId();
    
        console.log(chainId)

        if (chainId === 5001) { 
            var signer = await provider.getSigner();
            const contract = new ethers.Contract(contractAddress, mangaABI, signer);
        console.log("contract",contract);
        const market = await contract.getAll()
        console.log(market)
        //console.log("here",parseInt(market[0]._hex, 16))
          console.log("db mangas",mangaResults)
        
        for(var i = 0; i < market.length; i++){
            
            if(parseInt(market[i]._hex, 16) === 1){
              var currData = await contract.tokenURI(i)
              var p = await contract._tokenIdToPrice(i)
                const foundManga = mangaResults.find((manga) => manga.manga_hash === currData)
                if(!foundManga) continue
               
                if(currData === 'xtz') continue
                var imgSrc = 'https://ipfs.io/ipfs/'+ currData + '/' + foundManga.title
                
                    
                

                var json = {};
                
                Object.assign(json, {price : parseInt(p._hex)})
                Object.assign(json, {key : i})
                Object.assign(json, {tokenId : i})
                Object.assign(json, {title : foundManga.title})
                Object.assign(json, {plotline : foundManga.plotline})
                Object.assign(json, {imgSrc : imgSrc})
                
                data.push(json)
                console.log(data)
                // eslint-disable-next-line no-loop-func
                //setIpfsData(prevState => [...prevState, json])
            }
        }
        console.log(data)
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








 
  

  const handleBuy = async (e,manga) => {

    e.preventDefault()
    console.log("buying")
    setBuying('Loading')
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
      const contract = new ethers.Contract(contractAddress, mangaABI, signer);
      const tokenId = manga.tokenId;
   
      const a = await contract.buy(parseInt(tokenId), {value: manga.price})
      console.log(a)
      setBuying('Added')
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





    {(loading === true) ? (<p>Loading</p>) : (

<>

{
    ipfsData.map(d => {
                    
        return(
          
          <div class="card">
          <div class="p-6 bg-white rounded-lg shadow-lg glass-effect">
              <img src={d.imgSrc} alt="placeholder-image" style={{height: 100, width: 100, borderRadius:'50%'}}/>
            <h2 class="text-xl font-bold mb-4">{d.title}</h2>
            <p>{d.plotline}</p>
            <p class="text-md font-bold mt-2">{d.price} Wei</p>
            <button class="btn btn-orange mt-4 ml-20" onClick={(e) => handleBuy(e, d)}>{buying}</button>
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
            </div></>
    )
 
}
export default Marketplace