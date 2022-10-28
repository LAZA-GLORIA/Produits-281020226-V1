import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header-lateral',
  templateUrl: './header-lateral.component.html',
  styleUrls: ['./header-lateral.component.scss'],
})
export class HeaderLateralComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  public OnToggleMenuClose = () => {
    this.sidenavClose.emit();
  }
}
