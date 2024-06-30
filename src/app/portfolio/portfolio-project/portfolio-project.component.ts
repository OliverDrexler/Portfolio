import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-portfolio-project',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './portfolio-project.component.html',
  styleUrl: './portfolio-project.component.scss'
})
export class PortfolioProjectComponent {
  @Input() isReverse: boolean = false;

  imgSrcNormal = '../../../assets/img/04_projects/join.png';
  imgAltNormal = 'Join';
  imgSrcReverse = '../../../assets/img/04_projects/pl.png';
  imgAltReverse = 'El Pollo Loco';

  getImgSrc() {
    return this.isReverse ? this.imgSrcReverse : this.imgSrcNormal;
  }

  getImgAlt() {
    return this.isReverse ? this.imgAltReverse : this.imgAltNormal;
  }
}
