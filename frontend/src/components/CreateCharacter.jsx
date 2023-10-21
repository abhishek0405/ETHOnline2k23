import {useEffect, useState} from 'react'
import axios from 'axios'
import Navbar from './Navbar'
import { RingLoader
 } from 'react-spinners';
 import { Web3Storage } from 'web3.storage'
 import { Wallet, getDefaultProvider } from "ethers";
 import { Database } from "@tableland/sdk";
 const { ethereum } = window;





// IPFS Storage contract: KT1BaojNXyukJ8AzoyJ1RZousTZNa3fXSeuZ

const privateKey = process.env.REACT_APP_PRIVATE_KEY;
const wallet = new Wallet(privateKey);
const provider = getDefaultProvider("https://goerli.optimism.io/");
const signer = wallet.connect(provider);
const db = new Database({ signer });
const accounts =await window.ethereum.request({
  method: "eth_requestAccounts",
});
function CreateCharacter() {

    const [prompt, setPrompt] = useState("")
    const [imageUrl, setImageUrl] = useState('')
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)

    const token = process.env.REACT_APP_WEB3_STORAGE_TOKEN;
    const client = new Web3Storage({ token: token });
    const tableName = "character_420_28"

    //const JWT = process.env.REACT_APP_JWT
    

    // useEffect(()=> {
    //   console.log(process.env.REACT_APP_JWT)
    // })

    //get blob from image
    const getImageBlob = async (url) => {
      const response = await fetch(url);
      const blob = await response.blob();
      return blob;
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(accounts[0]);
        console.log(prompt)
        try{
          setLoading(true)
          const response = await axios.post('http://localhost:8000/generate/', { text : prompt }, {responseType : 'blob'})
          console.log(response)
      
          if (response.status === 200) {
            var url = URL.createObjectURL(response.data)
            console.log(url)
            setImageUrl(url)
            setLoading(false)
      
          } else {
            console.error('Failed to fetch the image');
          }
        } catch (error) {
          console.error('Error fetching the image:', error);
        }
        
      }


      const handleSave = async (e) => {
        e.preventDefault()
        try{
            await ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: '0x1A4' }],
            });
            setLoading(true)
            const fileInput = await getFile(imageUrl);
            console.log("file input is ",fileInput)
            const rootCid = await client.put(fileInput)
            console.log(rootCid)
            const { meta: insert } = await db
            .prepare(`INSERT INTO ${tableName} (character_hash, character_name, owner) VALUES (?, ?, ?);`)
            .bind(rootCid,name, accounts[0])
            .run();

            // Wait for transaction finality
            await insert.txn?.wait();
            console.log('done')
            setLoading(false)
        }
        catch(error){
            console.log(error)
        }
      }

      const getFile = async(imageUrl)=>{
        console.log("getting file")
          const fileName = name;
          const response = await fetch(imageUrl);
          console.log("response is ",response)
          const contentType = response.headers.get('content-type')
          const blob = await response.blob()
          const file = [new File([blob], fileName, { contentType })]      
          return file;
      }
      

    return(
        <>


          <div className='container min-h-screen min-w-full bg-gradient-to-r from-stone-800 to-slate-800 bg-center bg-cover px-20 py-2 overflow-hidden'>
          
            <Navbar /> 
            



            <div className='flex'>
              <div>

              <h2 className='text-4xl font-bold mt-6 '>Create your manga characters <span className='text-transparent font-bold bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600'>with the power of AI</span></h2>
              <a href='/createCharacter'><button className='btn btn-orange mt-8 font-bold'>New character +</button></a>


              <form className='mt-10'>
              
                <textarea className='rounded-2xl text-black text-center' cols="50" rows="10" placeholder='Enter the character prompt - comma separated keywords'
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}></textarea>

                <br /><br />
                <button className='btn-rect btn-orange' onClick={handleSubmit}>Generate</button>
                
              </form>
              </div>


              <div>
                <div className='img-result mt-12 ml-2'>


                  {loading?(
                    <div className="spinner">
                    <RingLoader color="#36D7B7" size={500} />
                  </div>
          
                  ):(
                   <>
                    {imageUrl && (
                    <>
                    <img src={imageUrl} alt="Generated Image" />

                   </>
                   
                   )
                   
                   
                    }

                   </>
                  )}
                </div>
                <form className='mt-2 ml-2'>
                    <input type="text" className='rounded-full h-8 w-100 text-center text-black' placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)} />
                    <button className='btn btn-orange ml-2' onClick={handleSave}>Save</button>
                  </form> 
                </div>


            </div>

            </div>
        </>
    )

}

export default CreateCharacter