import { Component, OnInit } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-legal-notice',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './legal-notice.component.html',
  styleUrl: './legal-notice.component.scss'
})
export class LegalNoticeComponent {
  constructor(
    private translate: TranslateService,
    private viewportScroller: ViewportScroller
  ) {}

  ngOnInit(): void {
    this.scrollToTop();
  }

  scrollToTop(): void {
    this.viewportScroller.scrollToPosition([0, 0]);
  }
}
