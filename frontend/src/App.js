

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Landing, Marketplace, MyNFT, MintNFT} from './components';




function App() {

  
  

  
  return (
    <Router>
        <div className="App">
          <div className='content'>
            <Routes>
              <Route
                exact
                path="/"
                element={
                  <>
                    <Landing />
                  </>
                }
              />

              <Route
                exact
                path="/marketplace"
                element={
                  <>
                    <Marketplace />
                  </>
                }
              />

              <Route
                exact
                path="/myNFTs"
                element={
                  <>
                    <MyNFT />
                  </>
                }
              />

              <Route
                exact
                path="/mintNFT"
                element={
                  <>
                    <MintNFT />
                  </>
                }
              />


              

            </Routes>

          </div>
          
        </div>
    </Router>
  );
}

export default App;
