import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isMobile : boolean;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  constructor(public alertController: AlertController ,private breakpointObserver: BreakpointObserver, private authService: AuthService) { }

  ngOnInit(): void {
    this.getIsMobile()
  }

  getIsMobile() {
    this.isHandset$.subscribe(isMobile => {
      this.isMobile = isMobile;
      return isMobile;
    })
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
