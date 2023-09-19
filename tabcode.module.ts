// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TabsAutomaticComponent } from './tabs-automatic/tabs-automatic.component';

@NgModule({
  declarations: [
    // ...
    TabsAutomaticComponent
  ],
  imports: [BrowserModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
