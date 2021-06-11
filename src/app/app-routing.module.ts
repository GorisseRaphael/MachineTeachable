import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestModelComponent } from './test-model/test-model.component';


const routes: Routes = [ {
  path: '',
  component: TestModelComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
