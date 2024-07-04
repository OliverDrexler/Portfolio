import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, TranslateModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  constructor(private translate: TranslateService) {}
  
  contactData = {
    name: '',
    email: '',
    message: '',
    privacyAccepted: false,
  }

  //   mailTest = true;

  // post = {
  //   endPoint: 'https://deineDomain.de/sendMail.php',
  //   body: (payload: any) => JSON.stringify(payload),
  //   options: {
  //     headers: {
  //       'Content-Type': 'text/plain',
  //       responseType: 'text',
  //     },
  //   },
  // };

  onSubmit(ngForm: NgForm) {
    // if (this.contactData.privacyAccepted && ngForm.submitted && ngForm.form.valid && !this.mailTest) {
    //   this.http.post(this.post.endPoint, this.post.body(this.contactData))
    //     .subscribe({
    //       next: (response) => {
              // Platz für weitere aktionen (danke für die mail mesage etc)
    //         ngForm.resetForm();
    //       },
    //       error: (error) => {
    //         console.error(error);
    //       },
    //       complete: () => console.info('send post complete'),
    //     });
    // } else if (ngForm.submitted && ngForm.form.valid && this.mailTest) {

    //   ngForm.resetForm();
    // }
  }
}
