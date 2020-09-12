import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit {

  @Input() pageName: string;

  constructor(private authService: AuthService, private menu: MenuController) { }

  ngOnInit(): void {
  }

  onToogleMenu() {
    this.menu.toggle();
  }

  onLogout() {
    this.authService.logout();
  }

}
