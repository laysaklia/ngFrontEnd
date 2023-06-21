import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Thing } from 'src/app/models/thing.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  things: any;

  httpOptions: any = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'observe': 'response'
    })
  };

  constructor(private http: HttpClient) {
      this.getAll();
  }

  getAll() {
    this.http.get(environment.apiURL + '/things?status_ne=del&_sort=date&_order=desc', this.httpOptions)
    .subscribe((data) => {
      this.things = data;
    });
  }

}
