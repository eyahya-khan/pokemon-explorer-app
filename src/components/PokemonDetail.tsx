import "../App.css";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";
import axios from "axios";
import { capitalizeFirstLetter } from "../utills/CapitalizeFirstLetter";
import { PokemonDetails } from "../utills/intterfaces";

const PokemonDetail: React.FC = () => {
  const { pokemonName } = useParams<{ pokemonName: string }>();
  const [pokemonData, setPokemonData] = useState<PokemonDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
        );
        setPokemonData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchPokemonData();
  }, [pokemonName]);

  return (
    <div className="pokemonNamelist">
      <div>
        <h1>Pokémon Details</h1>
        {loading ? (
          <CircularProgress />
        ) : (
          <div>
            <Card
              sx={{
                marginBottom: 2,
                textAlign: "center",
                boxShadow: "0 5px 5px rgba(0,0,0,0.5)",
                backgroundColor: "#9EDEF9",
              }}
            >
              <CardContent>
                <Typography variant="h5" component="div">
                  {capitalizeFirstLetter(pokemonData?.name || "")}
                </Typography>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ marginTop: 2, textAlign: "left" }}
                >
                  Abilities:
                </Typography>
                <ul>
                  {pokemonData?.abilities.map((ability, index) => (
                    <li key={index}>
                      {capitalizeFirstLetter(ability.ability.name)}
                    </li>
                  ))}
                </ul>
                <Button
                  variant="contained"
                  component={Link}
                  to="/"
                  sx={{ marginTop: 2 }}
                >
                  Back to Pokémon List
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonDetail;
