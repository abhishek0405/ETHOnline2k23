
import { useState } from "react"
import Navbar from "./Navbar"
import { Web3Storage } from 'web3.storage'


function MintNFT(){


    const client = new Web3Storage({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGFBOEQ0QzMwNmI4ZjhjNjZCMTQyN2Y3NEIzZjlDNTI2YzE0RTFDRWEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjkwOTc5NDk3MjksIm5hbWUiOiJ5dXUifQ.t8HIerpToxPT9zgQzsZlAJeCWIBnZqlAaSOoZVkVUnw" })

    const [title, setTitle] = useState('')
    const [plotline, setPlotline] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState('Submit')
    

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log({title, plotline})

        try{
            const fileInput = document.querySelector('input[type="file"]')
            setLoading('Loading')
            const rootCid = await client.put(fileInput.files)
            console.log(rootCid)
            setMessage('Successfully uploaded: ' + rootCid)
            setLoading('Submit')
            setTitle('')
            setPlotline('')
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