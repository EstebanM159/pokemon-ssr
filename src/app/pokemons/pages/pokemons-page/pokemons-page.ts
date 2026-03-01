import { Component, effect, inject, signal } from '@angular/core';
import { PokemonList } from '../../components/pokemon-list/pokemon-list';
import { PokemonsListSkeleton } from '../../ui/pokemons-list-skeleton/pokemons-list-skeleton';
import { PokemonService } from '../../services/pokemon-service';
import { SimplePokemon } from '../../interfaces';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'pokemons-page',
  imports: [PokemonList, PokemonsListSkeleton, RouterLink],
  templateUrl: './pokemons-page.html',
})
export default class PokemonsPage {
  pokemonService = inject(PokemonService);
  private route = inject(ActivatedRoute);
  title = inject(Title);
  public isLoading = signal(true);
  public pokemons = signal<SimplePokemon[]>([]);
  public currentPage = toSignal<number>(
    this.route.params.pipe(
      map((params) => params['page'] ?? '1'),
      map((page) => (isNaN(+page) ? 1 : +page)),
      map((page) => Math.max(1, page)),
    ),
  );

  public loadOnPage = effect(() => {
    this.loadPokemons(this.currentPage());
  });
  loadPokemons(page: number = 0) {
    const pageToLoad = this.currentPage()! + page;
    this.pokemonService
      .loadPage(pageToLoad)
      .pipe(tap(() => this.title.setTitle(`Pokémons SSR - Page ${pageToLoad}`)))
      .subscribe((pokemons) => {
        this.pokemons.set(pokemons);
      });
  }
}
