import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Landing,
  CreateCharacter,
  EditCharacter,
  GenerateScript,
  MangaEditor,
} from "./components";
import { Marketplace, MyNFT, MintNFT } from "./components";

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
            <Route
              exact
              path="/editManga"
              element={
                <>
                  <MangaEditor />
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
