import { createReducer, on } from '@ngrx/store';
import * as radioParametersActions from '../../actions';
import { RadioParameters } from '../../../models/initiallyConfig/radio-parameters.model';

export interface RadioParametersState {
    radioParametersObject: RadioParameters[]

}

export const radioParametersInitialState: RadioParameters[] = [];

const _radioParametersReducer = createReducer(radioParametersInitialState,

    on(radioParametersActions.crearRadioParameters, (state,{radioParameter}) =>  
         [...state,radioParameter]),
    on(radioParametersActions.cargarRadioParameters, (state,{radioParameters}) =>  
        radioParameters),
          
    on(radioParametersActions.cargarRadioParameters, (state) => {
        return state.map( radioParameter =>{
            return{
                ...radioParameter,
              }
        });
    }),
    on(radioParametersActions.editarRadioParameters, 
        (state,{radioParameter}) =>{
        const {cell,
            tx_rx_mode,
            pci,
            downlinkEarfcn/*,
            example*/} = radioParameter;
        return state.map(obj =>{
            if (obj.id === radioParameter.id){
              return{
                ...obj,
                cell,
                tx_rx_mode,
                pci,
                downlinkEarfcn/*,
               // example*/
              }
            }else{
              return obj;
            }
        });
    }),
    on(radioParametersActions.borrarRadioParameters, 
        (state,{id}) => state.filter(todo => todo.id !== id)
    ),

);

export function radioParametersReducer (state, action) {
    return _radioParametersReducer (state, action);
}