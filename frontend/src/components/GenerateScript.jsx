import {useState} from 'react'
import axios from 'axios'
import Navbar from './Navbar'
import { RingLoader
 } from 'react-spinners';
 import { toast,ToastContainer } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';
import ScriptBox from './ScriptBox';
function GenerateScript(){
    const [characters,setCharacters] = useState('');
    const [baselinePlot,setBaselinePlot] = useState('');
    const [loading,setLoading] = useState(false);
    const [sceneDetails,setSceneDetails] = useState([]);
    const [scriptGenerated,setScriptGenerated] = useState(false);
    const handleSubmit  = async(e)=>{
        e.preventDefault();
        if(characters === '' || baselinePlot ===''){
            throwToastError("Please specify character and plot details")
            return;
        }
        console.log(characters)
        try{
          setLoading(true)
          setSceneDetails([]);
          const response = await axios.post('http://localhost:8000/generateScript/', { characters : characters,baselinePlot:baselinePlot }, {responseType : 'json'})
          console.log(response)
          setScriptGenerated(true);
          setSceneDetails(response.data);
          if (response.status === 200) {
            console.log(response.data)
            setLoading(false)
      
          } else {
            throwToastError('Error generating Script')
            
          }
        } catch (error) {
          console.error('Error fetching the image:', error);
          throwToastError('Error generating Script')
         
        }

    }

    const throwToastError = (error)=>{
        toast.error(error, {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 3000, // Close after 3 seconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
    }

    return(
        <>


          <div className='container min-h-screen min-w-full bg-gradient-to-r from-stone-800 to-slate-800 bg-center bg-cover px-20 py-2 overflow-hidden'>
          
            <Navbar /> 
            

            <h2 className='text-4xl font-bold mt-6 '>Create your <span className='text-transparent font-bold bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600'>script</span></h2>

            <div className='flex'>

            <form className='mt-10'>

            <textarea className='rounded-2xl text-black text-center' cols="50" rows="2" placeholder='Enter character names - comma separated keywords'
                  value={characters}
                  onChange={(e) => setCharacters(e.target.value)}></textarea>
              <br></br>
              <br></br>
              <textarea className='rounded-2xl text-black text-center' cols="50" rows="15" placeholder='Enter the baseline plot'
                  value={baselinePlot}
                  onChange={(e) => setBaselinePlot(e.target.value)}></textarea>

              <br /><br />
              <button className='btn-rect btn-orange' onClick={handleSubmit}>Generate</button>
              
            </form>

            {scriptGenerated && (
              <>
              <div className='rounded-2xl text-black text-center script-box'>
                <ScriptBox sceneDetails = {sceneDetails}/>
              </div>
              
              </>
            )}
            
           <div>
            
           </div>

            <ToastContainer />
            
            </div>

            </div>
        </>
    )
}

export default GenerateScript;