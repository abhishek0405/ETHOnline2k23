
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
function MyNFT(){

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

  const tableName = "manga_420_27";
  const [mangaList,setMangaList] = useState([]);
  const [ipfsData, setIpfsData] = useState([])
  const [loading, setLoading] = useState(true)
  const [price, setPrice] = useState()
  const [listing, setListing] = useState('List')
  
  function check(x, y){
    for(var i = 0; i < 42; i++){
        if(x[i].toLowerCase() !== y[i].toLowerCase()){
            console.log('x is ', x[i])
            console.log('y is ', y[i])
            return false
        }
    }
    return true
} 


async function handleList(e, manga){

  e.preventDefault()
  setListing('Loading')
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  await provider.send("eth_requestAccounts", []);
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
    
    var signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, mangaABI, signer);
    console.log("contract",contract);
 
  const a = await contract.putUpForSale(manga.tokenId, price)
  console.log(a)
  setListing('Listed')
  }else{
   
    console.log('switch to mantle')
  }

}


const openLinkInNewTab = (e, url) => {
  // Specify the URL you want to open in a new tab
  e.preventDefault()
  
  window.open(url, '_blank');
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

        const provider = new ethers.providers.Web3Provider(window.ethereum)
        await provider.send("eth_requestAccounts", []);

        const accounts =await window.ethereum.request({
            method: "eth_requestAccounts",
          });
        

        const web3Instance = new Web3(window.ethereum);
        const chainId = await web3Instance.eth.getChainId();
    
        console.log(chainId)

        if (chainId === 5001) {

         
        var signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, mangaABI, signer);
        console.log("contract",contract);
        
        const currTokens = await contract._tokenIds();
        

        for(var i = 0; i < parseInt(currTokens._hex, 16); i++){


                var own = await contract._tokenOwner(i)
                console.log(accounts[0])
                console.log(own)
                
                if(check(accounts[0], own)){
                    
                    var forSale = await contract._marketPlace(i)
                    console.log('for sale: ', forSale)
                    if(parseInt(forSale._hex,16) === 0){
                        var currData = await contract.tokenURI(i);

                        const foundManga = mangaResults.find((manga) => manga.manga_hash === currData)
                        if(!foundManga) continue
                       
                        if(currData === 'xtz') continue
                        var imgSrc = 'https://ipfs.io/ipfs/'+ currData + '/' + foundManga.title
               
                        console.log(currData)
                        

                        var json = {}
                        
                        Object.assign(json, {key : i})
                        Object.assign(json, {tokenId : i})
                        Object.assign(json, {title : foundManga.title})
                        Object.assign(json, {plotline : foundManga.plotline})
                        Object.assign(json, {imgSrc : imgSrc})

                       
                        data.push(json)
                        

                    }
                }
            
                
            
        }
        console.log('data: ')
        console.log(data)
    
    
    
        
    setIpfsData(data)
    
    setLoading(false)
    console.log("new",data)
   
}else{
    //alert('switch to mantle net on metamask')
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
              <img src={d.imgSrc} alt="placeholder-image" style={{height: 100, width: 100, borderRadius:'50%'}}/>
            <h2 class="text-xl font-bold mb-4">{d.title}</h2>
            <p>{d.plotline}</p>
            <input type="number" placeholder='Enter price in Wei' value={price} onChange={e => setPrice(e.target.value)} />
            <button class="btn btn-orange mt-4 ml-20" onClick={(e) => handleList(e, d)}>{listing}</button>

            <button class="btn btn-orange mt-4 ml-20" onClick={(e) => openLinkInNewTab(e, d.imgSrc)}>View</button>
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

export default MyNFT