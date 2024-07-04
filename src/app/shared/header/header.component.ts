import { Component, EventEmitter, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Output() openNoteChange: EventEmitter<boolean> = new EventEmitter();
  hoveredAddBtn = false;

  constructor(private router: Router) {}

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
