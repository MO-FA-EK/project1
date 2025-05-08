import { Routes } from '@angular/router';
import { HomepageComponent } from '../component/homepage/homepage.component';
import { ServicesComponent } from '../component/services/services.component'; 
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

  }
];
