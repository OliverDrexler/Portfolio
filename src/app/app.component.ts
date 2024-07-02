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
   */
  ngAfterViewInit() {
    this.addMouseListeners();
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
}
