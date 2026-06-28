import { TestBed } from '@angular/core/testing';

import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { PokemonService } from './pokemon-service';
import { PokemonAPIResponse, SimplePokemon } from '../interfaces';

const mockPokeApiResponse: PokemonAPIResponse = {
  count: 1302,
  next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
  previous: '',
  results: [
    {
      name: 'bulbasaur',
      url: 'https://pokeapi.co/api/v2/pokemon/1/',
    },
    {
      name: 'ivysaur',
      url: 'https://pokeapi.co/api/v2/pokemon/2/',
    },
  ],
};

const expectedPokemons: SimplePokemon[] = [
  { id: '1', name: 'bulbasaur' },
  { id: '2', name: 'ivysaur' },
];

const mockPokemon = {
  id: 1,
  name: 'bulbasaur',
} as any;

describe('PokemonService', () => {
  let service: PokemonService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting()],
    });
    service = TestBed.inject(PokemonService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  // Esto se ejecuta para limpiar todo y no quede nada pendiente
  afterEach(() => {
    httpMock.verify();
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load a page of pokemons', () => {
    // Llama al método a probar. Al pasar página 1, el servicio
    // lo convierte internamente a offset=0 (página 1 → offset 0)
    service.loadPage(1).subscribe((pokemons) => {
      // Cuando el servidor responda (simulado con flush más abajo),
      // verifica que los datos transformados sean los esperados
      expect(pokemons).toEqual(expectedPokemons);
    });

    // Intercepta la petición HTTP que el servicio debió haber hecho.
    // Si la URL no coincide exactamente, el test falla aquí
    const req = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=20`);

    // Verifica que se usó el método HTTP correcto
    expect(req.request.method).toBe('GET');

    // Simula la respuesta del servidor con datos falsos.
    // Esto dispara el subscribe de arriba y ejecuta su expect interno
    req.flush(mockPokeApiResponse);
  });

  it('should load page 5 of pokemons', () => {
    service.loadPage(5).subscribe((pokemons) => {
      expect(pokemons).toEqual(expectedPokemons);
      // console.log({ pokemons });
    });
    const req = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon?offset=80&limit=20`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPokeApiResponse);
  });

  it('should load a pokemon by ID', () => {
    service.loadPokemon('1').subscribe((pokemon) => {
      expect(pokemon).toEqual(mockPokemon);
      // console.log({ pokemons });
    });
    const req = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPokemon);
  });

  it('should load a pokemon by Name', () => {
    const pokemonName = 'bulbasaur';
    service.loadPokemon(pokemonName).subscribe((pokemon) => {
      expect(pokemon).toEqual(mockPokemon);
    });
    const req = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPokemon);
  });

  it('should catch error if API fails', () => {
    const pokemonName = 'bulbasaur';
    service.loadPokemon(pokemonName).subscribe({
      //Esto nunca deberia pasar
      next: () => {
        throw new Error('Should have failed with error');
      },
      error: (error) => {
        expect(error.status).toBe(404);
      },
    });
    const req = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    req.flush('404 error', { status: 404, statusText: 'Not found - Pokemon not found' });
  });
});
