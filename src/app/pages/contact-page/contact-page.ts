import { Component, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'contact-page',
  imports: [],
  templateUrl: './contact-page.html',
})
export default class ContactPage {
  private title = inject(Title);
  private meta = inject(Meta);
  ngOnInit(): void {
    this.title.setTitle('contact Page');
    this.meta.updateTag({ name: 'description', content: 'Esta es mi pagina de contact' });
    this.meta.updateTag({ name: 'og:title', content: 'contact page' });
    this.meta.updateTag({ name: 'keywords', content: 'hola,mundo,contact,page' });
  }
}
