import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

import {SecretsService} from '../secrets.service'
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-secrets',
  templateUrl: './secrets.component.html',
  styleUrls: ['./secrets.component.scss']
})
export class SecretsComponent implements OnInit {

  constructor() { 
  }

  ngOnInit() {
  }


}
