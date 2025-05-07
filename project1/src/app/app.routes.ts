import { Routes } from '@angular/router';
import { HomepageComponent } from '../component/homepage/homepage.component';
import { ServicesComponent } from '../component/services/services.component'; 
import { AboutUsComponent } from '../component/about-us/about-us.component';
import { LoginComponent } from '../component/login/login.component';
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },


  {
    path: 'home',
    component: HomepageComponent
  },
  {

   path: 'services', component: ServicesComponent

  },
  {
    path: 'about-us', component: AboutUsComponent
  },
  {
    path: 'login', component: LoginComponent
  }

];
