import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuardService } from './services/auth-guard.service';
import { HeaderComponent } from './components/header/header.component';
import { MaterialModule } from './material/material.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
  ],
  exports: [
    HeaderComponent,
    CommonModule,
    MaterialModule,
    FormsModule,
  ],
  providers: [AuthGuardService]
})
export class SharedModule { }
