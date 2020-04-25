import { createAction, props } from '@ngrx/store';
import { ConfigData } from '../../../models/initiallyConfig/config-data.model';


export const crearConfigData = createAction(
    '[ConfigData Component] Crea Config Data',
    props<{configData: ConfigData}>()
);

export const borrarConfigData= createAction(
    '[ConfigData Component] Borrar Config Data'
);