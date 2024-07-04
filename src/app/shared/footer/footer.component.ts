import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule, TranslateModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  constructor(private router: Router, private translate: TranslateService) {}

  /**
   * Generates a URL for the provided fragment.
   * If the user is on the imprint page, the URL includes the base URL.
   * Otherwise, the URL is just the fragment for in-page navigation.
   * @param fragment The fragment to navigate to.
   * @returns The generated URL.
   */
  getLink(fragment: string): string {
    if (window.location.pathname.includes('/imprint')) {
      return `/#${fragment}`;
    }
    return `#${fragment}`;
  }
}
