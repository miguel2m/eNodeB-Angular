import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { pagesRoutes } from './pages/pages.routes';
import { PagesComponent } from './pages/pages.component';


const routes: Routes = [
  {
    path: '', 
    component: PagesComponent,
    children: pagesRoutes
    
  },
  {path: '**', redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
