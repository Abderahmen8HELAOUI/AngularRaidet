import { Component } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';
import {AuthService} from "./_services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  selectedCountry = 0;
  selectedState = 0;

  state = [] as any;
  city:any=[];

  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  regionalCommissary?: string;
  title = 'Angular Material 12 Image Upload with Preview';

  constructor(private tokenStorageService: TokenStorageService,
             private authService:AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;
      this.regionalCommissary = user.regionalCommissary;
    }
    this.state = this.authService.state();
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  onSelect(state: any){
    this.city = this.authService.city()
      .filter(e=>
        e.stateName == state.target.value);
  }

}
