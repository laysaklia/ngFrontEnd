import { Component, inject } from '@angular/core';
import { Auth, User, authState } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  auth: Auth = inject(Auth);
  authState$ = authState(this.auth);
  authStateSubscription = new Subscription;
  user: any;

  constructor(public router: Router) { }

  async ngOnInit() {
    this.authStateSubscription = this.authState$.subscribe(
      (userData: User | null) => {
        if (userData) this.user = userData
        console.log(this.user)
      }
    )
  }

  ngOnDestroy() {
    this.authStateSubscription.unsubscribe();
  }

  logout() {
    this.auth.signOut();
    alert('Você saiu do aplicativo.');
    this.router.navigate(['/home']);
  }

  toProfile() {
    window.open('https://myaccount.google.com/', '_blank')
  }

}
