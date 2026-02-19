import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'pricing-page',
  imports: [],
  templateUrl: './pricing-page.html',
})
export default class PricingPage implements OnInit {
  private title = inject(Title);
  private meta = inject(Meta);
  private platform = inject(PLATFORM_ID);
  ngOnInit(): void {
    if (isPlatformBrowser(this.platform)) {
      document.title = 'Pricing page';
      return;
    }

    // this.title.setTitle('Pricing Page');
    this.meta.updateTag({ name: 'description', content: 'Este es mi pricing page' });
    this.meta.updateTag({ name: 'og:title', content: 'Este es mi pricing Page' });
    this.meta.updateTag({ name: 'keywords', content: 'PokemonSSR,pricing,page,' });
  }
}
