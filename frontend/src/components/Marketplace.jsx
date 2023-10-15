
import Navbar from "./Navbar"

function Marketplace(){
    return(
        <>
            <div className="container min-h-screen min-w-full bg-gradient-to-r from-stone-800 to-slate-800 bg-center bg-cover px-20 py-2 overflow-hidden">
                
                <Navbar />
                <div class="container mx-auto p-6">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
     
      <div class="card">
        <div class="p-6 bg-white rounded-lg shadow-lg glass-effect">
            <img src="https://waifu.vercel.app/sfw/neko" alt="placeholder-image" style={{height: 100, width: 100, borderRadius:'50%'}}/>
          <h2 class="text-xl font-bold mb-4">Product 1</h2>
          <p>Description of Product 1 goes here.</p>
          <button class="btn btn-orange mt-4 ml-20">Buy</button>
        </div>
      </div>

      <div class="card">
        <div class="p-6 bg-white rounded-lg shadow-lg glass-effect">
        <img src="https://waifu.vercel.app/sfw/shinobu" alt="placeholder-image" style={{height: 100, width: 100, borderRadius:'50%'}}/>
          <h2 class="text-xl font-bold mb-4">Product 2</h2>
          <p>Description of Product 2 goes here.</p>
          <button class="btn btn-orange mt-4 ml-20">Buy</button>
        </div>
      </div>

      <div class="card">
        <div class="p-6 bg-white rounded-lg shadow-lg glass-effect">
        <img src="https://waifu.vercel.app/sfw/hug" alt="placeholder-image" style={{height: 100, width: 100, borderRadius:'50%'}}/>
          <h2 class="text-xl font-bold mb-4">Product 3</h2>
          <p>Description of Product 3 goes here.</p>
          <button class="btn btn-orange mt-4 ml-20">Buy</button>
        </div>
      </div>

      <div class="card">
        <div class="p-6 bg-white rounded-lg shadow-lg glass-effect">
        <img src="https://waifu.vercel.app/sfw/waifu" alt="placeholder-image" style={{height: 100, width: 100, borderRadius:'50%'}}/>
          <h2 class="text-xl font-bold mb-4">Product 4</h2>
          <p>Description of Product 4 goes here.</p>
          <button class="btn btn-orange mt-4 ml-20">Buy</button>
        </div>
      </div>
    </div>
  </div>

            </div>
        </>
    )
}

export default Marketplace