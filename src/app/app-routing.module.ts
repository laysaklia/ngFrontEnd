import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { E404Component } from './pages/e404/e404.component';
import { HomeComponent } from './pages/home/home.component';
import { ContactsComponent } from './pages/contacts/contacts.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', title: 'Página inicial', component: HomeComponent },
  { path: 'contacts', title: 'Faça Contato', component: ContactsComponent },
  { path: '**', redirectTo: 'e404', pathMatch: 'full' },
  { path: 'e404', title: 'Erro 404', component: E404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
