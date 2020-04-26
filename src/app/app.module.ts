import {BrowserModule} from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import { AppComponent } from './app.component';
import {SunburstComponent} from "./sunburst/sunburst.component";

@NgModule({
  declarations: [
    AppComponent,
    SunburstComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
