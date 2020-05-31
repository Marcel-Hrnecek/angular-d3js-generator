import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SunburstComponent} from "./sunburst/sunburst.component";
import {BarComponent} from "./components/bar/bar.component";

const routes: Routes = [
  {path: 'sunburst', component: SunburstComponent},
  {path: 'bar', component: BarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
