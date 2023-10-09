

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Landing} from './components';


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


              

            </Routes>

          </div>
          
        </div>
    </Router>
  );
}

export default App;
