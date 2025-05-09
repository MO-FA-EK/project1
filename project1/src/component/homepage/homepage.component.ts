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
export class HomepageComponent 
{
  members = [
    {
      Text: 'Game development ',
      paragraph: `We will bring your game ideas to life with creative design, immersive gameplay, and efficient 
  coding. Whether it’s a simple 2D mobile game or a more advanced concept, We focus on performance, fun, and 
  visual appeal to deliver engaging gaming experiences.`,
      
      image: '../../assets/img/1000_F_597319490_GNglrmOrTZcxBmYNpNCgBJQlM7PHPyNx.jpg',
    
    },
    {
      Text: 'Web Development',
      paragraph: `We will create fast, responsive, and modern websites that look great 
      and function flawlessly on all devices. From personal portfolios to business websites 
      and e-commerce platforms, We build custom web solutions that are optimized for performance, 
      SEO, and user experience.`,
      image: '../../assets/img/Web-Development-1024x747.png',
    },
    

    {
      Text: '  Application development',
      paragraph: `Need a mobile app? We will design and develop powerful applications for both Android and iOS, 
  tailored specifically to your business goals or personal ideas. Whether it’s a simple utility or a complex system, 
  We ensure smooth functionality, attractive design, and user-friendly interfaces.`,
      
      
      image: '../../assets/img/WhatsApp Image 2025-05-06 at 13.16.01_76bc54bb.jpg',
    
    },
    {
      Text: 'Graphic design ',
      paragraph: `We offer professional graphic design services including logo creation, branding, UI/UX design, and 
  visual content for web and print. My designs are crafted to reflect your brand identity and leave a lasting 
  impression on your audience.`,
    
      image: '../../assets/img/graphic-design.jpg',
    
    },



  ];

}
