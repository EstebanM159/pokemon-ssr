import { Component, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'about-page',
  imports: [],
  templateUrl: './pricing-page.html',
})
export default class PricingPage {
  private title = inject(Title);
  private meta = inject(Meta);
  ngOnInit(): void {
    this.title.setTitle('pricing Page');
    this.meta.updateTag({ name: 'description', content: 'Esta es mi pagina de pricing' });
    this.meta.updateTag({ name: 'og:title', content: 'pricing page' });
    this.meta.updateTag({ name: 'keywords', content: 'hola,mundo,pricing,page' });
  }
}
