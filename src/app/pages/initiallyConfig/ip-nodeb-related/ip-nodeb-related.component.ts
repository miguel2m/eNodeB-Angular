import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.reducers';
import * as ipNodebRelatedActions from '../../../store/actions/InitiallyConfigutarion/ip-nodeb-related.actions';

import { IpNodebRelated } from '../../../models/initiallyConfig/ip-nodeb-related.model';
import { IpConfigRelatedService } from '../../../services/initiallyConfig/ip-config-related.service';




@Component({
  selector: 'app-ip-nodeb-related',
  templateUrl: './ip-nodeb-related.component.html',
  styleUrls: ['./ip-nodeb-related.component.css']
})
export class IpNodebRelatedComponent implements OnInit,OnDestroy {
  
  ipNodebRelatedSubscription: Subscription;
  editar: boolean = false;
  ipPattern: string = '^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$';
  ipNodebRelatedForm: FormGroup
  ipNodebRelated: IpNodebRelated =null;

  constructor(private fb: FormBuilder,
              private store: Store<AppState>,
              private modalService: NgbModal,
              private ipNodeBService: IpConfigRelatedService) { }

  ngOnInit(): void {
    this.ipNodebRelatedForm = this.fb.group({
      m2000IpAddr: ['',[Validators.required, Validators.pattern(this.ipPattern)]],
      sgwNameId: ['', [Validators.required]],
      sgwIp:this.fb.array([]),
      mmeName: ['', [Validators.required]],
      mmeIp:this.fb.array([]),
      ipClockServer: ['', [Validators.required, Validators.pattern(this.ipPattern)]],
      nextHoopClockServer: ['', [Validators.required, Validators.pattern(this.ipPattern)]],
      nextHoopVlanClockServer: ['', [Validators.required, Validators.pattern(this.ipPattern)]],

    });
    this.agregarSgwIp();
    this.agregarMmeIp();
    this.ipNodebRelated = this.ipNodeBService.cargarIpNodebRelated();
    if(this.ipNodebRelated){
      this.store.dispatch(
        ipNodebRelatedActions.crearIpNodebRelated({
          ipNodebRelated: this.ipNodebRelated
        }));
    }
    this.ipNodebRelatedSubscription=  this.store.select('ipNodeRelated').subscribe(obj => {
      this.ipNodebRelated = obj.ipNodeRelatedObject;
    });
  }

  ngOnDestroy(): void {
    this.ipNodebRelatedSubscription?.unsubscribe();
  }

  openScrollableContent(longContent) {
    this.modalService.open(longContent, { scrollable: true  });
  }
  
  editarIpNodebRelated() {
    const { m2000IpAddr,
      sgwNameId,
      sgwIp,
      mmeName,
      mmeIp,
      ipClockServer,
      nextHoopClockServer,
      nextHoopVlanClockServer}  = this.ipNodebRelated;
    this.ipNodebRelatedForm.reset({
      m2000IpAddr,
      sgwNameId,    
      mmeName,
      ipClockServer,
      nextHoopClockServer,
      nextHoopVlanClockServer
    });
    this.clearSgwIp();
    this.clearMmeIp();
    
    sgwIp.forEach(valor => {this.sgwIps.push(this.fb.control(valor,[ Validators.pattern(this.ipPattern)]));})
    mmeIp.forEach(valor => {this.mmeIps.push(this.fb.control(valor,[ Validators.pattern(this.ipPattern)]));})
    this.editar = true;
  }

  eliminarIpNodebRelated() {
    this.ipNodebRelated = null;
    this.ipNodeBService.eliminarIpNodebRelated();
    this.store.dispatch(
      ipNodebRelatedActions.borrarIpNodebRelated());
  }

  guardarIpNodebRelated() {

    if (this.ipNodebRelatedForm.invalid) {
      return Object.values(this.ipNodebRelatedForm.controls).forEach(control => {
        control.markAsTouched();
      });

    } else {

      let id;
      (!this.editar) ?
        id = new Date().getMilliseconds() :
        id = this.ipNodebRelated.id;

      const { m2000IpAddr,
        sgwNameId,
        sgwIp,
        mmeName,
        mmeIp,
        ipClockServer,
        nextHoopClockServer,
        nextHoopVlanClockServer} = this.ipNodebRelatedForm.value;
        
      this.ipNodebRelated = new IpNodebRelated(
        id,
        m2000IpAddr,
        sgwNameId,
        sgwIp,
        mmeName,
        mmeIp,
        ipClockServer,
        nextHoopClockServer,
        nextHoopVlanClockServer);

      this.ipNodeBService.guardarIpNodebRelated(this.ipNodebRelated);
      this.store.dispatch(
        ipNodebRelatedActions.crearIpNodebRelated({
          ipNodebRelated: this.ipNodebRelated
        }));
      

      this.ipNodebRelatedForm.reset();
      this.editar = false;
      console.log(this.ipNodebRelated);
    }
  }
  
  get m2000IpAddrInvalid() {
    return this.ipNodebRelatedForm.get('m2000IpAddr').invalid && this.ipNodebRelatedForm.get('m2000IpAddr').touched;
  }
  get sgwNameIdInvalid() {
    return this.ipNodebRelatedForm.get('sgwNameId').invalid && this.ipNodebRelatedForm.get('sgwNameId').touched;
  }

  get sgwIpInvalid() {
    return this.sgwIps.invalid && this.sgwIps.touched;
  }

  get sgwIps() {
    return this.ipNodebRelatedForm.get('sgwIp') as FormArray;
  }

  get mmeNameInvalid() {
    return this.ipNodebRelatedForm.get('mmeName').invalid && this.ipNodebRelatedForm.get('mmeName').touched;
  }

  get mmeIpInvalid() {
    return this.mmeIps.invalid && this.mmeIps.touched;
  }

  get mmeIps() {
    return this.ipNodebRelatedForm.get('mmeIp') as FormArray;
  }
  
  get ipClockServerInvalid() {
    return this.ipNodebRelatedForm.get('ipClockServer').invalid && this.ipNodebRelatedForm.get('ipClockServer').touched;
  }

  get nextHoopClockServerInvalid() {
    return this.ipNodebRelatedForm.get('nextHoopClockServer').invalid && this.ipNodebRelatedForm.get('nextHoopClockServer').touched;
  }

  get nextHoopVlanClockServerInvalid() {
    return this.ipNodebRelatedForm.get('nextHoopVlanClockServer').invalid && this.ipNodebRelatedForm.get('nextHoopVlanClockServer').touched;
  }

  agregarSgwIp(){
    if (this.sgwIps.length < 4)
    this.sgwIps.push(this.fb.control('',[ Validators.pattern(this.ipPattern)]));
  }
  
  borrarSgwIp(i:number){
    this.sgwIps.removeAt(i);
  }

  clearSgwIp(){
    this.sgwIps.clear();
  }

  agregarMmeIp(){
    if (this.mmeIps.length < 2)
    this.mmeIps.push(this.fb.control('',[ Validators.pattern(this.ipPattern)]));    
  }
  
  borrarMmeIp(i:number){
    this.mmeIps.removeAt(i);
  }

  clearMmeIp(){
    this.mmeIps.clear();
  }
}
