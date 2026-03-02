import { Routes } from '@angular/router';
export const routes: Routes = [
  {
    path: 'about',
    loadComponent: () => import('./pages/about-page/about-page'),
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact-page/contact-page'),
  },
  {
    path: 'pricing',
    loadComponent: () => import('./pages/pricing-page/pricing-page'),
  },
  {
    path: 'pokemons/page/:page',
    loadComponent: () => import('./pokemons/pages/pokemons-page/pokemons-page'),
  },

  {
    path: 'pokemon/:id',
    loadComponent: () => import('./pokemons/pages/pokemon-page/pokemon-page.component'),
  },
];
