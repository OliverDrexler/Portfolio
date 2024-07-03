import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-arrow',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './arrow.component.html',
  styleUrl: './arrow.component.scss'
})
export class ArrowComponent {
 @Input() isRight: boolean = true;
}
