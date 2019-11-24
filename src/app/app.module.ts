import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LookForServiceComponent } from './look-for-service/look-for-service.component';
import { MyServicesComponent } from './my-services/my-services.component';
import { RegistryUserComponent } from './registry-user/registry-user.component';
import { RSSComponent } from './rss/rss.component';
import { FormsModule }   from '@angular/forms';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    LookForServiceComponent,
    MyServicesComponent,
    RegistryUserComponent,
    RSSComponent,
    AdminPanelComponent
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
