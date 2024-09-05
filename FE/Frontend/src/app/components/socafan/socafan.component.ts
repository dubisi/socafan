import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-socafan',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule, MatCardModule, RouterModule, RouterOutlet],
  templateUrl: './socafan.component.html',
  styleUrl: './socafan.component.scss'
})
export class SocafanComponent {

}
