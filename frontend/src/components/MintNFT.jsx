
import { useState } from "react"
import Navbar from "./Navbar"
import { Web3Storage } from 'web3.storage'
import { Database } from "@tableland/sdk";
import { Wallet, getDefaultProvider } from "ethers";


const token = process.env.REACT_APP_WEB3_STORAGE_TOKEN;
const client = new Web3Storage({ token: token });
const privateKey = process.env.REACT_APP_PRIVATE_KEY;
const wallet = new Wallet(privateKey);

const provider = getDefaultProvider("https://goerli.optimism.io/");
const signer = wallet.connect(provider);


const db = new Database({ signer });
console.log(db)

function MintNFT(){

   

    const [title, setTitle] = useState('')
    const [plotline, setPlotline] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState('Submit')
    const tableName = "manga_420_27"
    

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
            // Insert a row into the table
            const { meta: insert } = await db
            .prepare(`INSERT INTO ${tableName} (manga_hash, owner, title, plotline) VALUES (?, ?, ?, ?);`)
            .bind(rootCid, localStorage.getItem("metamaskAddress"), title, plotline)
            .run();

            // Wait for transaction finality
            await insert.txn?.wait();
            console.log('done')
            const { results } = await db.prepare(`SELECT * FROM ${tableName};`).all();
            console.log(results);
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