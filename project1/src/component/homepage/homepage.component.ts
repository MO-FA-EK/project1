import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-homepage',
  standalone: true, 
  imports:[CommonModule,RouterLink],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'] 
})
export class HomepageComponent {
  members = [
    {
      Text: ' ',
      title: 'مطور واجهات أمامية',
      image: '../../assets/img/1000_F_597319490_GNglrmOrTZcxBmYNpNCgBJQlM7PHPyNx.jpg',
    
    },
    {
      Text: ' ',
      title: 'مصممة UI/UX',
      image: '../../assets/img/360_F_214879686_R3HFJlk6WLr1kcdvy6Q9rtNASKN0BZBS.jpg',
    
    },

    {
      Text: ' ',
      title: 'مطور واجهات أمامية',
      
      image: '../../assets/img/Web-Development-1024x747.png',
    
    },
    {
      Text: ' ',
      title: 'مصممة UI/UX',
      image: '../../assets/img/360_F_214879686_R3HFJlk6WLr1kcdvy6Q9rtNASKN0BZBS.jpg',
    
    },



    // أضف أعضاء آخرين حسب الحاجة
  ];

}
