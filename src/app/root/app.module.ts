import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { provideHttpClient, withFetch } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SalahTimingsModule } from '../salah-timings/salah-timings.module';
import { BannerModule } from '../banner/banner.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SalahTimingsModule,
    BannerModule,
  ],
  providers: [
    provideHttpClient(withFetch()),
    provideClientHydration(),
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
