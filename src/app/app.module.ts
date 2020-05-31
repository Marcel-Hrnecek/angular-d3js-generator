import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SunburstComponent} from "./sunburst/sunburst.component";
import {FormsModule} from "@angular/forms";
import {SunburstChartComponent} from "./sunburst/sunburst-chart/sunburst-chart.component";
import {SunburstSettingsComponent} from "./sunburst/sunburst-settings/sunburst-settings.component";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from "@angular/material/card";
import {MatSliderModule} from "@angular/material/slider";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatInputModule} from "@angular/material/input";
import {MatExpansionModule} from "@angular/material/expansion";
import {DataSettingsComponent} from './components/data-settings/data-settings.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {DataStorageComponent} from './components/data-storage/data-storage.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {BarComponent} from './components/bar/bar.component';
import {BarChartComponent} from './components/bar/bar-chart/bar-chart.component';
import {BarSettingsComponent} from './components/bar/bar-settings/bar-settings.component';
import {BarDataSettingsComponent} from './components/bar/bar-data-settings/bar-data-settings.component';

@NgModule({
  declarations: [
    AppComponent,
    SunburstComponent,
    SunburstChartComponent,
    SunburstSettingsComponent,
    DataSettingsComponent,
    DataStorageComponent,
    BarComponent,
    BarChartComponent,
    BarSettingsComponent,
    BarDataSettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatSliderModule,
    MatCheckboxModule,
    MatInputModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
