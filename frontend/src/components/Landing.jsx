import { orange_girl } from "../assets"
import Navbar from "./Navbar"

function Landing(){
    return(
        <>
            <div className="container min-h-screen min-w-full bg-gradient-to-r from-stone-800 to-slate-800 bg-center bg-cover px-20 py-2 overflow-hidden">
                
                <Navbar />

                <div className="mt-36 min-w-4xl flex">

                    <div>
                        <h1 className="text-6xl font-semibold leading-normal">Think you need artistry to bring <br />out the author in you?</h1>
                        <p className="mt-8 text-5xl text-transparent font-bold bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Not anymore!</p>

                        <button className="btn btn-orange mt-12" style={{fontSize : '18px'}}>Create NFT now!</button>
                    </div>
                    
                    <div className="ml-20 overflow-hidden" style={{position : 'absolute',top : '16%', left : '63%'}}> 
                        <img className="overflow-hidden" src={orange_girl} alt="" />
                    </div>
                    
                </div>
            </div>
        </>
    )
}

export default Landing