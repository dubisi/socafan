import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { AdminComponent } from './components/admin/admin.component';
import { HowItWorksComponent } from './components/how-it-works/how-it-works.component';
import { LoginComponent } from './components/login/login.component';
import { ResultsComponent } from './components/results/results.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SocafanPlayComponent } from './components/socafan-play/socafan-play.component';
import { SocafanComponent } from './components/socafan/socafan.component';
import { AdminGuard } from './guard/admin.guard';
import { AuthGuard } from './guard/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
  { path: 'socafan', component: SocafanComponent },
  { path: 'socafan-play', component: SocafanPlayComponent, canActivate: [AuthGuard] },
  { path: 'about-us', component: AboutUsComponent, canActivate: [AuthGuard] },
  { path: 'how-it-works', component: HowItWorksComponent },
  { path: 'result', component: ResultsComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
