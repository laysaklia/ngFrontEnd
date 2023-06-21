import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { E404Component } from './pages/e404/e404.component';
import { HomeComponent } from './pages/home/home.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';

import { AuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { NewComponent } from './pages/new/new.component';
import { ViewComponent } from './pages/view/view.component';

const toLogin = () => redirectUnauthorizedTo(['/user/login']);
const toHome = () => redirectLoggedInTo(['/admin/home']);

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', title: 'Página inicial', component: HomeComponent },
  {
    path: 'new',
    title: 'Novo treco',
    component: NewComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: toLogin }
  },
  {
    path: 'view/:id',
    title: 'Ver treco',
    component: ViewComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: toLogin }
  },
  { path: 'contacts', title: 'Faça Contato', component: ContactsComponent },
  {
    path: 'login',
    title: 'Faça login',
    component: LoginComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: toHome }
  },
  {
    path: 'profile',
    title: 'Perfil de usuário',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: toLogin }
  },
  { path: '**', redirectTo: 'e404', pathMatch: 'full' },
  { path: 'e404', title: 'Erro 404', component: E404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
