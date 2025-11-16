import { NgModule } from '@angular/core';
import { Home } from './home';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [Home],
  imports: [BrowserModule],
  bootstrap: [Home],
})
export class HomeModule {}
