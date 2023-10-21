
import { useState } from "react"
import Navbar from "./Navbar"
import { Web3Storage } from 'web3.storage'
import { Database } from "@tableland/sdk"
import { Wallet, getDefaultProvider } from "ethers"
import { ethers } from "ethers"
import mantleABI from "../contracts/MantleMarketplace.json"
import Web3 from 'web3'



const token = process.env.REACT_APP_WEB3_STORAGE_TOKEN;
const client = new Web3Storage({ token: token });
const privateKey = process.env.REACT_APP_PRIVATE_KEY;
console.log(privateKey)
const wallet = new Wallet(privateKey);

const provider = getDefaultProvider("https://goerli.optimism.io/");
const signer = wallet.connect(provider);


const db = new Database({ signer })

//0xc5801B90010c945559Ec736a7882d619B2C7256c

function MintNFT(){

   
    
    

    const [title, setTitle] = useState('')
    const [plotline, setPlotline] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState('Submit')
    const tableName = "manga_420_27"
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [price, setPrice] = useState(0)
    

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log({title, plotline})

        try{
            const fileInput = document.querySelector('input[type="file"]')
            setLoading('Loading')
            console.log(fileInput.files[0])
            const rootCid = await client.put(fileInput.files)
            console.log(rootCid)
            setMessage('Successfully uploaded: ' + rootCid)
            setLoading('Submit')
            setTitle('')
            setPlotline('')
           
            
            try {
                
                const accounts =await window.ethereum.request({
                  method: "eth_requestAccounts",
                });
                console.log(accounts[0])

                const web3Instance = new Web3(window.ethereum);
                const chainId = await web3Instance.eth.getChainId();
                
                console.log("chain id")
                console.log(chainId)

                if (chainId === 5001) { 
                  
                  // await provider.send("eth_requestAccounts", []);
                  const signer = await provider.getSigner();
                  
                 
                    const contract = new ethers.Contract('0xc5801B90010c945559Ec736a7882d619B2C7256c', mantleABI, signer )
                    console.log(contract)
                  const tx = await contract.createToken(rootCid, price)
                  console.log(tx)
                  const receipt = await tx.wait();
                  console.log(receipt)
                  setSuccess(`Successfully minted new NFT with transaction hash: ${receipt.transactionHash}`)
                   // Insert a row into the table
                const { meta: insert } = await db
                .prepare(`INSERT INTO ${tableName} (manga_hash, owner, title, plotline) VALUES (?, ?, ?, ?);`)
                .bind(rootCid, localStorage.getItem("metamaskAddress"), title, plotline)
                .run();

                // Wait for transaction finality
                await insert.txn?.wait()
                console.log('done')
                const { results } = await db.prepare(`SELECT * FROM ${tableName};`).all()
                console.log(results)

                } else {
                  //alert('switch to mantle testnet');
                  console.log('switch to mantle')
                }




                
              } catch (e) {
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