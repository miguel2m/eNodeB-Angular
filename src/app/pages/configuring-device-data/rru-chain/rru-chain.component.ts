import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.reducers';
import * as actions from '../../../store/actions/index';

import { RruChain } from '../../../models/configurin-device-data/rruChain.model';
import { RruChainService } from '../../../services/configuring-device-data/rru-chain.service';
import { SidebarCommand } from 'src/app/models/sidebarCommand/sidebarCommand.model';


@Component({
  selector: 'app-rru-chain',
  templateUrl: './rru-chain.component.html',
  styles: [
  ]
})
export class RruChainComponent implements OnInit {
  parametersId: string[] = ['REFERENCE', 'CREATE', 'DELETE'];
  sidebarIdCommand: number[] = [81, 82, 83];
  idEditar:number;
  editarBoolean: boolean = false;
  form: FormGroup;
  array: RruChain[] = [];
  object: RruChain;

  constructor(private fb: FormBuilder,
    private modalService: NgbModal,
    private rruChainService: RruChainService,
    private store: Store<AppState>) { }

  ngOnInit(): void {
    let i =0;
    
    this.form = this.fb.group({
      parameterId: new FormControl(null),
      rnc: [],
      tt: [],
      bm: [],
      at: [],
      hcn: [],
      hsrn: [],
      hsn: [],
      hpn: [],
      tcn: [],
      tsrn: [],
      tsn: [],
      tpn: [],
      cr: []
    });
    this.form.controls['parameterId'].setValue('REFERENCE', { onlySelf: true });
     
    if(this.rruChainService.cargarLocationInformation()){
      this.rruChainService.cargarLocationInformation().map(({id, parameterId,
        rnc,
        tt,
        bm,
        at,
        hcn,
        hsrn,
        hsn,
        hpn,
        tcn,
        tsrn,
        tsn,
        tpn,
        cr
      })=>{
          this.array.push(new RruChain(
            id, parameterId,
            rnc,
            tt,
            bm,
            at,
            hcn,
            hsrn,
            hsn,
            hpn,
            tcn,
            tsrn,
            tsn,
            tpn,
            cr
          ));
      });
       this.array.map( (iterator)=>{
         
        this.store.dispatch(
          actions.editarSidebarCommand({
            sidebarCommand: new SidebarCommand(iterator.id,iterator.Command)
          }));
      })
    }
  }

  
  openScrollableContent(longContent) {
    this.modalService.open(longContent, { scrollable: true });
  }

  guardar() {
      console.log(this.form.value);
    const {id, parameterId,
      rnc,
      tt,
      bm,
      at,
      hcn,
      hsrn,
      hsn,
      hpn,
      tcn,
      tsrn,
      tsn,
      tpn,
      cr} = this.form.value;


    if (!this.editarBoolean) {
      let index:number = 0;
      do {
        if(!this.array[index]){
          this.array.push(new RruChain(
            this.sidebarIdCommand[index],
            parameterId,
            rnc,
            tt,
            bm,
            at,
            hcn,
            hsrn,
            hsn,
            hpn,
            tcn,
            tsrn,
            tsn,
            tpn,
            cr
          ));
          break;
        }
        index++;
      } while (index <= this.array.length);
      

    } else {
      this.array.map((item)=>{
          if(item.id === this.idEditar) { 
            item.parameterId = parameterId;
            item.rnc = rnc;
            item.tt = tt;
            item.bm = bm;
            item.at = at;
            item.hcn = hcn;
            item.hsrn = hsrn;
            item.hsn = hsn;
            item.hpn = hpn;
            item.tcn = tcn;
            item.tsrn = tsrn;
            item.tsn = tsn;
            item.tpn = tpn;
            item.cr = cr;
          }
        });
       
      }
    
    this.rruChainService.guardarLocationInformation(this.array);
    for (const iterator of this.array) {
      
      this.store.dispatch(
        actions.editarSidebarCommand({
          sidebarCommand: new SidebarCommand(iterator.id,iterator.Command)
        }));
    }
    this.form.reset();
    this.editarBoolean = false;


  }
  
  borrar(id: number) {
    for (const item of this.array) {
      this.store.dispatch(
        actions.editarSidebarCommand({
          sidebarCommand: new SidebarCommand(item.id,'//')
        }));
    }
    
    this.array= 
    this.array
      .filter((item)=> item.id !== id );
    let index = 0;
    for (const item of this.array) {
      item.id = this.sidebarIdCommand[index++];
      this.store.dispatch(
        actions.editarSidebarCommand({
          sidebarCommand: new SidebarCommand(item.id,item.Command)
        }))
      
    }

    this.rruChainService.guardarLocationInformation(this.array);


  }

  editar(_id: number) {
    this.idEditar = _id;
    const { parameterId,
      rnc,
      tt,
      bm,
      at,
      hcn,
      hsrn,
      hsn,
      hpn,
      tcn,
      tsrn,
      tsn,
      tpn,
      cr} =
      this.array.filter(
        obj => obj.id === _id
      )[0];

    this.form.reset({ parameterId,
      rnc,
      tt,
      bm,
      at,
      hcn,
      hsrn,
      hsn,
      hpn,
      tcn,
      tsrn,
      tsn,
      tpn,
      cr});


    //this.clearExample();
    //this.clearMmeIp();

    //example.forEach(valor => {this.examples.push(this.fb.control(valor,[ Validators.required]));})
    //mmeIp.forEach(valor => {this.mmeIps.push(this.fb.control(valor,[ Validators.pattern(this.ipPattern)]));})
    this.editarBoolean = true;
  }

  duplicar(_id: number) {
    if(this.array.length < 3){
      const { parameterId,
        rnc,
        tt,
        bm,
        at,
        hcn,
        hsrn,
        hsn,
        hpn,
        tcn,
        tsrn,
        tsn,
        tpn,
        cr} =
        this.array.filter(
          obj => obj.id === _id
        )[0];
        let index:number = 0;
        do {
          if(!this.array[index]){
            this.array.push(new RruChain(
              this.sidebarIdCommand[index],
              parameterId,
              rnc,
              tt,
              bm,
              at,
              hcn,
              hsrn,
              hsn,
              hpn,
              tcn,
              tsrn,
              tsn,
              tpn,
              cr
            ));
            break;
          }
          index++;
        } while (index <= this.array.length);
      this.rruChainService.guardarLocationInformation(this.array);
      for (const iterator of this.array) {
        this.store.dispatch(
          actions.editarSidebarCommand({
            sidebarCommand: new SidebarCommand(iterator.id,iterator.Command)
          }));
      }

    }
  }

}
