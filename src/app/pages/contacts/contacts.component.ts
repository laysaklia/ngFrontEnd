import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contacts } from './contacts.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent {

  contactForm!: FormGroup;
  contact!: Contacts;
  success: boolean = false;
  firstName: String = "Visitante";

  validationMessages: any = {
    nome: {
      required: 'O nome é obrigatório.'
    },
    email: {
      required: 'O email é obrigatório.',
      email: 'Digite um email válido.'
    },
    assunto: {
      required: 'O assunto é obrigatório.'
    },
    mensagem: {
      required: 'A mensagem é obrigatória.'
    }
  }

  formErrors: any = {
    name: '',
    email: '',
    subject: '',
    message: ''
  }

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {
  }

  ngOnInit(): void {
    this.createForm();
    this.success = false;

    this.contactForm.valueChanges.subscribe(() => {
      this.updateValidationMessages();
    });
  }

  createForm() {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  updateValidationMessages() {
    for (const field in this.formErrors) {
      if (Object.prototype.hasOwnProperty.call(this.formErrors, field)) {

        this.formErrors[field] = '';

        const control = this.contactForm.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (Object.prototype.hasOwnProperty.call(control.errors, key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  sendContact() {

    if (this.contactForm.invalid) {
      return;
    }

    this.contact = this.contactForm.value;
    this.contact.date = new Date();
    this.contact.status = 'sended';

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    this.http.post(environment.apiURL + '/contacts', this.contact, httpOptions)
      .subscribe(
        (data) => {
          console.log(data);
          this.firstName = this.contact.name.split(' ')[0];
          this.success = true;
        },
        (error) => {
          alert('Oooops!\n' + error.message);
        }
      );

    this.contactForm.reset();

  }

  reset() {
    this.success = false;
    return false;
  }

} 