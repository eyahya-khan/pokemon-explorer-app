import "../App.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CircularProgress,
  Pagination,
  PaginationItem,
  Typography,
} from "@mui/material";
import axios from "axios";

interface PokemonListItem {
  name: string;
  url: string;
}

const PokemonList: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<PokemonListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

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

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPokemonList = pokemonList.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <div className="pokemonNamelist">
      <div>
        <h1>Pokémon List</h1>
        {loading ? (
          <CircularProgress />
        ) : (
          <div>
            {currentPokemonList.map((pokemon) => (
              <Card
                key={pokemon.name}
                sx={{ marginBottom: 2, textAlign: "center" }}
              >
                <CardContent>
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
                  <Typography variant="h5" component="div">
                    <Link to={`/pokemon/${pokemon.name}`}>
                      {capitalizeFirstLetter(pokemon.name)}
                    </Link>
                  </Typography>
                </CardContent>
              </Card>
            ))}

            <Pagination
              count={Math.ceil(pokemonList.length / itemsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              size="large"
              showFirstButton
              showLastButton
              sx={{ marginTop: 2 }}
              renderItem={(item) => (
                <PaginationItem
                  component={Link}
                  to={`/pokemon/${item.page}`}
                  {...item}
                />
              )}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonList;
