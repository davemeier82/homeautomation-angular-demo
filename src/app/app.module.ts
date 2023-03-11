import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { LightsComponent } from './lights/lights.component';
import { AppRoutingModule } from './app-routing.module';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatLegacySlideToggleModule as MatSlideToggleModule} from '@angular/material/legacy-slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { ClimateComponent } from './climate/climate.component';
import { HttpClientModule } from '@angular/common/http';
import { DeviceEffects } from './effect/device.effects';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './reducer/reducers';
import { WindowsComponent } from './windows/windows.component';
import { ShuttersComponent } from './shutters/shutters.component';
import { MatLegacySliderModule as MatSliderModule } from '@angular/material/legacy-slider';
import { OverviewComponent } from './overview/overview.component';
import { EventEffects } from './effect/event.effects';
import { OutletsComponent } from './outlets/outlets.component';
import { PowerComponent } from './power/power.component';
import { CamerasComponent } from './cameras/cameras.component';
import { SafePipe } from './pipes/safe.pipe';
import { DevicesConfigComponent } from './devices-config/devices-config.component';
import { DevicesConfigEffects } from './effect/device-config.effects';
import { MotionComponent } from './motion/motion.component';

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
    MotionComponent,
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
