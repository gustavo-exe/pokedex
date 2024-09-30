import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { FullPokemonDetail, PokemonDetail, PokemonListResponse, PokemonSpeciesDetail, Result } from './app.types';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private baseUrl: string = 'https://pokeapi.co/api/v2';
  private offset: number = 0;
  private limit: number = 12;

  constructor(private http: HttpClient) { }


  getAllPokemonDetails(): Observable<FullPokemonDetail[]> {
    return this.http.get<PokemonListResponse>(`${this.baseUrl}/pokemon?limit=${this.limit}&offset=${this.offset}`).pipe(
      map(response => response.results.map((pokemon) => {
        this.offset += this.limit;
        return pokemon.name
      })),
      switchMap((pokemonNames: string[]) => {
        const detailRequests: Observable<FullPokemonDetail>[] = pokemonNames.map(name => this.getFullPokemonDetails(name));
        return forkJoin(detailRequests);
      })
    );
  }

  private getFullPokemonDetails(name: string): Observable<FullPokemonDetail> {
    return this.http.get<PokemonDetail>(`${this.baseUrl}/pokemon/${name}`).pipe(
      switchMap((pokemonDetail: PokemonDetail) => {
        return this.http.get<PokemonSpeciesDetail>(pokemonDetail.species.url).pipe(
          map((speciesDetail: PokemonSpeciesDetail) => ({
            pokemonDetail,
            speciesDetail
          }))
        );
      }),
      map(({ pokemonDetail, speciesDetail }) => ({
        name: pokemonDetail.name,
        height: pokemonDetail.height,
        weight: pokemonDetail.weight,
        sprites: pokemonDetail.sprites,
        abilities: pokemonDetail.abilities.map(a => a.ability.name),
        types: pokemonDetail.types.map(t => t.type.name),
        eggGroups: speciesDetail.egg_groups.map(g => g.name),
        pokedexEntries: speciesDetail.flavor_text_entries
          .filter(entry => entry.language.name === 'en')
          .map(entry => ({ flavor_text: entry.flavor_text })),
        heldItems: pokemonDetail.held_items.map(item => item.item.name)
      }))
    );
  }
}
