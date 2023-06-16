import { Component, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Auth, User, authState } from '@angular/fire/auth';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css']
})
export class ThemeComponent {

  siteName: String = environment.siteName;

  auth: Auth = inject(Auth);
  authState$ = authState(this.auth);
  authStateSubscription = new Subscription;
  user: any;

  async ngOnInit() {
    this.authStateSubscription = this.authState$.subscribe(
      (userData: User | null) => {
        if (userData) this.user = userData
      }
    )
  }

  ngOnDestroy() {
    this.authStateSubscription.unsubscribe();
  }

}
