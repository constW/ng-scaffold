import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { SharedModule } from '../shared/shared.module';
import { MainService } from './main.service';
import { AccountService } from '../core/account.service';
@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule,
  ],
  exports: [
    MainComponent,
  ],
  providers: [
    MainService,
    AccountService
  ],

})
export class MainModule { }
