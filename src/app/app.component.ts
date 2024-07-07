import {
  Component,
  ElementRef,
  Renderer2,
  AfterViewInit,
  HostListener,
  OnInit,
} from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { RouterOutlet, Router, RouterModule, NavigationEnd } from '@angular/router';
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
    AppTranslateModule,
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
    private viewportScroller: ViewportScroller
  ) {
    translate.setDefaultLang('en');
  }

  /**
   * Angular lifecycle hook that is called after data-bound properties are initialized.
   * Calls the function to check the device's orientation.
   */
  ngOnInit() {
    this.checkOrientation();
  }

  /**
   * Host listener for window resize and orientation change events.
   * Calls the function to check the device's orientation whenever the window is resized or orientation changes.
   */
  @HostListener('window:resize')
  @HostListener('window:orientationchange')
  onResizeOrOrientationChange() {
    this.checkOrientation();
  }

  /**
   * Checks the orientation of the device and displays a warning overlay if the device is in landscape mode
   * and has a width of 767px or less (indicating it is a mobile device).
   * Hides the overlay if the device is in portrait mode or is a larger device.
   */
  checkOrientation() {
    const isPortrait = window.innerHeight > window.innerWidth;
    const isSmallScreen = window.innerWidth <= 767;
    if (!isPortrait && isSmallScreen) {
      document.getElementById('landscape-warning')!.style.display = 'flex';
    } else {
      document.getElementById('landscape-warning')!.style.display = 'none';
    }
  }

  /**
   * Changes the current language used by the application to the specified language.
   * It utilizes the translate service to set the new language.
   * @param {string} language - The language code to switch to
   */
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
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const fragment = this.router.parseUrl(this.router.url).fragment;
        if (fragment) {
          setTimeout(() => {
            this.viewportScroller.scrollToAnchor(fragment);
          });
        } else {
          // Scroll to top if no fragment is present
          setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          });
        }
      }
    });
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
      this.setupMouseMoveListener(cursor);
      this.setupClickListener(cursor);
    }
  }

  /**
   * Sets up an event listener for mouse movements.
   * Updates the position of the custom cursor based on mouse movements.
   * @param cursor - The custom cursor element.
   */
  setupMouseMoveListener(cursor: HTMLElement) {
    document.addEventListener('mousemove', (e: MouseEvent) => {
      const offsetX = -10;
      const offsetY = -10;
      this.renderer.setStyle(cursor, 'left', `${e.pageX + offsetX}px`);
      this.renderer.setStyle(cursor, 'top', `${e.pageY + offsetY}px`);
    });
  }

  /**
   * Sets up an event listener for mouse clicks.
   * Adds the 'clicked' class to the custom cursor and removes it after 500 ms.
   * @param cursor - The custom cursor element.
   */
  setupClickListener(cursor: HTMLElement) {
    document.addEventListener('click', () => {
      this.renderer.addClass(cursor, 'clicked');
      setTimeout(() => {
        this.renderer.removeClass(cursor, 'clicked');
      }, 500);
    });
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
}
