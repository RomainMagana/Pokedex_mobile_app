import {Pokemon} from "../response/Pokemon";

export interface PokemonApi {
    next?: string,
    results: Pokemon[]
}