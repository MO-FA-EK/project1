import { Routes } from '@angular/router';
import { HomepageComponent } from '../component/homepage/homepage.component';
import { ServicesComponent } from '../component/services/services.component'; 
import { LoginComponent } from '../component/login/login.component';
import { ContactComponent } from '../component/contact/contact.component';
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
    path: 'login', component: LoginComponent
  },
  {
    path: 'contact', component: ContactComponent
  }

];
