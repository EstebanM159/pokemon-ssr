import { Component, computed, input } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref, RouterLink } from '@angular/router';
import { SimplePokemon } from '../../interfaces';

@Component({
  selector: 'pokemon-card',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './pokemon-card.html',
})
export class PokemonCard {
  pokemon = input<SimplePokemon>();
  public readonly pokemonUrlImage = computed(
    () =>
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.pokemon()?.id}.png`,
  );
}
