import { Component } from '@angular/core';
import { HeaderComponent } from '../transactions/header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CategoryStatsComponent } from './category-stats/category-stats.component';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    CategoryStatsComponent,
  ],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.scss'
})
export class StatsComponent {

}
