import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from './store/app.reducers';
import * as actions  from './store/actions/index'

import { SidebarCommandService } from './services/sidebarCommand/sidebar-command.service';
import { SidebarCommand } from './models/sidebarCommand/sidebarCommand.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  sidebarCommands:SidebarCommand[]=[];
  constructor(
              private sidebarCommandService: SidebarCommandService,
              private store: Store<AppState>
  ){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.sidebarCommands = this.sidebarCommandService.cargarSidebarCommand();
       
    if (this.sidebarCommands)
    this.store.dispatch(
      actions.cargarSidebarCommand({
        sidebarCommand: this.sidebarCommands
    }));
  }
}
