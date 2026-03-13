import { RenderMode, ServerRoute } from '@angular/ssr';
import { PokemonAPIResponse } from './pokemons/interfaces';
const TOTAL_POKEMONS = 10;
export const serverRoutes: ServerRoute[] = [
  {
    path: 'pokemons/page/:page',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const pokemonsIds = Array.from({ length: TOTAL_POKEMONS }, (_, i) => i + 1);
      return pokemonsIds.map((page) => ({ page: `${page}` }));
    },
  },
  {
    path: 'pokemon/:name',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const apiUrl = `https://pokeapi.co/api/v2/ability/?limit=${TOTAL_POKEMONS}`;
      const pokemonList: PokemonAPIResponse = await fetch(apiUrl).then((res) => res.json());
      return pokemonList.results.map((name) => ({ name: `${name.name}` }));
      // return [{ id: '1' }, { id: '2' }, { id: '3' }];
    },
  },
  { path: 'about', renderMode: RenderMode.Prerender },
  { path: 'contact', renderMode: RenderMode.Prerender },
  { path: 'pricing', renderMode: RenderMode.Prerender },

  { path: '**', renderMode: RenderMode.Prerender },
];
