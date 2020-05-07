import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.reducers';
import * as actions from '../../../store/actions/index';

import { Board } from '../../../models/configurin-device-data/board.model';
import { BoardService } from '../../../services/configuring-device-data/board.service';
import { SidebarCommand } from 'src/app/models/sidebarCommand/sidebarCommand.model';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styles: [
  ]
})
export class BoardComponent implements OnInit {
  parametersId: string[] = ['REFERENCE', 'CREATE', 'DELETE'];
  sidebarIdCommand: number[] = [70, 71, 72,73,74];
  idEditar:number;
  subscription: Subscription;
  editarBoolean: boolean = false;
  form: FormGroup;
  array: Board[] = [];
  object: Board;

  constructor(private fb: FormBuilder,
    private modalService: NgbModal,
    private boardService: BoardService,
    private store: Store<AppState>) { }

  ngOnInit(): void {
    let i =0;
    
    this.form = this.fb.group({
      parameterId: new FormControl(null),
      cn: [],
      srn: [],
      sn: [],
      bt: [],
      sbt: [],
      bbws: [],
      hce: [],
      cpriex: [],
      brdspec: [],
      ccne: []
    });
    this.form.controls['parameterId'].setValue('REFERENCE', { onlySelf: true });
     
    if(this.boardService.cargarLocationInformation()){
      this.boardService.cargarLocationInformation().map(({id, parameterId,
        cn,
        srn,
        sn,
        bt,
        sbt,
        bbws,
        hce,
        cpriex,
        brdspec,
        ccne})=>{
          this.array.push(new Board(
            id, parameterId,
            cn,
            srn,
            sn,
            bt,
            sbt,
            bbws,
            hce,
            cpriex,
            brdspec,
            ccne
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



    const {id, parameterId,
      cn,
      srn,
      sn,
      bt,
      sbt,
      bbws,
      hce,
      cpriex,
      brdspec,
      ccne} = this.form.value;


    if (!this.editarBoolean) {
      let index:number = 0;
      do {
        if(!this.array[index]){
          this.array.push(new Board(
            this.sidebarIdCommand[index],
            parameterId,
            cn,
            srn,
            sn,
            bt,
            sbt,
            bbws,
            hce,
            cpriex,
            brdspec,
            ccne
          ));
          break;
        }
        index++;
      } while (index <= this.array.length);
      

    } else {
      this.array.map((item)=>{
          if(item.id === this.idEditar) { 
            item.parameterId = parameterId;
            item.cn = cn;
            item.srn = srn;
            item.sn = sn;
            item.bt = bt;
            item.sbt = sbt;
            item.bbws = bbws;
            item.hce = hce;
            item.cpriex = cpriex;
            item.brdspec = brdspec;
            item.ccne = ccne;
          }
        });
       
      }
    
    this.boardService.guardarLocationInformation(this.array);
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

    this.boardService.guardarLocationInformation(this.array);


  }

  editar(_id: number) {
    this.idEditar = _id;
    const { parameterId,
      cn,
      srn,
      sn,
      bt,
      sbt,
      bbws,
      hce,
      cpriex,
      brdspec,
      ccne} =
      this.array.filter(
        obj => obj.id === _id
      )[0];

    this.form.reset({ parameterId,
      cn,
      srn,
      sn,
      bt,
      sbt,
      bbws,
      hce,
      cpriex,
      brdspec,
      ccne});


    //this.clearExample();
    //this.clearMmeIp();

    //example.forEach(valor => {this.examples.push(this.fb.control(valor,[ Validators.required]));})
    //mmeIp.forEach(valor => {this.mmeIps.push(this.fb.control(valor,[ Validators.pattern(this.ipPattern)]));})
    this.editarBoolean = true;
  }

  duplicar(_id: number) {
    if(this.array.length < 5){
      const { parameterId,
        cn,
        srn,
        sn,
        bt,
        sbt,
        bbws,
        hce,
        cpriex,
        brdspec,
        ccne} =
        this.array.filter(
          obj => obj.id === _id
        )[0];
        let index:number = 0;
        do {
          if(!this.array[index]){
            this.array.push(new Board(
              this.sidebarIdCommand[index],
              parameterId,
              cn,
              srn,
              sn,
              bt,
              sbt,
              bbws,
              hce,
              cpriex,
              brdspec,
              ccne
            ));
            break;
          }
          index++;
        } while (index <= this.array.length);
      this.boardService.guardarLocationInformation(this.array);
      for (const iterator of this.array) {
        this.store.dispatch(
          actions.editarSidebarCommand({
            sidebarCommand: new SidebarCommand(iterator.id,iterator.Command)
          }));
      }

    }
  }

}
