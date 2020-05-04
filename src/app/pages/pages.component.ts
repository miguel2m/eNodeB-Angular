import { Component, OnInit } from '@angular/core';
import { ConfigDataService } from '../services/initiallyConfig/config-data.service';
import { ConfigData } from '../models/initiallyConfig/config-data.model';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducers';
import * as  configDataActions from '../store/actions/index';


@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {
  configDataObject: ConfigData;
  

  constructor(private configDataService: ConfigDataService,
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.configDataObject = this.configDataService.cargarConfigData();
    if (this.configDataObject)
      this.store.dispatch(
        configDataActions.crearConfigData({
          configData: this.configDataObject
        }));
    
  }


}
