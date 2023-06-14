import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Contacts } from './contacts.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent {

  formContacts!: FormGroup;
  contact!: Contacts;
  success: boolean = false;
  firstName: String = "";

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formContacts = this.formBuilder.group({
      name: ["Joca da Silva"],
      email: ["joca@silva.com"],
      subject: ["Assunto do Joca"],
      message: ["Mensagem do Joca"]
    });
  }

  sendContact() {

    this.contact = this.formContacts.value;
    this.contact.date = new Date();
    this.contact.status = 'sended';

    console.log(this.contact);

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

    this.formContacts.reset();

  }

} 