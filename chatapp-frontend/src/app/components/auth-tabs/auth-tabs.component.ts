import { Component, OnInit } from '@angular/core';
import { Tabs } from 'materialize-css';

@Component({
  selector: 'app-auth-tabs',
  templateUrl: './auth-tabs.component.html',
  styleUrls: ['./auth-tabs.component.scss']
})
export class AuthTabsComponent implements OnInit {

  constructor() { }

  public ngOnInit(): void {

    const tabs = document.querySelector('.tabs');
    Tabs.init(tabs, {});
  }

}
