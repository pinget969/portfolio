import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';
import { environment } from '../../environments/environment';

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class ContactService {
  sendMessage(data: ContactFormData): Promise<void> {
    const { serviceId, templateId, publicKey } = environment.emailjs;

    if (
      serviceId === 'YOUR_SERVICE_ID' ||
      templateId === 'YOUR_TEMPLATE_ID' ||
      publicKey === 'YOUR_PUBLIC_KEY'
    ) {
      return Promise.reject(
        new Error('Configurá tus credenciales de EmailJS en src/environments/environment.ts'),
      );
    }

    return emailjs.send(serviceId, templateId, {
      from_name: data.name,
      from_email: data.email,
      subject: data.subject,
      message: data.message,
    }).then(() => undefined);
  }
}
