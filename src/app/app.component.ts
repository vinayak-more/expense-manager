import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DatabaseService } from './service/database.service';
import { FooterComponent } from './footer/footer.component';
import { NotificationService } from './service/notificationService';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private database: DatabaseService, private notification: NotificationService){
    this.init();
  }

  async init(){
    this.database.initializePlugin();
    this.notification.init();
  }
}
