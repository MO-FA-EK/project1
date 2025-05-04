import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-services',
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent {
  services = [
    {
      title: 'Web Development',
      freelancers: [
        { name: 'Kareem', role: 'Frontend Developer', image: 'assets/kareem.jpg' },
        { name: 'Ali', role: 'Backend Developer', image: 'assets/ali.jpg' }
      ]
    },
    {
      title: 'Graphic Design',
      freelancers: [
        { name: 'Fatima', role: 'Logo Designer', image: 'assets/fatima.jpg' },
        { name: 'Hassan', role: 'UI/UX Expert', image: 'assets/hassan.jpg' },
        { name: 'Sara', role: 'Illustrator', image: 'assets/sara.jpg' },
        { name: 'Omar', role: '3D Artist', image: 'assets/omar.jpg',linkedIn: 'https://www.linkedin.com/in/omar/' }
      ]
    }
    
  ];
  

}
