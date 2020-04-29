import { createReducer, on } from '@ngrx/store';
import * as dhcpswActions from '../../actions';
import { Dchpsw } from '../../../models/removeDefaultConfigData/dhcpsw.model';
import { borrarDhcpsw } from '../../actions/RemoveDefaultConfigData/dhcpsw.actions';


export interface RemoveDefaultConfigState {
    dhcpswObject: Dchpsw
}

export const dhcpswInitialState: RemoveDefaultConfigState = {
    dhcpswObject: null,
}



const _dhcpswReducer = createReducer(dhcpswInitialState,

    on(dhcpswActions.crearDhcpsw, (state,{dhcpsw}) => ({
        ...state, dhcpswObject:{...dhcpsw}
       })),
   on(dhcpswActions.borrarDhcpsw, (state) =>({
       ...state, dhcpswObject: null
   }))
);

export function dhcpswReducer(state, action) {
    return _dhcpswReducer(state, action);
}