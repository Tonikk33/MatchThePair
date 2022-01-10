import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {appService} from './app.service';
import {HttpClientModule} from '@angular/common/http';
import {TableModule} from 'primeng/table'
import {FileUploadModule} from 'primeng/fileupload';
import {DropdownModule} from 'primeng/dropdown';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TableModule,
    FileUploadModule,
    DropdownModule,
  ],
  providers: [appService],
  bootstrap: [AppComponent]
})
export class AppModule { }
