import { Component, inject, input } from '@angular/core';
import { PokemonCard } from '../pokemon-card/pokemon-card';
import { PokemonService } from '../../services/pokemon-service';
import { SimplePokemon } from '../../interfaces';

@Component({
  selector: 'pokemon-list',
  imports: [PokemonCard],
  templateUrl: './pokemon-list.html',
})
export class PokemonList {
  pokemonService = inject(PokemonService);
  pokemons = input<SimplePokemon[]>();
  // pokemonsResource = REsou
}
