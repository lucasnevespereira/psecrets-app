import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  @Input() type: 'password' | 'email' = 'email';
  @Input() placeholder = '';

  constructor() { }

  ngOnInit(): void {
  }

}
