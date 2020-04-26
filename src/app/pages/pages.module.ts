import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
//Reactive Form
import { ReactiveFormsModule } from '@angular/forms';
//MODAL
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { InitConfigComponent } from './initiallyConfig/init-config.component';
import { ConfigDataComponent } from './initiallyConfig/config-data/config-data.component';
import { IpNodebRelatedComponent } from './initiallyConfig/ip-nodeb-related/ip-nodeb-related.component';
import { RadioParametersComponent } from './initiallyConfig/radio-parameters/radio-parameters.component';
import { PagesComponent } from './pages.component';
import { DhcpswComponent } from './removeDefaultConfigData/dhcpsw.component';



@NgModule({
  declarations: [ 
    InitConfigComponent, 
    ConfigDataComponent, 
    IpNodebRelatedComponent, 
    RadioParametersComponent, 
    PagesComponent,
    DhcpswComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule
  ],
  exports:[
    PagesComponent,
    InitConfigComponent,
    DhcpswComponent
  ]
})
export class PagesModule { }
