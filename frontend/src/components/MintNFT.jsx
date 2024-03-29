
import { useState } from "react"
import Navbar from "./Navbar"
import { Web3Storage } from 'web3.storage'
import { Database } from "@tableland/sdk"
import { Wallet, getDefaultProvider } from "ethers"
import { ethers } from "ethers"
import mantleABI from "../contracts/MantleMarketplace.json"
import mangaABI from "../contracts/MarketKornerABI.json"
import Web3 from 'web3'
const { ethereum } = window;


const token = process.env.REACT_APP_WEB3_STORAGE_TOKEN;
const client = new Web3Storage({ token: token });
const privateKey = process.env.REACT_APP_PRIVATE_KEY;
const wallet = new Wallet(privateKey);
const provider = getDefaultProvider("https://goerli.optimism.io/");
const signer = wallet.connect(provider);
const db = new Database({ signer });
const accounts =await window.ethereum.request({
  method: "eth_requestAccounts",
});
//new manga contract
//0x0E5E2E41c0199cF4e46F05EE6D7BC29CF1873DD2

//foreboding mantle contracting
//0x22Cc03FaD19a7104841CE24E99F76fe769AEb016

function MintNFT(){

   
    const [title, setTitle] = useState('')
    const [plotline, setPlotline] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState('Submit')
    const tableName = "manga_420_27"
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [price, setPrice] = useState(0)
    
    const contractAddress = "0x3Ca00aB9fe5791150C6713d7D9c862c382BA9BFa"
    

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log({title, plotline})

        try{
            const fileInput = document.querySelector('input[type="file"]')
            setLoading('Loading')
            //fileInput.files[0].name = title
            const selectedFile = fileInput.files[0]
            console.log(fileInput.files[0].name)
            const newFile = new File([selectedFile], title, { type: selectedFile.type });
  
            const rootCid = await client.put([newFile])
            console.log(rootCid)
            setMessage('Successfully uploaded: ' + rootCid)
            setLoading('Submit')
            setTitle('')
            setPlotline('')
            setPrice(0)
           
            
            try {
                //optimism
                await ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: '0x1A4' }],
                });
                  console.log(accounts[0])
                  //insert to db
                  const { meta: insert } = await db
                  .prepare(`INSERT INTO ${tableName} (manga_hash, owner, title, plotline) VALUES (?, ?, ?, ?);`)
                  .bind(rootCid, 'accounts[0]', title, plotline)
                  .run();
                  console.log("executing db statement")
                  // Wait for transaction finality
                  await insert.txn?.wait()
                  console.log('done')
                //   setMessage('Successfully minted: ' + receipt.transactionHash)
                  const { results } = await db.prepare(`SELECT * FROM ${tableName};`).all()
                  console.log(results)

                //mantle
                await ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: '0x1389' }],
                });             


                const web3Instance = new Web3(window.ethereum);
                const chainId = await web3Instance.eth.getChainId();
                
                console.log("chain id")
                console.log(chainId)

                if (chainId === 5001) { 

                    const provider = new ethers.providers.Web3Provider(window.ethereum);
                  
                  //await provider.send("eth_requestAccounts", []);
                  const signer = await provider.getSigner();
                  
                  //const contract = new ethers.Contract('0x9eeF83ebA708c760b9D8f761835a47B9ff200722', forebodingABI, signer);
                    const contract = new ethers.Contract(contractAddress, mantleABI, signer )
                  const tx = await contract.mint(rootCid, price, {});
                  const receipt = await tx.wait();
                  
                  console.log("minted succesfully")
                  console.log(receipt)
                  setMessage('Successfully minted: ' + receipt.transactionHash)
                  
                 //switch chain

                   // Insert a row into the table
                
                // const { meta: insert } = await db
                // .prepare(`INSERT INTO ${tableName} (manga_hash, owner, title, plotline) VALUES (?, ?, ?, ?);`)
                // .bind(rootCid, accounts[0], title, plotline)
                // .run();
                // console.log("executing db statement")
                // // Wait for transaction finality
                // await insert.txn?.wait()
                // console.log('done')
                // setMessage('Successfully minted: ' + receipt.transactionHash)
                // const { results } = await db.prepare(`SELECT * FROM ${tableName};`).all()
                // console.log(results)

                } else {
                  //alert('switch to mantle testnet');
                  console.log('switch to mantle')
                }

 
              } catch (e) {
                console.log("errror " + e.message)
                setError(e.message);
              }

           


        }
        catch(error){
            console.log(error)
            setMessage('Error encountered')
        }
        

    }

    return(
        <>
            <div className="container min-h-screen min-w-full bg-gradient-to-r from-stone-800 to-slate-800 bg-center bg-cover px-20 py-2 overflow-hidden" >
                
                <Navbar />
                <div class="form-container">
                    <form>
                    <div>
                        <label for="title">Title:</label>
                        <input type="text" id="title" value={title} className="form-field" onChange={e => setTitle(e.target.value)} placeholder="Title" />
                    </div>

                    <div>
                        <label for="plotline">Plotline:</label>
                        <textarea id="plotline" name="plotline" className="form-field" rows="5" value={plotline} onChange={e => setPlotline(e.target.value)} placeholder="Title"></textarea>
                    </div>

                    <div>
                        <label for="price">Price: in wei</label>
                        <input type="number" id="price" value={price} className="form-field" onChange={e => setPrice(e.target.value)} placeholder="Price" />
                    </div>

                    <div>
                        <label for="file">File Upload:</label>
                        <input type="file" id="file" name="file" class="form-field file-upload" />
                    </div>

                    <button type="submit" className="btn btn-orange" onClick={handleSubmit}>{loading}</button>
                    <p>{message}</p>
                    </form>
                </div>
        

            </div>
        </>
    )
}

export default MintNFT