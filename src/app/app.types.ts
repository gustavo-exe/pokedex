export interface PokemonListResponse {
  count:    number;
  next:     string;
  previous: null;
  results:  Result[];
}

export interface Result {
  name: string;
  url:  string;
}

export interface PokemonDetail {
  name: string;
  height: number;
  weight: number;
  sprites: { front_default: string };
  abilities: { ability: { name: string } }[];
  types: { type: { name: string } }[];
  held_items: { item: { name: string } }[];
  species: { url: string };
}

export interface PokemonSpeciesDetail {
  egg_groups: { name: string }[];
  flavor_text_entries: { flavor_text: string, language: { name: string } }[];
}

export interface FullPokemonDetail {
  name: string;
  height: number;
  weight: number;
  sprites: { front_default: string };
  abilities: string[];
  types: string[];
  eggGroups: string[];
  pokedexEntries: { flavor_text: string }[];
  heldItems: string[];
}
