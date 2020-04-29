import { Component, OnInit, OnDestroy } from '@angular/core';
import { Dchpsw } from '../models/removeDefaultConfigData/dhcpsw.model';
import { DhcpswService } from '../services/removeDefaultConfigData/dhcpsw.service';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducers';

import * as actions  from '../store/actions/index'
import { SidebarCommand } from '../models/sidebarCommand/sidebarCommand.model';
import { SidebarCommandService } from '../services/sidebarCommand/sidebar-command.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit, OnDestroy {
  
  sidebarCommands:SidebarCommand[]=[];

  constructor(private sidebarCommandService: SidebarCommandService,
              private store: Store<AppState>) { }

  ngOnInit(): void {
    this.sidebarCommands = this.sidebarCommandService.cargarSidebarCommand();
       
    if (this.sidebarCommands)
    this.store.dispatch(
      actions.cargarSidebarCommand({
        sidebarCommand: this.sidebarCommands
    }));
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    
  }

}
