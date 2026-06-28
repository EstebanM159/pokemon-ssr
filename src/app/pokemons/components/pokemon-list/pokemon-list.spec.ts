import { provideRouter } from '@angular/router';
import { SimplePokemon } from './../../interfaces/simple-pokemon-interface';
import { PokemonList } from './pokemon-list';
import { ComponentFixture, TestBed } from '@angular/core/testing';
const mockListComponent: SimplePokemon[] = [
  { id: '1', name: 'pikachu' },
  { id: '2', name: 'bulbasaur' },
];
describe('PokemonList', () => {
  let component: PokemonList;
  let fixture: ComponentFixture<PokemonList>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PokemonList],
      providers: [provideRouter([])],
    });
    fixture = TestBed.createComponent(PokemonList);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('pokemons', [...mockListComponent]);

    fixture.detectChanges(); //importante!! Establece valores por defecto de los inputs si los tuvieramos
  });
  it('should be created', () => {
    expect(PokemonList).toBeTruthy();
  });
  it('should render the pokemon list', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const card = compiled.querySelectorAll('pokemon-card');
    expect(card.length).toBe(mockListComponent.length);
    // expect(component.pokemons()).toStrictEqual(mockListComponent);
  });
  it('should render "No hay pokemons" when list is empty', () => {
    fixture.componentRef.setInput('pokemons', []);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const message = compiled.querySelector('div.col-span-5');
    expect(message?.textContent.trim()).toBe('No hay pokemons');
  });
});
