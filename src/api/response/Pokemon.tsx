import {PokemonSprites} from "./PokemonSprites";
import {PokemonType} from "./PokemonType";
import {PokemonStats} from "./PokemonStats";

export interface Pokemon {
    id: number,
    url: string,
    name: string,
    sprites: PokemonSprites,
    height: number,
    weight: number,
    types: Array<PokemonType>,
    stats: Array<PokemonStats>,
}