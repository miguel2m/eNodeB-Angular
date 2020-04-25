import { createReducer, on } from '@ngrx/store';
import * as configDataActions from '../../actions';
import { ConfigData } from '../../../models/initiallyConfig/config-data.model';

export interface ConfigDataState {
    configDataObject: ConfigData
}

export const configDataInitialState: ConfigDataState = {
    configDataObject: null,
}

const _configDataReducer = createReducer(configDataInitialState,

    on(configDataActions.crearConfigData, (state,{configData}) => ({
         ...state, configDataObject:{...configData}
        })),
    on(configDataActions.borrarConfigData, (state) =>({
        ...state, configDataObject: null
    }))
    

);

export function configDataReducer (state, action) {
    return _configDataReducer (state, action);
}