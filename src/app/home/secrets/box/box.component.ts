import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SecretsService } from '../../secrets.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.scss']
})
export class BoxComponent implements OnInit {

  secretForm: FormGroup;

  constructor(private secretService: SecretsService, private router: Router) {
    this.secretForm = new FormGroup({
      content: new FormControl('', [
        Validators.required
      ])
    });
  }

  ngOnInit() {
  }

  onShare() {
    const {content} = this.secretForm.value;
    console.log(content);
    this.secretService.createSecret(content);
    this.secretForm.reset();
    window.location.reload();
  }

}
