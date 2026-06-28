import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { Component } from '@angular/core';
import { Navbar } from './shared/components/navbar/navbar';
@Component({
  selector: 'navbar',
  template: `
    <nav class="test-class">
      <a href="test-link">Test Link</a>
    </nav>
  `,
})
class MockNavbarComponent {}
describe('App', () => {
  let fixture: ComponentFixture<App>;
  let app: App;
  beforeEach(async () => {
    // ! Forma numero 1 de incorporar test con dependencias externas (routerlink en este caso)
    // await TestBed.configureTestingModule({
    //   imports: [App],
    //   providers: [provideRouter([])],
    // }).compileComponents();
    //! Forma 2 removiendo el componente verdadero
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    })
      .overrideComponent(App, {
        add: {
          imports: [MockNavbarComponent],
        },
        remove: {
          imports: [Navbar],
        },
      })

      .compileComponents();
    fixture = TestBed.createComponent(App);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    // console.log(fixture.nativeElement.innerHTML);
    expect(app).toBeTruthy();
  });
  it(`should have the 'pokemon-ssr' title`, () => {
    expect(app.title()).toBe('pokemon-ssr');
  });
  it('should render the navbar and router-outlet', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('navbar')).toBeTruthy();
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });
  it('should match snapshot', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.innerHTML).toMatchSnapshot();
  });
});
