import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  services: { title: string, freelancers: any[] }[] = [];

  showContactModal = false;
  selectedFreelancer: any = null;
  selectedCategory: string = '';
  contactForm = {
    name: '',
    description: '',
    budget: '',
    phone: ''
  };

  constructor(private http: HttpClient) {}

  openContactModal(category: string, freelancer: any) {
    this.selectedFreelancer = freelancer;
    this.selectedCategory = category;
    this.showContactModal = true;
    this.contactForm = { name: '', description: '', budget: '', phone: '' };
  }

  closeContactModal() {
    this.showContactModal = false;
    this.selectedFreelancer = null;
    this.selectedCategory = '';
  }

  submitContactForm() {
    if (!this.selectedFreelancer) return;
    const payload = {
      developer_id: this.selectedFreelancer.id,
      name: this.contactForm.name,
      description: this.contactForm.description,
      budget: this.contactForm.budget,
      phone: this.contactForm.phone
    };
    this.http.post('http://localhost:3000/contact', payload).subscribe({
      next: (res) => {
        alert('Your request has been sent!');
        this.closeContactModal();
      },
      error: (err) => {
        alert('Failed to send request.');
        console.error(err);
      }
    });
  }

  ngOnInit() {
    this.http.get<any[]>('http://localhost:3000/developers')
      .subscribe({
        next: (data) => {
          console.log('Received data from backend:', data);
          const grouped = new Map<string, any[]>();

          data.forEach(dev => {
            if (!grouped.has(dev.category)) {
              grouped.set(dev.category, []);
            }
            grouped.get(dev.category)?.push({
              username: dev.username,
              portfio: dev.portfio,
              description: dev.description,
              id: dev.id
            });
          });

          this.services = Array.from(grouped, ([title, freelancers]) => ({ title, freelancers }));
          console.log('Processed services:', this.services);
        },
        error: (error) => {
          console.error('Error fetching data:', error);
        }
      });
  }
}
