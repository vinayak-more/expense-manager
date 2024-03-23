import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DatabaseService } from './service/database.service';
import { FooterComponent } from './footer/footer.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private database: DatabaseService){
    this.init();
  }

  async init(){
    this.database.initializePlugin();
  }
}
