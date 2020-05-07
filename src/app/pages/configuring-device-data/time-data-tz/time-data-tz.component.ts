import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.reducers';
import * as actions from '../../../store/actions/index';


import { SidebarCommand } from '../../../models/sidebarCommand/sidebarCommand.model';
import { TimeDataTz } from '../../../models/configurin-device-data/timeDataTz.model';
import { TimeDataTzServiceService } from '../../../services/configuring-device-data/time-data-tz-service.service';


@Component({
  selector: 'app-time-data-tz',
  templateUrl: './time-data-tz.component.html',
  styles: [
  ]
})
export class TimeDataTzComponent implements OnInit {
  parametersId: string[] = ['REFERENCE', 'CREATE', 'DELETE'];
  editarForm: boolean = false;
  form: FormGroup;
  object : TimeDataTz;
  
  subscripcion: Subscription;
  sidebarCommand:number = 95;
  constructor(private fb: FormBuilder,
    private store: Store<AppState>,
    private modalService: NgbModal,
    private timeDataTzServiceService:TimeDataTzServiceService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      parameterId:  new FormControl(null),
      zonet  :['GMT-0400',], 
      timediff  :[], 
      dst       :[],      
      sm        :[],           
      smonth    :[],    
      sday      :[],      
      swseq     :[],     
      sweek     :[],    
      st        :[],   
      em        :[],  
      emonth    :[],  
      eday      :[],  
      ewseq     :[],  
      eweek     :[],  
      et        :[],  
      to        :[],   
    });
    this.form.controls['parameterId'].setValue('REFERENCE', {onlySelf: true});
    if(this.timeDataTzServiceService.cargar()){
      const { id,
        parameterId,
          zonet,
          timediff,
          dst ,    
          sm  ,    
          smonth , 
          sday   , 
          swseq  , 
          sweek ,  
          st   ,   
          em    ,  
          emonth , 
          eday   , 
          ewseq  , 
          eweek ,  
          et  ,    
          to} =this.timeDataTzServiceService.cargar();
      this.object = new TimeDataTz(
        id,
        parameterId,
          zonet,
          timediff,
          dst ,    
          sm  ,    
          smonth , 
          sday   , 
          swseq  , 
          sweek ,  
          st   ,   
          em    ,  
          emonth , 
          eday   , 
          ewseq  , 
          eweek ,  
          et  ,    
          to);
      
        this.store.dispatch(
          actions.editarSidebarCommand({
            sidebarCommand: new SidebarCommand(this.sidebarCommand,this.object.Command)
          }));

        
    }
  }

  openScrollableContent(longContent) {
    this.modalService.open(longContent, { scrollable: true });
  }

  editar() {
    const { parameterId,
      zonet,
      timediff,
      dst ,    
      sm  ,    
      smonth , 
      sday   , 
      swseq  , 
      sweek ,  
      st   ,   
      em    ,  
      emonth , 
      eday   , 
      ewseq  , 
      eweek ,  
      et  ,    
      to} = this.object;
    this.form.reset({
        parameterId,
        zonet,
        timediff,
        dst ,    
        sm  ,    
        smonth , 
        sday   , 
        swseq  , 
        sweek ,  
        st   ,   
        em    ,  
        emonth , 
        eday   , 
        ewseq  , 
        eweek ,  
        et  ,    
        to
      });
    this.form.controls['parameterId'].setValue(parameterId, {onlySelf: true});
    this.editarForm = true;
  }

  eliminar() {
    this.object = null;
    this.timeDataTzServiceService.eliminar();
    
    this.store.dispatch(
      actions.editarSidebarCommand({
        sidebarCommand: new SidebarCommand(this.sidebarCommand,'//')
      }));
  }

  guardar() {
    //console.log(this.dhcpswForm.value);

   /* if (this.configDataForm.invalid) {
      return Object.values(this.configDataForm.controls).forEach(control => {
        control.markAsTouched();
      });

    } else {
*/
      let id;
      (!this.editarForm) ?
        id = this.sidebarCommand :
        id = this.object.id;

        const { 
          parameterId,
          zonet,
          timediff,
          dst ,    
          sm  ,    
          smonth , 
          sday   , 
          swseq  , 
          sweek ,  
          st   ,   
          em    ,  
          emonth , 
          eday   , 
          ewseq  , 
          eweek ,  
          et  ,    
          to} = this.form.value;
      
      this.object = new TimeDataTz(
        id,
        parameterId,
        zonet,
        timediff,
        dst ,    
        sm  ,    
        smonth , 
        sday   , 
        swseq  , 
        sweek ,  
        st   ,   
        em    ,  
        emonth , 
        eday   , 
        ewseq  , 
        eweek ,  
        et  ,    
        to);

      this.timeDataTzServiceService.guardar(this.object);
      this.store.dispatch(
        actions.editarSidebarCommand({
          sidebarCommand: new SidebarCommand(this.sidebarCommand,this.object.Command)
        }));


      this.form.reset();
      this.editarForm = false;

  }

  

}
