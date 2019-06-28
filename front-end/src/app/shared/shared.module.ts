import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuardService } from './services/auth-guard.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [AuthGuardService]
})
export class SharedModule { }
