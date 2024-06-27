import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { AotComponent } from './aot/aot.component';
import { AboutMeComponent } from './about-me/about-me.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    FooterComponent,
    HeaderComponent,
    AotComponent,
    AboutMeComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Portfolio';
}

document.addEventListener('mousemove', (e: MouseEvent) => {
  const cursor = document.getElementById('cursor') as HTMLDivElement;
  if (cursor) {
    const offsetX = -10;
    const offsetY = -10;

    cursor.style.left = `${e.pageX + offsetX}px`;
    cursor.style.top = `${e.pageY + offsetY}px`;
  }
});
