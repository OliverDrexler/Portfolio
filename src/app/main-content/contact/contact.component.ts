import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, TranslateModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  constructor(private translate: TranslateService) {}

  http = inject(HttpClient);

  contactData = {
    name: '',
    email: '',
    message: '',
    privacyAccepted: false,
  };

  showNotification = false;

  mailTest = true;

  post = {
    endPoint: 'https://oliverdrexler.com/sendMail.php',
    body: (payload: any) => JSON.stringify(payload),
    options: {
      headers: {
        'Content-Type': 'text/plain',
        responseType: 'text',
      },
    },
  };

  onSubmit(ngForm: NgForm) {
    if (
      this.contactData.privacyAccepted &&
      ngForm.submitted &&
      ngForm.form.valid &&
      !this.mailTest
    ) {
      this.http
        .post(this.post.endPoint, this.post.body(this.contactData))
        .subscribe({
          next: (response) => {
            // Platz für weitere aktionen (danke für die mail mesage etc)
            this.showNotification = true;
            setTimeout(() => {
              this.showNotification = false;
            }, 3000);
            ngForm.resetForm();
          },
          error: (error) => {
            console.error(error);
          },
          complete: () => console.info('send post complete'),
        });
    } else if (ngForm.submitted && ngForm.form.valid && this.mailTest) {
      ngForm.resetForm();
      this.showNotification = true;
      setTimeout(() => {
        this.showNotification = false;
      }, 3000);
    }
  }
}
