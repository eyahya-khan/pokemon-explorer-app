import "../App.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CircularProgress,
  Pagination,
  Typography,
} from "@mui/material";
import axios from "axios";
import { capitalizeFirstLetter } from "../utills/CapitalizeFirstLetter";

interface PokemonListItem {
  name: string;
  url: string;
}

const PokemonList: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<PokemonListItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [pageNumber, setPageNumber] = useState(0);
  const pokemonPerPage = 3;
  const visitedPost = pageNumber * pokemonPerPage;
  const displayPokemonList = pokemonList.slice(
    visitedPost,
    visitedPost + pokemonPerPage
  );

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

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPageNumber(value - 1);
  };
  const countPage = Math.ceil(pokemonList.length / pokemonPerPage);

  return (
    <div className="pokemonNamelist">
      <div>
        <h1>Pokémon List</h1>
        {loading ? (
          <CircularProgress />
        ) : (
          <div>
            {displayPokemonList.map((pokemon) => (
              <Card
                key={pokemon.name}
                sx={{ marginBottom: 2, textAlign: "center" }}
              >
                <CardContent>
                  <Link to={`/pokemon/${pokemon.name}`}>
                    <img
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
                        pokemon.url.split("/")[6]
                      }.png`}
                      alt={pokemon.name}
                      style={{
                        marginLeft: "10px",
                        width: "50px",
                        height: "50px",
                      }}
                    />
                  </Link>
                  <Typography variant="h5" component="div">
                    <Link to={`/pokemon/${pokemon.name}`}>
                      {capitalizeFirstLetter(pokemon.name)}
                    </Link>
                  </Typography>
                </CardContent>
              </Card>
            ))}

            <Pagination
              count={countPage}
              page={pageNumber + 1}
              variant="outlined"
              shape="rounded"
              onChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonList;
