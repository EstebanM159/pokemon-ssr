import { Component, inject, OnInit, signal } from '@angular/core';
import { PokemonList } from '../../components/pokemon-list/pokemon-list';
import { PokemonsListSkeleton } from '../../ui/pokemons-list-skeleton/pokemons-list-skeleton';
import { PokemonService } from '../../services/pokemon-service';
import { SimplePokemon } from '../../interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'pokemons-page',
  imports: [PokemonList, PokemonsListSkeleton],
  templateUrl: './pokemons-page.html',
})
export default class PokemonsPage implements OnInit {
  pokemonService = inject(PokemonService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  title = inject(Title);
  public isLoading = signal(true);
  public pokemons = signal<SimplePokemon[]>([]);
  public currentPage = toSignal<number>(
    this.route.queryParamMap.pipe(
      map((params) => params.get('page') ?? '1'),
      map((page) => (isNaN(+page) ? 1 : +page)),
      map((page) => Math.max(1, page)),
    ),
  );

  ngOnInit(): void {
    console.log(this.currentPage());
    this.loadPokemons();
  }
  loadPokemons(page: number = 0) {
    const pageToLoad = this.currentPage()! + page;
    this.pokemonService
      .loadPage(pageToLoad)
      .pipe(
        tap(() => this.router.navigate([], { queryParams: { page: pageToLoad } })),
        tap(() => this.title.setTitle(`Pokémons SSR - Page ${pageToLoad}`)),
      )
      .subscribe((pokemons) => {
        this.pokemons.set(pokemons);
      });
  }
}
