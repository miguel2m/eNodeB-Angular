import { createAction, props } from '@ngrx/store';
import { RadioParameters } from '../../../models/initiallyConfig/radio-parameters.model';

export const crearRadioParameters = createAction(
    '[RadioParameters Component] Crea Radio Parameters',
    props<{radioParameter: RadioParameters}>()
);

export const cargarRadioParameters= createAction(
    '[RadioParameters Component] Cargar Radio Parameter'
);

export const editarRadioParameters= createAction(
    '[RadioParameters Component] Editar Radio Parameter',
    props<{radioParameter: RadioParameters}>()
);

export const borrarRadioParameters= createAction(
    '[RadioParameters Component] Borrar Radio Parameter',
    props<{id: number}>()
);