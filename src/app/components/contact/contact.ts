import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CONTACT_INFO } from '../../data/portfolio.data';
import { ContactService } from '../../services/contact.service';

type ToastType = 'success' | 'error' | null;

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  private readonly fb = inject(FormBuilder);
  private readonly contactService = inject(ContactService);

  protected readonly contactInfo = CONTACT_INFO;
  protected readonly toastType = signal<ToastType>(null);
  protected readonly toastMessage = signal('');
  protected readonly submitting = signal(false);

  protected readonly form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', Validators.required],
    message: ['', Validators.required],
  });

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting.set(true);

    try {
      await this.contactService.sendMessage(this.form.getRawValue());
      this.showToast('success', '🚀 ¡Mensaje recibido! Nelson te responderá a la brevedad.');
      this.form.reset();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'No se pudo enviar el mensaje. Intentá nuevamente.';
      this.showToast('error', message);
    } finally {
      this.submitting.set(false);
    }
  }

  private showToast(type: 'success' | 'error', message: string): void {
    this.toastType.set(type);
    this.toastMessage.set(message);
    setTimeout(() => this.toastType.set(null), 5000);
  }
}
