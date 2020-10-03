import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

import { AlertController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit {

  @Input() pageName: string;

  constructor(public alertController: AlertController, private authService: AuthService, private menu: MenuController) { }

  ngOnInit(): void {
  }

  onToogleMenu() {
    this.menu.toggle();
  }

  onLogout() {
    this.authService.logout();
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'alert',
      header: 'Logout Confirmation',
      message: 'Are you sure you want to logout ? ',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        }, {
          text: 'Yes',
          handler: () => {
            this.onLogout();
          }
        }
      ]
    });

    await alert.present();
  }

}
