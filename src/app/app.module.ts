import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestModelComponent } from './test-model/test-model.component';
import { MyDetectorModule } from 'my-detector';
import { MatButtonModule, MatProgressBarModule, MatSlideToggleModule, MatToolbarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TestModelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSlideToggleModule,
    BrowserAnimationsModule,
    FormsModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatButtonModule,
    MyDetectorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
