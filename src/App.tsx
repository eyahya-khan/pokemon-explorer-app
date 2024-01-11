import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PokemonDetail from "./components/PokemonDetail";
import PokemonList from "./components/PokemonList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PokemonList />} />
        <Route path="/pokemon/:pokemonName" element={<PokemonDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
