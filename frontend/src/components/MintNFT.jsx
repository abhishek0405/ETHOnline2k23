
import Navbar from "./Navbar"

function MintNFT(){
    return(
        <>
            <div className="container min-h-screen min-w-full bg-gradient-to-r from-stone-800 to-slate-800 bg-center bg-cover px-20 py-2 overflow-hidden" >
                
                <Navbar />
                <div class="form-container">
                    <form>
                    <div>
                        <label for="title">Title:</label>
                        <input type="text" id="title" name="title" class="form-field" placeholder="Enter title" />
                    </div>

                    <div>
                        <label for="plotline">Plotline:</label>
                        <textarea id="plotline" name="plotline" class="form-field" rows="5" placeholder="Enter plotline"></textarea>
                    </div>

                    <div>
                        <label for="file">File Upload:</label>
                        <input type="file" id="file" name="file" class="form-field file-upload" />
                    </div>

                    <button type="submit" className="btn btn-orange">Submit</button>
                    </form>
                </div>
        

            </div>
        </>
    )
}

export default MintNFT