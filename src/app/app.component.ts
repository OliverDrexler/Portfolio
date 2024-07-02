import { Component, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ArrowLeftComponent } from './arrow-left/arrow-left.component';
import { SkillsComponent } from './skills/skills.component';
import { ArrowRightComponent } from './arrow-right/arrow-right.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { PortfolioProjectComponent } from './portfolio/portfolio-project/portfolio-project.component';
import { ContactComponent } from './contact/contact.component';
import { DropdownMenuComponent } from './shared/dropdown-menu/dropdown-menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    FooterComponent,
    HeaderComponent,
    LandingPageComponent,
    AboutMeComponent,
    ArrowLeftComponent,
    SkillsComponent,
    ArrowRightComponent,
    PortfolioComponent,
    PortfolioProjectComponent,
    ContactComponent,
    DropdownMenuComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit {
  title = 'Portfolio';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  /**
   * Lifecycle hook that is called after the component's view has been fully initialized.
   * Initializes mouse listeners for the custom cursor.
   * Initializes checkbox listener for the dropdown menu.
   */
  ngAfterViewInit() {
    this.addMouseListeners();
    this.addCheckboxListener();
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
   * Sets up an event listener for the checkbox to show or hide the overlay.
   * When the checkbox is checked, the overlay is displayed. When unchecked, the overlay is hidden.
   */
  addCheckboxListener() {
    const checkbox = this.el.nativeElement.querySelector('#checkbox2');
    const overlay = this.el.nativeElement.querySelector('#dropdown');

    if (checkbox && overlay) {
      checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
          this.renderer.addClass(overlay, 'active');
          this.addDropdownClassToBody();
        } else {
          this.renderer.removeClass(overlay, 'active');
          this.removeDropdownClassFromBody();
        }
      });
    }
  }
}
