import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {

  thing!: any;
  private routeSub!: Subscription;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(
      (params) => {
        this.getOne(params['id']);
      }
    )
  }

  httpOptions: any = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'observe': 'response'
    })
  };

  getOne(id: string) {
    this.http.get(environment.apiURL + '/things/' + id + '?status_ne=del', this.httpOptions)
      .subscribe((data) => {
        this.thing = data;
        this.titleService.setTitle('Detalhes de ' + this.thing.name);
        switch (this.thing.status) {
          case 'on':
            this.thing.valueStatus = `ativo`;
            this.thing.notValueStatus = 'desativar';
            break;
          case 'off':
            this.thing.valueStatus = `inativo`;
            this.thing.notValueStatus = 'ativar';
            break;
        }
      });
  }

}
