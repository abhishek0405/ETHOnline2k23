import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Landing,
  CreateCharacter,
  EditCharacter,
  GenerateScript,
} from "./components";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="content">
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
              path="/createCharacter"
              element={
                <>
                  <CreateCharacter />
                </>
              }
            />

            <Route
              exact
              path="/editCharacter"
              element={
                <>
                  <EditCharacter />
                </>
              }
            />

            <Route
              exact
              path="/generateScript"
              element={
                <>
                  <GenerateScript />
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
