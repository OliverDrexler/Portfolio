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

  imgSrcNormal = '../../../assets/img/04_projects/join.png';
  imgAltNormal = 'Join';
  imgSrcReverse = '../../../assets/img/04_projects/pl.png';
  imgAltReverse = 'El Pollo Loco';

  /**
   * Returns the appropriate image source based on the isReverse flag.
   * @returns {string} The image source URL.
   */
  getImgSrc() {
    return this.isReverse ? this.imgSrcReverse : this.imgSrcNormal;
  }

  /**
   * Returns the appropriate alt text based on the isReverse flag.
   * @returns {string} The alt text for the image.
   */
  getImgAlt() {
    return this.isReverse ? this.imgAltReverse : this.imgAltNormal;
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
}
