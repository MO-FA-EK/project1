import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-services',
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent {
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
