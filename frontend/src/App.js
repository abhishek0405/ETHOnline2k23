

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Landing, Marketplace} from './components';
import MyNFT from "./components/MyNFTs";
import { NavLink } from 'react-router-dom'


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


              

            </Routes>

          </div>
          
        </div>
    </Router>
  );
}

export default App;
