import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonCard } from './pokemon-card';
import { provideRouter, RouterLink } from '@angular/router';
import { SimplePokemon } from '../../interfaces';
import { Location } from '@angular/common';
import { By } from '@angular/platform-browser';

const mockPokemon: SimplePokemon = {
  id: '1',
  name: 'bulbasaur',
};

describe('PokemonCardComponent', () => {
  let component: PokemonCard;
  let fixture: ComponentFixture<PokemonCard>;
  let location: Location;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PokemonCard],
      providers: [provideRouter([])],
    });
    fixture = TestBed.createComponent(PokemonCard);
    component = fixture.componentInstance;
    location = TestBed.inject(Location);
    // valores inputs
    fixture.componentRef.setInput('pokemon', { ...mockPokemon });

    fixture.detectChanges(); //importante!! Establece valores por defecto de los inputs si los tuvieramos
  });
  it('should be created', () => {
    // console.log(fixture.nativeElement.innerHTML);
    expect(PokemonCard).toBeTruthy();
  });
  it('should have the SimplePokemon signal input', () => {
    expect(component.pokemon()).toStrictEqual(mockPokemon);
  });
  it('should compute the correct pokemon image URL', () => {
    const expectedURLImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${mockPokemon.id}.png`;
    expect(component.pokemonUrlImage()).toBe(expectedURLImage);
  });
  it('should render pokemon name and image correctly', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const nameElement = compiled.querySelector('h2');
    const imgElement = compiled.querySelector('img');
    expect(nameElement?.textContent.trim()).toBe(mockPokemon.name);
    expect(imgElement?.src).toBe(
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${mockPokemon.id}.png`,
    );
    expect(imgElement?.alt).toBe(`Imagen de ${mockPokemon.name}`);
  });
  it('should have the correct routerLink configuration', () => {
    const debugElement = fixture.debugElement.query(By.directive(RouterLink));
    const routerLinkInstance = debugElement.injector.get(RouterLink);
    const expectedUrl = `/pokemon/${mockPokemon.name}`;
    expect(routerLinkInstance.urlTree?.toString()).toBe(expectedUrl);
  });
});
