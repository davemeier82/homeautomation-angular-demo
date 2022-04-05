import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClimateComponent } from './climate/climate.component';
import { LightsComponent } from './lights/lights.component';
import { WindowsComponent } from './windows/windows.component';
import { OverviewComponent } from './overview/overview.component';
import { ShuttersComponent } from './shutters/shutters.component';
import { OutletsComponent } from './outlets/outlets.component';


const routes: Routes = [
  {
    path: 'lights', component: LightsComponent
  },
  {
    path: 'climate', component: ClimateComponent
  },
  {
    path: 'windows', component: WindowsComponent
  },
  {
    path: 'overview', component: OverviewComponent
  },
  {
    path: 'shutters', component: ShuttersComponent
  },
  {
    path: 'outlets', component: OutletsComponent
  },
  {
    path: '**', redirectTo: 'overview'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }