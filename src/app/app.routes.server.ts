import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: 'about', renderMode: RenderMode.Prerender },
  { path: 'contact', renderMode: RenderMode.Prerender },
  { path: 'pricing', renderMode: RenderMode.Prerender },
  // { path: 'pokemons', renderMode: RenderMode.Server },
  { path: 'pokemon/:id', renderMode: RenderMode.Server },
  {
    path: 'pokemons/page/:page',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      console.log('PRERENDER DE PAGE');
      return [{ page: '1' }];
    },
  },
  { path: '**', renderMode: RenderMode.Server },
];
