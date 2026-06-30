import { Component } from '@angular/core';
import { CONTACT_INFO } from '../../data/portfolio.data';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  protected readonly contactInfo = CONTACT_INFO;
}
