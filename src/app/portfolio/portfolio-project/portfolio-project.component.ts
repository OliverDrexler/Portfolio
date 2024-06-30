import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-portfolio-project',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './portfolio-project.component.html',
  styleUrl: './portfolio-project.component.scss',
})
export class PortfolioProjectComponent {
  @Input() isReverse: boolean = false;
  @Input() currentProject: number = 1;
  @Input() totalProjects: number = 1;

  projects = [
    {
      imgSrc: '../../../assets/img/04_projects/join.png',
      imgAlt: 'Join',
      name: 'Join'
    },
    {
      imgSrc: '../../../assets/img/04_projects/pl.png',
      imgAlt: 'El Pollo Loco',
      name: 'El Pollo Loco'
    }
  ]

  /**
   * Returns the appropriate image source based on the isReverse flag.
   * @returns {string} The image source URL.
   */
  getImgSrc(): string {
    const projectIndex = this.currentProject - 1;
    return this.projects[projectIndex]?.imgSrc || '';
  }

  /**
   * Returns the appropriate alt text based on the isReverse flag.
   * @returns {string} The alt text for the image.
   */
  getImgAlt(): string {
    const projectIndex = this.currentProject - 1;
    return this.projects[projectIndex]?.imgAlt || '';
  }

  /**
   * Formats a number to ensure it is at least two digits.
   * If the number is less than 10, it prefixes the number with a zero.
   * @param {number} num - The number to format.
   * @returns {string} The formatted number as a string.
   */
  formatNumber(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }

  /**
   * Returns the appropriate project name based on the current project index.
   * @returns {string} The project name.
   */
  getName(): string {
    const projectIndex = this.currentProject - 1;
    return this.projects[projectIndex]?.name || '';
  }
}
