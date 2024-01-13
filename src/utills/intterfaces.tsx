export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonDetails {
  name: string;
  abilities: { ability: { name: string } }[];
  sprites: { front_default: string };
}
