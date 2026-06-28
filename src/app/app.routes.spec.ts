import { Location } from '@angular/common';
import { routes } from './app.routes';
import { provideRouter, Router } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import AboutPage from './pages/about-page/about-page';
import PricingPage from './pages/pricing-page/pricing-page';
import PokemonsPage from './pokemons/pages/pokemons-page/pokemons-page';
import PokemonPageComponent from './pokemons/pages/pokemon-page/pokemon-page.component';
describe('App routes', () => {
  let location: Location;
  let router: Router;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter(routes)],
    });
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });

  it('should be defined', () => {
    expect(routes).toBeDefined();
  });

  it('should contain all defined routes', () => {
    expect(routes.length).toBe(6);
  });

  it('should render AboutPageComponent when path is /about', async () => {
    const aboutRoute = routes.find((route) => route.path === 'about')!;
    expect(aboutRoute).toBeDefined();
    const component = (await aboutRoute.loadComponent!()) as any;
    expect(component.default).toBe(AboutPage);
  });

  it('should navigate to "/about" and render AboutPageComponent', async () => {
    await router.navigate(['/']);
    expect(location.path()).toBe('/about');
  });

  it('should render PricingPageComponent when path is /pricing', async () => {
    const pricingPage = routes.find((route) => route.path === 'pricing');
    const component = (await pricingPage?.loadComponent!()) as any;
    expect(pricingPage).toBeDefined();
    expect(component.default).toBe(PricingPage);
  });

  it('should navigate to "/pokemons/page/1" and render PokemonsPageComponent', async () => {
    await router.navigate(['/pokemons/page/1']);
    expect(location.path()).toBe('/pokemons/page/1');
  });

  it('should render PokemonsPageComponent when path is /pokemons/page/:page', async () => {
    const route = routes.find((route) => route.path === 'pokemons/page/:page')!;
    expect(route).toBeDefined();
    const component = (await route.loadComponent!()) as any;
    expect(component.default).toBe(PokemonsPage);
  });

  it('should redirect to /about when path is unknown', async () => {
    await router.navigate(['/adsdas']);
    expect(location.path()).toBe('/about');
  });
});
