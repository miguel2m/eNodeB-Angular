import { Injectable } from '@angular/core';
import { Board } from '../../models/configurin-device-data/board.model';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor() { }
  guardarLocationInformation(board: Board[]){
    localStorage.setItem('boardDeviceData',JSON.stringify(board));
  }

  
  
  cargarLocationInformation():Board[]{
    
      return (localStorage.getItem('boardDeviceData'))? 
            JSON.parse( localStorage.getItem('boardDeviceData')):
            []     
    
  }
}
