import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { AdminService } from '../../services/admin/admin.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,],
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
