import { Injectable } from '@angular/core';
import { SidebarCommand } from '../../models/sidebarCommand/sidebarCommand.model';

@Injectable({
  providedIn: 'root'
})
export class SidebarCommandService {

  constructor() { }

  guardarSidebarCommand(radioParameters: SidebarCommand[]){
    localStorage.setItem('sidebarCommand',JSON.stringify(radioParameters));
  }

  
  
  cargarSidebarCommand(){
    
      return (localStorage.getItem('sidebarCommand'))? 
            JSON.parse( localStorage.getItem('sidebarCommand')):
            [
              {id: 0,command: '//Procedure for Configuring a Single eNodeB'},
              {id: 1,command: '//Remove the default configuration data'},
              {id: 2,command: '//1. Turn off the DHCP switch and configure the local maintenance IP address.'},
              {id: 3,command: '//a. Turn off the DHCP switch because the eNodeB in minimum configuration will fail to be configured with the DHCP switch turned on. To turn off the DHCP switch, run the following command for the eNodeB:'},
              {id: 4,command: '//Set OM Channel Automatic Establishment Switch (SET DHCPSW)'},
              {id: 5,command: '//Turn on the DHCP switch by running the following command for the eNodeB:'},
              {id: 6,command: 'LST DHCPSW:;'},
              {id: 7,command: '//MML Command'},
              {id: 8,command: '//'},
              {id: 9,command: '//b. Set the local maintenance IP address to the planned OM IP address of each eNodeB by running the following command for the eNodeB:'},
              {id: 10,command: '//SET LOCALIP: IP="192.168.0.49", MASK="255.255.255.0";'},
              {id: 11,command: '//c. Log in to the eNodeB using the local maintenance IP address.'},
              {id: 12,command: '//2. Remove the default configurations of the eNodeB by running the following commands for the eNodeB:'},
              {id: 13,command: '//RMV RRU'},
              {id: 14,command: '//RMV RRUCHAIN'},
              {id: 15,command: '//RMV BRD'},
              {id: 16  ,command: '//Configuring Basic Data'},
              {id: 17  ,command: '//Node configuration attributes'},
              {id: 18  ,command: '//List Node Configuration (LST NODE) and complete'},
              {id: 19  ,command: 'LST NODE:;'},
              {id: 20  ,command: '//NE configuration attributes'},
              {id: 21  ,command: '//Set Network Element Configuration (SET NE)'},
              {id: 22  ,command: 'LST NE:;'},
              {id: 23  ,command: '//MML Command'},
              {id: 24  ,command: '//'},
              {id: 25  ,command: '//Set Node Configuration (SET NODE)'},
              {id: 26  ,command: 'LST NODE:;'},
              {id: 27  ,command: '//MML Command'},
              {id: 28  ,command: '//'},
              {id: 29  ,command: '//Location information'},
              {id: 30  ,command: '//Add Location (ADD LOCATION)'},
              {id: 31  ,command: 'LST LOCATION:;'},
              {id: 32  ,command: '//MML Command'},
              {id: 33  ,command: '//'},
              {id: 34  ,command: '//'},
              {id: 35  ,command: '//'},
              {id: 36  ,command: '//eNodeB function'},
              {id: 37  ,command: '//Add eNodeB Function (ADD ENODEBFUNCTION)'},
              {id: 38  ,command: 'LST ENODEBFUNCTION:;'},
              {id: 39  ,command: '//MML Command'},
              {id: 40  ,command: '//'},
              {id: 41  ,command: '//NE maintenance mode'},
              {id: 42  ,command: '//Set NE Status (SET MNTMODE)'},
              {id: 43 ,command: 'LST MNTMODE:;'},
              {id: 44  ,command: '//MML Command'},
              {id: 45  ,command: '//'},
              {id: 46  ,command: '//Operator'},
              {id: 47  ,command: '//Add CN Operator (ADD CNOPERATOR)'},
              {id: 48  ,command: 'LST CNOPERATOR:;'},
              {id: 49  ,command: '//MML Command'},
              {id: 50  ,command: '//'},
              {id: 51  ,command: '//Add Tracking Area Configuration for CN Operator (ADD CNOPERATORTA)'},
              {id: 52  ,command: 'LST CNOPERATORTA:;'},
              {id: 53  ,command: '//MML Command'},
              {id: 54  ,command: '//'},
              {id: 55  ,command: '//'},
            ]    
    
  }
}
