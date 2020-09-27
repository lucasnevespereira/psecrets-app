import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private menu: MenuController, private authService: AuthService) {
    console.log(`User: ${this.authService.getUserId()}`);
    
  }

  ngOnInit() {
    this.menu.close();
  }

}
