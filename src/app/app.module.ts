import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { LightsComponent } from './lights/lights.component';
import { AppRoutingModule } from './app-routing.module';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { ClimateComponent } from './climate/climate.component';
import { HttpClientModule } from '@angular/common/http';
import { DeviceEffects } from './effect/device.effects';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './reducer/reducers';
import { WindowsComponent } from './windows/windows.component';
import { ShuttersComponent } from './shutters/shutters.component';
import { MatSliderModule } from '@angular/material/slider';
import { OverviewComponent } from './overview/overview.component';
import { EventEffects } from './effect/event.effects';
import { OutletsComponent } from './outlets/outlets.component';
import { PowerComponent } from './power/power.component';
import { CamerasComponent } from './cameras/cameras.component';
import { SafePipe } from './pipes/safe.pipe';
import { DevicesConfigComponent } from './devices-config/devices-config.component';
import { DevicesConfigEffects } from './effect/device-config.effects';

@NgModule({
  declarations: [
    AppComponent,
    LightsComponent,
    ClimateComponent,
    WindowsComponent,
    ShuttersComponent,
    OverviewComponent,
    OutletsComponent,
    PowerComponent,
    CamerasComponent,
    DevicesConfigComponent,
    SafePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([DeviceEffects, EventEffects, DevicesConfigEffects]),
    AppRoutingModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatSlideToggleModule,
    HttpClientModule,
    MatTableModule,
    MatSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
