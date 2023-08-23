import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {ContentManageComponent} from "./layouts/content-manage/content-manage.component";


const routes: Routes = [
  { path: '', component: HomeComponent},
  { path:'content-manage', component:ContentManageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
