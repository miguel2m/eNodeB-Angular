import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from '../../app-routing.module';

//Reactive Form
import { ReactiveFormsModule } from '@angular/forms';
//MODAL
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { ConfigBasicDataComponent } from './config-basic-data.component';
import { NeConfigAttributesComponent } from './ne-config-attributes/ne-config-attributes.component';
import { SetNodeConfigComponent } from './set-node-config/set-node-config.component';
import { LocationInformationComponent } from './location-information/location-information.component';
import { EnodebFunctionComponent } from './enodeb-function/enodeb-function.component';
import { NeMaintenanceModeComponent } from './ne-maintenance-mode/ne-maintenance-mode.component';
import { OperatorCnComponent } from './operator-cn/operator-cn.component';
import { OperatorTrackingAreaComponent } from './operator-tracking-area/operator-tracking-area.component';




@NgModule({
  declarations: [ConfigBasicDataComponent,
    NeConfigAttributesComponent,
    SetNodeConfigComponent,
    LocationInformationComponent,
    EnodebFunctionComponent,
    NeMaintenanceModeComponent,
    OperatorCnComponent,
    OperatorTrackingAreaComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  exports:[
    ConfigBasicDataComponent
  ]
})
export class ConfigurinBasicDataModule { }
