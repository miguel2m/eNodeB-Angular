import { createReducer, on } from '@ngrx/store';

import { SidebarCommand } from '../../../models/sidebarCommand/sidebarCommand.model';
import * as sidebarCommandActions from '../../actions/sidebar/sidebar.actions';



export const initialState: SidebarCommand[] = [];

const _sidebarCommandReducer = createReducer(initialState,

    on( sidebarCommandActions.cargarSidebarCommand, (state,{sidebarCommand}) => sidebarCommand),

    on( sidebarCommandActions.crearSidebarCommand, (state,{sidebarCommand}) => 
        [...state,sidebarCommand]
    ),

    on( sidebarCommandActions.editarSidebarCommand, (state,{sidebarCommand}) => {
        const {id,
            command} = sidebarCommand;
        return state.map(obj =>{
            if (obj.id === id){
              return{
                ...obj,
                command
              }
            }else{
              return obj;
            }
        });
    }),

);

export function sidebarCommandReducer(state, action) {
    return _sidebarCommandReducer(state, action);
}