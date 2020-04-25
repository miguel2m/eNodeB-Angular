import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Subscription } from 'rxjs';

import { AppState } from '../../../store/app.reducers';
import { Store } from '@ngrx/store';

import { RadioParameterService } from '../../../services/initiallyConfig/radio-parameter.service';

import { RadioParameters } from '../../../models/initiallyConfig/radio-parameters.model';
import * as radioParametersAction from '../../../store/actions/InitiallyConfigutarion/radio-parameters.actions';




@Component({
  selector: 'app-radio-parameters',
  templateUrl: './radio-parameters.component.html',
  styleUrls: ['./radio-parameters.component.css']
})
export class RadioParametersComponent implements OnInit, OnDestroy {
  radioParametersSubscription: Subscription;
  editar: boolean = false;
  radioParametersForm: FormGroup;
  
  id:number;
  radioParametersObject: RadioParameters[] = [];
  radioParameterObject : RadioParameters;

  constructor(private fb: FormBuilder,
    private modalService: NgbModal,
    private radioParameterService: RadioParameterService,
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.radioParametersForm = this.fb.group({
      cell: ['', [Validators.required]],
      tx_rx_mode: ['', [Validators.required]],
      pci: ['', [Validators.required]],
      downlinkEarfcn: ['', [Validators.required]]/*,
      //example: this.fb.array([])*/
    });
    //this.agregarExample();
    this.radioParametersObject = this.radioParameterService.cargarRadioParameters();
    //if(this.radioParametersObject.length > 0){
      this.radioParametersObject.forEach((radioParameter) =>{
        this.store.dispatch(
          radioParametersAction.crearRadioParameters({
            radioParameter
          }));
      })
   //}
    this.radioParametersSubscription = this.store.select('radioParameters').subscribe(obj => {
          this.radioParametersObject = obj as RadioParameters[];
    }
    );
  }

  ngOnDestroy(): void {
    this.radioParametersSubscription?.unsubscribe();
  }

  openScrollableContent(longContent) {
    this.modalService.open(longContent, { scrollable: true });
  }

  editarRadioParameter(_id: number) {
    this.id = _id;
    const { cell,
      tx_rx_mode,
      pci,
      downlinkEarfcn/*,
     /* example*/ } =
      this.radioParametersObject.filter(
        obj => obj.id === _id
      )[0];

    this.radioParametersForm.reset({
      cell,
      tx_rx_mode,
      pci,
      downlinkEarfcn
    });


    //this.clearExample();
    //this.clearMmeIp();

    //example.forEach(valor => {this.examples.push(this.fb.control(valor,[ Validators.required]));})
    //mmeIp.forEach(valor => {this.mmeIps.push(this.fb.control(valor,[ Validators.pattern(this.ipPattern)]));})
    this.editar = true;
  }
  
  duplicarRadioParameters(_id: number) {
    if(this.radioParametersObject.length < 4){
      const { cell,
        tx_rx_mode,
        pci,
        downlinkEarfcn/*,
        example*/ } =
        this.radioParametersObject.filter(
          obj => obj.id === _id
        )[0];
      this.radioParameterObject=new RadioParameters(
        new Date().getUTCMilliseconds(),
          cell,
          tx_rx_mode,
          pci,
          downlinkEarfcn/*,
          example*/);
      this.store.dispatch(
        radioParametersAction.crearRadioParameters({
          radioParameter: this.radioParameterObject
        }));
      this.radioParameterService.guardarRadioParameters(this.radioParametersObject);
    }
  }

  borrarRadioParameters(id: number) {
    this.store.dispatch(
      radioParametersAction.borrarRadioParameters({
        id
      }));

   
    this.radioParameterService.guardarRadioParameters( 
      this.radioParametersObject.filter((item)=> item.id !== id )
    );
  }

  guardarRadioParameters() {

    if (this.radioParametersForm.invalid) {
      return Object.values(this.radioParametersForm.controls).forEach(control => {
        control.markAsTouched();
      });

    } else {

      const { cell,
        tx_rx_mode,
        pci,
        downlinkEarfcn/*,
      example*/ } = this.radioParametersForm.value;
      

      if (!this.editar) {

        this.id = new Date().getUTCMilliseconds();

        //this.ipNodeBService.guardarIpNodebRelated(this.ipNodebRelated);
        this.radioParameterObject=new RadioParameters(
          this.id,
          cell,
          tx_rx_mode,
          pci,
          downlinkEarfcn/*,
          example*/);

          this.store.dispatch(
            radioParametersAction.crearRadioParameters({
              radioParameter: this.radioParameterObject
            }));

      }else{

        this.radioParameterObject=new RadioParameters(
          this.id,
          cell,
          tx_rx_mode,
          pci,
          downlinkEarfcn/*,
          example*/);
          this.store.dispatch(
            radioParametersAction.editarRadioParameters({
              radioParameter: this.radioParameterObject
            }));
      }

      this.radioParameterService.guardarRadioParameters(this.radioParametersObject);
      
      this.radioParametersForm.reset();
      this.editar = false;

    }
  }

  get cellInvalid() {
    return this.radioParametersForm.get('cell').invalid && this.radioParametersForm.get('cell').touched;
  }

  get tx_rx_modeInvalid() {
    return this.radioParametersForm.get('tx_rx_mode').invalid && this.radioParametersForm.get('tx_rx_mode').touched;
  }

  get pciInvalid() {
    return this.radioParametersForm.get('pci').invalid && this.radioParametersForm.get('pci').touched;
  }

  get downlinkEarfcnInvalid() {
    return this.radioParametersForm.get('downlinkEarfcn').invalid && this.radioParametersForm.get('downlinkEarfcn').touched;
  }

  get exampleInvalid() {
    return this.examples.invalid && this.examples.touched;
  }

  get examples() {
    return this.radioParametersForm.get('example') as FormArray;
  }

  agregarExample(){
    if (this.examples.length < 4)
    this.examples.push(this.fb.control('',[ Validators.required]));
  }
  
  borrarExample(i:number){
    this.examples.removeAt(i);
  }

  clearExample(){
    this.examples.clear();
  }
}
