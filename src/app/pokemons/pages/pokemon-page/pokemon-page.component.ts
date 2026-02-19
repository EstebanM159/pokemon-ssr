import { Component, inject, signal, effect } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { Pokemon } from '../../interfaces/pokemon.interface';
import { PokemonService } from '../../services/pokemon-service';
import { Meta, Title } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-pokemon-page',
  imports: [],
  templateUrl: './pokemon-page.component.html',
})
export default class PokemonPageComponent {
  pokemonService = inject(PokemonService);
  private route = inject(ActivatedRoute);
  private title = inject(Title);
  private meta = inject(Meta);
  private platformId = inject(PLATFORM_ID);

  // Obtener el ID del Pokémon desde la ruta

  // Cargar el Pokémon basado en el ID
  public pokemon = toSignal(
    this.route.paramMap.pipe(
      switchMap((params) => {
        const id = params.get('id');
        if (!id) return [];
        return this.pokemonService.loadPokemon(id);
      }),
    ),
  );

  constructor() {
    // Actualizar meta tags cuando el Pokémon cambie
    effect(() => {
      const pokemonData = this.pokemon();
      if (pokemonData) {
        this.updateMetaTags(pokemonData);
      }
    });
  }

  private updateMetaTags(pokemonData: Pokemon): void {
    const { name, id, sprites } = pokemonData;
    const pageTitle = `${name} | ${id}`;
    const pageDescription = `Página del pokemon ${name}`;
    const imageUrl = sprites?.other?.showdown?.front_default || sprites?.front_default || '';

    this.title.setTitle(pageTitle);
    // Solo setear el favicon en el navegador, no en el servidor
    if (isPlatformBrowser(this.platformId)) {
      this.setFavicon(sprites?.other?.showdown?.front_default);
    }
    this.meta.updateTag({ name: 'description', content: pageDescription });
    this.meta.updateTag({ name: 'og:title', content: pageTitle });
    this.meta.updateTag({ name: 'og:description', content: pageDescription });
    this.meta.updateTag({
      name: 'og:image',
      content: imageUrl,
    });
  }

  private setFavicon(url: string | undefined): void {
    if (!url) return;
    const link = document.querySelector("link[rel='icon']") as HTMLLinkElement;
    if (link) {
      link.href = url;
    }
  }
}
