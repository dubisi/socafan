import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdminService } from '../../services/admin/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

  form: FormGroup;

  constructor(private fb: FormBuilder, private adminService: AdminService) {
    this.form = this.fb.group({
      Home: [''],
      Away: [''],
      EnterdDate: [new Date()],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const formData = this.form.value;
      this.adminService.submitForm(formData).subscribe(
        response => {
          console.log('Form submitted successfully', response);
          // Handle successful submission (e.g., show a success message)
        },
        error => {
          console.error('Error submitting form', error);
          // Handle submission error (e.g., show an error message)
        }
      );
    }
  }
}
