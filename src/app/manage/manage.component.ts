import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
  ],
  templateUrl: './manage.component.html',
  styleUrl: './manage.component.scss'
})
export class ManageComponent {

  constructor( 
    private router: Router
  ){}

  onBack(){
    this.router.navigate(['transactions']);
  }
}
