import { Component, OnInit, OnDestroy } from '@angular/core';
import { Clipboard } from "@angular/cdk/clipboard"
import Swal from 'sweetalert2'


import { AppState } from '../../store/app.reducers';
import { Store } from '@ngrx/store';



import { SidebarCommand } from '../../models/sidebarCommand/sidebarCommand.model';
import { Subscription } from 'rxjs';
import { SidebarCommandService } from '../../services/sidebarCommand/sidebar-command.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {
  sidebarCommandsSubscription: Subscription;

  
  items: SidebarCommand[] =[];

  constructor(private clipboard: Clipboard,
              private sidebarCommandService:SidebarCommandService,
              private store: Store<AppState>) { }

  ngOnInit(): void {
    
    this.sidebarCommandsSubscription =this.store.select('sidebarCommand').subscribe(obj => {
      
      this.items = obj as SidebarCommand[];
      
    });
    
  }
  
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.sidebarCommandsSubscription?.unsubscribe;
    
  }


  copyToClipboard() {
    
    this.clipboard.copy(
      this.items.map(({ command }) => `${command}\n`).join('').toString()
    );
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Texto Copiado',
      showConfirmButton: false,
      timer: 1500
    });
    
    
  }

  

}
