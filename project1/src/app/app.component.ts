import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomepageComponent } from '../component/homepage/homepage.component';
import { HeaderComponent } from '../component/header/header.component';
import { ServicesComponent } from '../component/services/services.component';
import { FooterComponent } from '../component/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
    HomepageComponent,HeaderComponent,ServicesComponent,FooterComponent
    
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'project1';
}

