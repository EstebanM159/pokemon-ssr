import { Routes } from '@angular/router';
import { RenderMode } from '@angular/ssr';

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
    path: 'pokemons',
    loadComponent: () => import('./pokemons/pages/pokemons-page/pokemons-page'),
  },

  {
    path: '**',
    redirectTo: 'about',
  },
];
