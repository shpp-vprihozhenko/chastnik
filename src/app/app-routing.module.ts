import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LookForServiceComponent } from './look-for-service/look-for-service.component';
import { MyServicesComponent } from './my-services/my-services.component';
import { RegistryUserComponent } from './registry-user/registry-user.component';
import { RSSComponent } from './rss/rss.component';

const routes: Routes = [
  {path: 'LookForService', component: LookForServiceComponent},
  {path: 'MyServices', component: MyServicesComponent},
  {path: 'RegistryUser', component: RegistryUserComponent},
  {path: 'RSS', component: RSSComponent},
  { path: '',
    redirectTo: '/RSS',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
