import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.reducers';
import * as actions from '../../../store/actions/index';

import { Rru } from '../../../models/configurin-device-data/rru.model';
import { RruService } from '../../../services/configuring-device-data/rru.service';
import { SidebarCommand } from 'src/app/models/sidebarCommand/sidebarCommand.model';

@Component({
  selector: 'app-rru',
  templateUrl: './rru.component.html',
  styles: [
  ]
})
export class RruComponent implements OnInit {
  parametersId: string[] = ['REFERENCE', 'CREATE', 'DELETE'];
  sidebarIdCommand: number[] = [87, 88, 89];
  idEditar: number;
  editarBoolean: boolean = false;
  form: FormGroup;
  array: Rru[] = [];
  object: Rru;
  constructor(private fb: FormBuilder,
    private modalService: NgbModal,
    private rruService: RruService,
    private store: Store<AppState>) { }

  ngOnInit(): void {
    let i = 0;

    this.form = this.fb.group({
      parameterId: new FormControl(null),
      cn             : [],         
      srn            : [],          
      sn             : [],           
      tp             : [],
      rnc            : [],
      ps             : [],
      rt             : [], 
      rs             : [],
      rn             : [],
      rxnum          : [],
      txnum          : [],
      almprocsw      : [],
      almprocthrhld  : [],
      almthrhld      : [],
      ifoffset       : [], 
      rfds           : [],
      lcpsw          : [],
      flag           : [],
      ruspec         : [],
      paeffswitch    : [],
    });
    this.form.controls['parameterId'].setValue('REFERENCE', { onlySelf: true });

    if (this.rruService.cargar()) {
      this.rruService.cargar().map(({ id, parameterId,
        cn,
        srn,
        sn,
        tp,
        rnc,
        ps,
        rt,
        rs,
        rn,
        rxnum,
        txnum,
        almprocsw,
        almprocthrhld,
        almthrhld,
        ifoffset,
        rfds,
        lcpsw,
        flag,
        ruspec,
        paeffswitch
      }) => {
        this.array.push(new Rru(
          id, parameterId,
          cn,
          srn,
          sn,
          tp,
          rnc,
          ps,
          rt,
          rs,
          rn,
          rxnum,
          txnum,
          almprocsw,
          almprocthrhld,
          almthrhld,
          ifoffset,
          rfds,
          lcpsw,
          flag,
          ruspec,
          paeffswitch
        ));
      });
      this.array.map((iterator) => {

        this.store.dispatch(
          actions.editarSidebarCommand({
            sidebarCommand: new SidebarCommand(iterator.id, iterator.Command)
          }));
      })
    }
  }

  openScrollableContent(longContent) {
    this.modalService.open(longContent, { scrollable: true });
  }

  guardar() {
    console.log(this.form.value);
    const { id, parameterId,
      cn,
      srn,
      sn,
      tp,
      rnc,
      ps,
      rt,
      rs,
      rn,
      rxnum,
      txnum,
      almprocsw,
      almprocthrhld,
      almthrhld,
      ifoffset,
      rfds,
      lcpsw,
      flag,
      ruspec,
      paeffswitch } = this.form.value;


    if (!this.editarBoolean) {
      let index: number = 0;
      do {
        if (!this.array[index]) {
          this.array.push(new Rru(
            this.sidebarIdCommand[index],
            parameterId,
            cn,
            srn,
            sn,
            tp,
            rnc,
            ps,
            rt,
            rs,
            rn,
            rxnum,
            txnum,
            almprocsw,
            almprocthrhld,
            almthrhld,
            ifoffset,
            rfds,
            lcpsw,
            flag,
            ruspec,
            paeffswitch
          ));
          break;
        }
        index++;
      } while (index <= this.array.length);


    } else {
      this.array.map((item) => {
        if (item.id === this.idEditar) {
          item.parameterId = parameterId;

          item.cn                 = cn;
          item.srn                = srn;
          item.sn                 = sn;
          item.tp                 = tp;
          item.rnc                = rnc;
          item.ps                 = ps;
          item.rt                 = rt;
          item.rs                 = rs;
          item.rn                 = rn;
          item.rxnum              = rxnum;
          item.txnum              = txnum;
          item.almprocsw          = almprocsw;
          item.almprocthrhld      = almprocthrhld;
          item.almthrhld          = almthrhld;
          item.ifoffset           = ifoffset;
          item.rfds               = rfds;
          item.lcpsw              = lcpsw;
          item.flag               = flag;
          item.ruspec             = ruspec;
          item.paeffswitch        = paeffswitch;
        }
      });

    }

    this.rruService.guardar(this.array);
    for (const iterator of this.array) {

      this.store.dispatch(
        actions.editarSidebarCommand({
          sidebarCommand: new SidebarCommand(iterator.id, iterator.Command)
        }));
    }
    this.form.reset();
    this.editarBoolean = false;


  }

  borrar(id: number) {
    for (const item of this.array) {
      this.store.dispatch(
        actions.editarSidebarCommand({
          sidebarCommand: new SidebarCommand(item.id, '//')
        }));
    }

    this.array =
      this.array
        .filter((item) => item.id !== id);
    let index = 0;
    for (const item of this.array) {
      item.id = this.sidebarIdCommand[index++];
      this.store.dispatch(
        actions.editarSidebarCommand({
          sidebarCommand: new SidebarCommand(item.id, item.Command)
        }))

    }

    this.rruService.guardar(this.array);


  }

  editar(_id: number) {
    this.idEditar = _id;
    const { parameterId,
      cn,
            srn,
            sn,
            tp,
            rnc,
            ps,
            rt,
            rs,
            rn,
            rxnum,
            txnum,
            almprocsw,
            almprocthrhld,
            almthrhld,
            ifoffset,
            rfds,
            lcpsw,
            flag,
            ruspec,
            paeffswitch } =
      this.array.filter(
        obj => obj.id === _id
      )[0];

    this.form.reset({
      parameterId,
      cn,
            srn,
            sn,
            tp,
            rnc,
            ps,
            rt,
            rs,
            rn,
            rxnum,
            txnum,
            almprocsw,
            almprocthrhld,
            almthrhld,
            ifoffset,
            rfds,
            lcpsw,
            flag,
            ruspec,
            paeffswitch
    });


    //this.clearExample();
    //this.clearMmeIp();

    //example.forEach(valor => {this.examples.push(this.fb.control(valor,[ Validators.required]));})
    //mmeIp.forEach(valor => {this.mmeIps.push(this.fb.control(valor,[ Validators.pattern(this.ipPattern)]));})
    this.editarBoolean = true;
  }

  duplicar(_id: number) {
    if (this.array.length < 3) {
      const { parameterId,
        cn,
            srn,
            sn,
            tp,
            rnc,
            ps,
            rt,
            rs,
            rn,
            rxnum,
            txnum,
            almprocsw,
            almprocthrhld,
            almthrhld,
            ifoffset,
            rfds,
            lcpsw,
            flag,
            ruspec,
            paeffswitch } =
        this.array.filter(
          obj => obj.id === _id
        )[0];
      let index: number = 0;
      do {
        if (!this.array[index]) {
          this.array.push(new Rru(
            this.sidebarIdCommand[index],
            parameterId,
            cn,
            srn,
            sn,
            tp,
            rnc,
            ps,
            rt,
            rs,
            rn,
            rxnum,
            txnum,
            almprocsw,
            almprocthrhld,
            almthrhld,
            ifoffset,
            rfds,
            lcpsw,
            flag,
            ruspec,
            paeffswitch
          ));
          break;
        }
        index++;
      } while (index <= this.array.length);
      this.rruService.guardar(this.array);
      for (const iterator of this.array) {
        this.store.dispatch(
          actions.editarSidebarCommand({
            sidebarCommand: new SidebarCommand(iterator.id, iterator.Command)
          }));
      }

    }
  }

}
