import { Routes } from '@angular/router';
import { InitConfigComponent } from './initiallyConfig/init-config.component';
import { DhcpswComponent } from './removeDefaultConfigData/dhcpsw.component';
import { ConfigBasicDataComponent } from './configuringBasicData/config-basic-data.component';

export const pagesRoutes: Routes =[
    
    {path :'', component: InitConfigComponent},
    {path :'dhcpsw', component: DhcpswComponent},
    {
        path :'configuringBasicData',
        component: ConfigBasicDataComponent
    },
    {path: '**', redirectTo:''}
];