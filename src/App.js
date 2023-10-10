import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Routes,
  Navigate,
  Redirect,
} from "react-router-dom";
import Login from "./Components/Login";
import ArtistSearch from "./Components/ArtistSearch";
import Albums from "./Components/Albums"
import { useState } from "react";

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [artistID, setArtistID] = useState("");
  const [searchResults, setSearchResults] = useState([]);


  return (
    <Router>
      <div className="App">
        <div className="header-title">
          <h1 className="title-text">Spotify Artist Search</h1>
        </div>

        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route
            path="/login"
            element={<Login setAccessToken={setAccessToken} />}
          />
          <Route
            path="/search"
            element={<ArtistSearch accessToken={accessToken} setArtistID={setArtistID} searchResults={searchResults} setSearchResults={setSearchResults} />}
          />
          <Route
            path="/albums"
            element={<Albums accessToken={accessToken} artistID={artistID} searchResults={searchResults} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
