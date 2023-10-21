import {useState} from 'react'
import axios from 'axios'
import Navbar from './Navbar'
import { RingLoader
 } from 'react-spinners';




// IPFS Storage contract: KT1BaojNXyukJ8AzoyJ1RZousTZNa3fXSeuZ



function EditCharacter() {

    const [prompt, setPrompt] = useState("")
    const [imageUrl, setImageUrl] = useState('')
    const [name, setName] = useState('')
    const [currImg, setCurrImg] = useState('')
    const [loading, setLoading] = useState(false)
    //const JWT = process.env.REACT_APP_JWT
    



    const handleClick = (url) => {
        setCurrImg(url);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(prompt)
        try{
          setLoading(true)
          const response = await axios.post('http://localhost:8000/edit', { prompt : prompt, url : currImg }, {responseType : 'blob'})
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


    return(
        <>


          <div className='container min-h-screen min-w-full bg-gradient-to-r from-stone-800 to-slate-800 bg-center bg-cover px-20 py-2 overflow-hidden'>
          
            <Navbar /> 
            

            <h2 className='text-4xl font-bold mt-6 '>Edit your <span className='text-transparent font-bold bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600'>manga characters</span></h2>

            <div className='flex'>


                <div className='flex-auto'>
                    
                    <div className='img-menu mt-12 ml-2  overflow-y-scroll'>
                    <h3 className='font-bold mb-2 text-lg'>Select character</h3>
                        <img src="https://ipfs.io/ipfs/Qmf9fzrrg9ZnSUuPwGQUbGepwhvQUyxe6AwP1J9zoXU821" className='imgs mb-4' alt="img1" style={{
                            border: "https://ipfs.io/ipfs/Qmf9fzrrg9ZnSUuPwGQUbGepwhvQUyxe6AwP1J9zoXU821" === currImg ? '6px solid orange' : 'none',
                        }}
                        onClick={() => handleClick("https://ipfs.io/ipfs/Qmf9fzrrg9ZnSUuPwGQUbGepwhvQUyxe6AwP1J9zoXU821")}

                        
                        />


                        <img src="https://ipfs.io/ipfs/QmQPoCVQNY2fSXGENmS22Ha4DeL83bQP2s2DDesiuASFDf" className='imgs mb-4' alt="img2"
                        onClick={() => handleClick("https://ipfs.io/ipfs/QmQPoCVQNY2fSXGENmS22Ha4DeL83bQP2s2DDesiuASFDf")}
                        style={{
                            border: "https://ipfs.io/ipfs/QmQPoCVQNY2fSXGENmS22Ha4DeL83bQP2s2DDesiuASFDf" === currImg ? '6px solid orange' : 'none',
                        }}

                        />
                    </div>

                </div>
              <div className='flex-auto'>
              
              <form className='mt-10'>
              
                <textarea className='rounded-2xl text-black text-center' cols="50" rows="5" placeholder="Enter prompt to edit your character's image, e.g to change expressions, hold props, etc."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}></textarea>

                <br /><br />
                <button className='btn-rect btn-orange' onClick={handleSubmit}>Edit</button>
                
              </form>
              </div>


              


                <div className='flex-auto img-result mt-12 ml-2'>


                  {loading?(
                    <div className="spinner">
                    <RingLoader color="#36D7B7" size={500} />
                  </div>
          
                  ):(
                   <>
                    {imageUrl && (
                    <>
                    <img src={imageUrl} alt="Generated Image" />
                     {/* <form className='mt-2 ml-2'>
                    <input type="text" className='rounded-full h-8 w-100 text-center text-black' placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)} />
                    <button className='btn btn-orange ml-2' onClick={handleSave}>Save</button>
                   </form> */}
                   </>
                   )
                   
                    }
                   </>
                  )}
                </div> 
                


            </div>

            </div>
        </>
    )

}

export default EditCharacter