import { Component, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, RouterModule } from '@angular/router';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { DropdownMenuComponent } from './shared/dropdown-menu/dropdown-menu.component';
import { ImprintComponent } from './imprint/imprint.component';
import { MainContentComponent } from './main-content/main-content.component';
import { AppTranslateModule } from './app.translate';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MainContentComponent,
    FooterComponent,
    HeaderComponent,
    DropdownMenuComponent,
    ImprintComponent,
    RouterModule,
    AppTranslateModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit {
  title = 'Portfolio';

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private router: Router,
    private translate: TranslateService,
  ) {
    translate.setDefaultLang('en');
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }

  /**
   * Lifecycle hook that is called after the component's view has been fully initialized.
   * Initializes mouse listeners for the custom cursor.
   * Initializes checkbox listener for the dropdown menu.
   */
  ngAfterViewInit() {
    this.addMouseListeners();
    this.addCheckboxListener();
    this.fixScrollDestination();
  }

  /**
   * Generates a URL for the provided fragment.
   * If the user is on the imprint page, the URL includes the base URL.
   * Otherwise, the URL is just the fragment for in-page navigation.
   * @param fragment The fragment to navigate to.
   * @returns The generated URL.
   */
  getLink(fragment: string): string {
    if (this.router.url === '/imprint') {
      return `/#${fragment}`;
    }
    return `#${fragment}`;
  }

  /**
   * Adds event listeners for mouse movement and click events to animate the custom cursor.
   */
  addMouseListeners() {
    const cursor = this.el.nativeElement.querySelector('#cursor');
    if (cursor) {
      document.addEventListener('mousemove', (e: MouseEvent) => {
        const offsetX = -10;
        const offsetY = -10;
        this.renderer.setStyle(cursor, 'left', `${e.pageX + offsetX}px`);
        this.renderer.setStyle(cursor, 'top', `${e.pageY + offsetY}px`);
      });
      document.addEventListener('click', () => {
        this.renderer.addClass(cursor, 'clicked');
        setTimeout(() => {
          this.renderer.removeClass(cursor, 'clicked');
        }, 500);
      });
    }
  }

  /**
   * Adds the 'overlay-active' class to the body element to disable the scrollbar.
   */
  addDropdownClassToBody() {
    this.renderer.addClass(document.body, 'dropdown-active');
  }

  /**
   * Removes the 'overlay-active' class from the body element to enable the scrollbar.
   */
  removeDropdownClassFromBody() {
    this.renderer.removeClass(document.body, 'dropdown-active');
  }

  /**
   * Handles the change event for the dropdown checkbox.
   * Adds or removes the active class on the overlay and the dropdown class on the body.
   */
  handleCheckboxChange(checkbox: HTMLInputElement, overlay: HTMLElement) {
    if (checkbox.checked) {
      this.renderer.addClass(overlay, 'active');
      this.renderer.addClass(document.body, 'dropdown-active');
    } else {
      this.renderer.removeClass(overlay, 'active');
      this.renderer.removeClass(document.body, 'dropdown-active');
    }
  }

  /**
   * Adds click event listeners to the links within the dropdown.
   * Closes the dropdown when a link is clicked.
   */
  addLinkClickListeners(
    links: NodeListOf<HTMLAnchorElement>,
    checkbox: HTMLInputElement,
    overlay: HTMLElement
  ) {
    links.forEach((link: HTMLAnchorElement) => {
      link.addEventListener('click', () => {
        checkbox.checked = false;
        this.renderer.removeClass(overlay, 'active');
        this.renderer.removeClass(document.body, 'dropdown-active');
      });
    });
  }

  /**
   * Sets up an event listener for the checkbox to show or hide the overlay.
   * When the checkbox is checked, the overlay is displayed. When unchecked, the overlay is hidden.
   */
  addCheckboxListener() {
    const checkbox = this.el.nativeElement.querySelector(
      '#checkbox2'
    ) as HTMLInputElement;
    const overlay = this.el.nativeElement.querySelector(
      '#dropdown'
    ) as HTMLElement;
    const links = this.el.nativeElement.querySelectorAll(
      '.dropdown-links a, .dropdown-bottom a'
    ) as NodeListOf<HTMLAnchorElement>;

    if (checkbox && overlay) {
      checkbox.addEventListener('change', () => {
        this.handleCheckboxChange(checkbox, overlay);
      });

      this.addLinkClickListeners(links, checkbox, overlay);
    }
  }

  /**
   * Takes the header offset into account when scrolling to each section.
   */
  fixScrollDestination() {
    const header = this.el.nativeElement.querySelector('header');
    const headerHeight = header ? header.offsetHeight : 0;
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = (anchor as HTMLAnchorElement)
          .getAttribute('href')!
          .substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - headerHeight,
          });
        }
      });
    });
  }
}
