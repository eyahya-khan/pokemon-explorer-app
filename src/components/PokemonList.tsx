import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CircularProgress, Typography } from "@mui/material";
import axios from "axios";

interface PokemonListItem {
  name: string;
  url: string;
}

const PokemonList: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<PokemonListItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon");
        setPokemonList(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchPokemonList();
  }, []);

  return (
    <div>
      <h1>Pokémon List</h1>
      {loading ? (
        <CircularProgress />
      ) : (
        <div>
          {pokemonList.map((pokemon) => (
            <Card key={pokemon.name} sx={{ marginBottom: 2 }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  <Link to={`/pokemon/${pokemon.name}`}>{pokemon.name}</Link>
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default PokemonList;
