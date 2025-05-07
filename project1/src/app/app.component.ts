import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomepageComponent } from '../component/homepage/homepage.component';
import { HeaderComponent } from '../component/header/header.component';
import { ServicesComponent } from '../component/services/services.component';
import { FooterComponent } from '../component/footer/footer.component';
import { AboutUsComponent } from '../component/about-us/about-us.component';
import { LoginComponent } from '../component/login/login.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
    HomepageComponent,HeaderComponent,ServicesComponent,FooterComponent,AboutUsComponent,LoginComponent
    
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'project1';
}

