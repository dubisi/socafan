import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InMemoryDataService } from './services/in-memory-data/in-memory-data.service';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { LoginComponent } from './components/login/login.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HowItWorksComponent } from './components/how-it-works/how-it-works.component';
import { ResultsComponent } from './components/results/results.component';
import { SocafanComponent } from './components/socafan/socafan.component';
import { AdminComponent } from './components/admin/admin.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { SocafanPlayComponent } from './components/socafan-play/socafan-play.component';
import { MatInputModule } from '@angular/material/input'; // Import MatInputModule
import { MatSelectModule } from '@angular/material/select';
import { AuthService } from './services/auth/auth.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    LoginComponent,
    AboutUsComponent,
    SignUpComponent,
    HowItWorksComponent,
    ResultsComponent,
    SocafanComponent,
    AdminComponent,
    SocafanPlayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    BrowserModule,
    ReactiveFormsModule,       // For reactive forms
    FormsModule,              // For template-driven forms
    HttpClientModule,
    CommonModule, MatCardModule, FormsModule, MatMenuModule, MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatDatepickerModule, RouterModule, RouterOutlet, MatRadioModule,
    MatFormFieldModule,  // Add this
    MatInputModule,      // Add this for matInput
    MatSelectModule,
    MatSnackBarModule  // Importing Material Button module
  ],
  providers: [
    AuthService,
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
