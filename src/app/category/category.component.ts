import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CategoryListComponent } from './category-list/category-list.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    CategoryListComponent,
    FooterComponent,
    
    RouterLink,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {

}
