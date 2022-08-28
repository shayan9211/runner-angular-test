import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './shared/material/material.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { DataServiceService } from './service/data-service.service';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ListComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
  
  ],
  providers: [DataServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
