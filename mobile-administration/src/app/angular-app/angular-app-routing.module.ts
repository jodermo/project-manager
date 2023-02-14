import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularAppPage } from './angular-app.page';

const routes: Routes = [
  {
    path: '',
    component: AngularAppPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AngularAppRoutingModule {}
