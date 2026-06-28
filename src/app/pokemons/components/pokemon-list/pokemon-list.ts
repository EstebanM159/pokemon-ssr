import { Component, inject, input } from '@angular/core';
import { PokemonCard } from '../pokemon-card/pokemon-card';
import { SimplePokemon } from '../../interfaces';

@Component({
  selector: 'pokemon-list',
  imports: [PokemonCard],
  templateUrl: './pokemon-list.html',
})
export class PokemonList {
  pokemons = input<SimplePokemon[]>();
  // pokemonsResource = REsou
}
