import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SunburstComponent} from "./sunburst/sunburst.component";
import {FormsModule} from "@angular/forms";
import {SunburstChartComponent} from "./sunburst/sunburst-chart/sunburst-chart.component";
import {SunburstSettingsComponent} from "./sunburst/sunburst-settings/sunburst-settings.component";

@NgModule({
  declarations: [
    AppComponent,
    SunburstComponent,
    SunburstChartComponent,
    SunburstSettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
