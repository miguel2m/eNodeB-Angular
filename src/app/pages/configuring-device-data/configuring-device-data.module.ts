import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../../app-routing.module';

//Reactive Form
import { ReactiveFormsModule } from '@angular/forms';
//MODAL
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import { ConfiguringDeviceDataComponent } from './configuring-device-data.component';
import { CabinetComponent } from './cabinet/cabinet.component';
import { SubrackComponent } from './subrack/subrack.component';
import { BoardComponent } from './board/board.component';
import { RruChainComponent } from './rru-chain/rru-chain.component';
import { RruComponent } from './rru/rru.component';
import { TimeDataTzComponent } from './time-data-tz/time-data-tz.component';
import { TimeDataSourceComponent } from './time-data-source/time-data-source.component';
import { TimeDataNtpcComponent } from './time-data-ntpc/time-data-ntpc.component';
import { TimeDataMasterNtpcComponent } from './time-data-master-ntpc/time-data-master-ntpc.component';



@NgModule({
  declarations: [
    ConfiguringDeviceDataComponent,
    CabinetComponent,
    SubrackComponent,
    BoardComponent,
    RruChainComponent,
    RruComponent,
    TimeDataTzComponent,
    TimeDataSourceComponent,
    TimeDataNtpcComponent,
    TimeDataMasterNtpcComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  exports:[
    ConfiguringDeviceDataComponent
  ]
})
export class ConfiguringDeviceDataModule { }
